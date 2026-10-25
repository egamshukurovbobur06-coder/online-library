// ================================================
//  OnLibrary — PROFESSIONAL SERVICE WORKER
//  Versiya: 3.1.0
//  Cache strategiyalari + Offline + Auto-update
//  + PDF.js worker + Media files support
// ================================================

const SW_VERSION = 'v3.1.0';
const CACHE_NAME = `onlibrary-${SW_VERSION}`;
const RUNTIME_CACHE = `onlibrary-runtime-${SW_VERSION}`;
const IMAGE_CACHE = `onlibrary-images-${SW_VERSION}`;

// ================================================
//  PRECACHE — Faqat mavjud fayllar
//  (Server'da bor fayllarni tekshirib qo'shing!)
// ================================================
const PRECACHE_URLS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './icon.svg',
    './icon-192.png',
    './icon-512.png',
    './favicon.ico',
    './favicon-96x96.png',
    './apple-touch-icon.png'
];

// ================================================
//  Tashqi domenlar — SW ularga tegmaydi
//  (Firebase, CDN, EmailJS, Google Fonts)
// ================================================
const BYPASS_DOMAINS = [
    'firebaseio.com',
    'firebaseapp.com',
    'googleapis.com',
    'gstatic.com',
    'emailjs.com',
    'jsdelivr.net',
    'unpkg.com',
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com'
];

// Fayl turi tekshiruvchi regex'lar
const IMAGE_EXTENSIONS = /\.(png|jpg|jpeg|svg|gif|webp|ico|bmp|avif)$/i;
const MEDIA_EXTENSIONS = /\.(pdf|mp3|m4a|wav|ogg|aac|mp4|webm)$/i;

// Maxsus Firebase URL'lar (bypass)
const FILE_URL_PATTERNS = [
    /firebasestorage\.googleapis\.com/,
    /firebasestorage\.app/,
    /\.firebaseio\.com/,
    /\.firebaseapp\.com/
];

// ================================================
//  INSTALL — Birinchi o'rnatish
// ================================================
self.addEventListener('install', (event) => {
    console.log(`[SW ${SW_VERSION}] Installing...`);

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // Har bir fayl alohida qo'shiladi (bittasi xato bo'lsa ham davom etadi)
                return Promise.allSettled(
                    PRECACHE_URLS.map(url =>
                        cache.add(url).catch(err => {
                            console.warn(`[SW] Precache failed: ${url}`, err.message || err);
                        })
                    )
                );
            })
            .then(() => {
                console.log(`[SW ${SW_VERSION}] Install complete`);
                // Yangi SW darhol faollashadi
                return self.skipWaiting();
            })
    );
});

// ================================================
//  ACTIVATE — Eski keshni tozalash
// ================================================
self.addEventListener('activate', (event) => {
    console.log(`[SW ${SW_VERSION}] Activating...`);

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter(name => {
                            // Faqat bizning eski cachelar
                            return name.startsWith('onlibrary-') &&
                                   name !== CACHE_NAME &&
                                   name !== RUNTIME_CACHE &&
                                   name !== IMAGE_CACHE;
                        })
                        .map(name => {
                            console.log(`[SW] Deleting old cache: ${name}`);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log(`[SW ${SW_VERSION}] Activated`);
                // Darhol boshqaruvni o'z qo'limga olaman
                return self.clients.claim();
            })
            .then(() => {
                // Barcha client'larga yangilanish haqida xabar
                return self.clients.matchAll({ type: 'window' });
            })
            .then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'SW_ACTIVATED',
                        version: SW_VERSION
                    });
                });
            })
    );
});

// ================================================
//  FETCH — Aqlli strategiya
// ================================================
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // 1. Faqat GET so'rovlar
    if (request.method !== 'GET') return;

    // 2. Faqat http/https protokollari
    const url = new URL(request.url);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

    // 3. Maxsus fayl URL'lari (Firebase Storage) — bypass
    if (FILE_URL_PATTERNS.some(pattern => pattern.test(url.href))) {
        return;
    }

    // 4. Tashqi domenlar
    if (BYPASS_DOMAINS.some(domain => url.hostname.includes(domain))) {
        // Rasmlar — cache-first
        if (IMAGE_EXTENSIONS.test(url.pathname)) {
            event.respondWith(imageStrategy(request));
            return;
        }
        // Media (PDF, Audio) — cache-first
        if (MEDIA_EXTENSIONS.test(url.pathname)) {
            event.respondWith(mediaStrategy(request));
            return;
        }
        // Boshqalar — to'g'ridan-to'g'ri network
        return;
    }

    // 5. Faqat bir xil origin
    if (url.origin !== self.location.origin) return;

    // 6. Media fayllar (PDF, Audio, Video)
    if (MEDIA_EXTENSIONS.test(url.pathname)) {
        event.respondWith(mediaStrategy(request));
        return;
    }

    const destination = request.destination;

    // 7. HTML — Network First (yangi kontent muhim)
    if (destination === 'document' ||
        url.pathname.endsWith('.html') ||
        url.pathname === '/' ||
        url.pathname.endsWith('/')) {
        event.respondWith(networkFirstStrategy(request, CACHE_NAME));
        return;
    }

    // 8. Rasmlar — Cache First
    if (destination === 'image' || IMAGE_EXTENSIONS.test(url.pathname)) {
        event.respondWith(imageStrategy(request));
        return;
    }

    // 9. CSS, JS, fontlar — Stale While Revalidate
    if (destination === 'style' ||
        destination === 'script' ||
        destination === 'font' ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.js')) {
        event.respondWith(staleWhileRevalidateStrategy(request, CACHE_NAME));
        return;
    }

    // 10. Boshqa hamma narsa — Cache First
    event.respondWith(cacheFirstStrategy(request, CACHE_NAME));
});

// ================================================
//  STRATEGIYALAR
// ================================================

// Network First — HTML uchun
async function networkFirstStrategy(request, cacheName) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        // Network ishlamasa — cache'dan
        const cached = await caches.match(request);
        if (cached) return cached;

        // Cache'da ham yo'q → offline sahifa
        if (request.destination === 'document') {
            const offlinePage = await caches.match('./index.html');
            if (offlinePage) return offlinePage;
        }

        return new Response('Offline', {
            status: 503,
            statusText: 'Offline',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
    }
}

// Cache First — Statik fayllar uchun
async function cacheFirstStrategy(request, cacheName) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        return new Response('Offline', {
            status: 503,
            statusText: 'Offline'
        });
    }
}

// Stale While Revalidate — CSS, JS uchun
async function staleWhileRevalidateStrategy(request, cacheName) {
    const cached = await caches.match(request);

    const fetchPromise = fetch(request)
        .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
                caches.open(cacheName).then(c => c.put(request, networkResponse.clone()));
                return networkResponse;
            }
            return networkResponse;
        })
        .catch(() => null);

    // Cache bor bo'lsa — darhol qaytaramiz, orqada yangilaymiz
    return cached || fetchPromise;
}

// Image strategy — Cache First + LRU
async function imageStrategy(request) {
    const cache = await caches.open(IMAGE_CACHE);
    const cached = await cache.match(request);

    if (cached) return cached;

    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            // Cache hajmini cheklash — 50 ta rasm
            const keys = await cache.keys();
            if (keys.length >= 50) {
                // Eng eski 10 tasini o'chirish
                await Promise.all(keys.slice(0, 10).map(k => cache.delete(k)));
            }
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Offline placeholder
        return new Response(
            `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                <rect fill="#e8f0e8" width="200" height="200"/>
                <text x="100" y="105" font-family="sans-serif" font-size="14" fill="#7a8a7a" text-anchor="middle">Rasm mavjud emas</text>
            </svg>`,
            {
                status: 200,
                headers: { 'Content-Type': 'image/svg+xml' }
            }
        );
    }
}

// Media strategy — Cache First + LRU
async function mediaStrategy(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);

    if (cached) return cached;

    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            // Media cache hajmini cheklash — 20 ta fayl
            const keys = await cache.keys();
            if (keys.length >= 20) {
                // Eng eski 5 tasini o'chirish
                await Promise.all(keys.slice(0, 5).map(k => cache.delete(k)));
            }
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        return new Response('Offline', {
            status: 503,
            statusText: 'Offline'
        });
    }
}

// ================================================
//  MESSAGE — Client'lardan kelgan xabarlar
// ================================================
self.addEventListener('message', (event) => {
    const data = event.data || {};

    // Skip waiting — yangi SW darhol faollashadi
    if (data.type === 'SKIP_WAITING') {
        console.log('[SW] Skip waiting requested');
        self.skipWaiting();
        return;
    }

    // Cache tozalash
    if (data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys()
                .then(names => Promise.all(names.map(n => caches.delete(n))))
                .then(() => {
                    event.source?.postMessage({
                        type: 'CACHE_CLEARED',
                        success: true
                    });
                })
        );
        return;
    }

    // Versiya so'rovi
    if (data.type === 'GET_VERSION') {
        event.source?.postMessage({
            type: 'SW_VERSION',
            version: SW_VERSION
        });
        return;
    }

    // Kesh statistikasi
    if (data.type === 'GET_CACHE_STATS') {
        event.waitUntil(
            caches.keys()
                .then(async names => {
                    const stats = {};
                    for (const name of names) {
                        const cache = await caches.open(name);
                        const keys = await cache.keys();
                        stats[name] = keys.length;
                    }
                    event.source?.postMessage({
                        type: 'CACHE_STATS',
                        stats
                    });
                })
        );
        return;
    }
});

// ================================================
//  PUSH NOTIFICATIONS (kelajak uchun)
// ================================================
self.addEventListener('push', (event) => {
    if (!event.data) return;

    let data = {};
    try {
        data = event.data.json();
    } catch (e) {
        data = { title: 'OnLibrary', body: event.data.text() };
    }

    const options = {
        body: data.body || '',
        icon: data.icon || './icon-192.png',
        badge: data.badge || './icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || './',
            dateOfArrival: Date.now()
        },
        actions: data.actions || []
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'OnLibrary', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const urlToOpen = event.notification.data?.url || './';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(windowClients => {
                // Birorta ochiq oyna bo'lsa — fokus
                for (const client of windowClients) {
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        client.navigate(urlToOpen);
                        return client.focus();
                    }
                }
                // Yo'q — yangi oyna
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// ================================================
//  BACKGROUND SYNC (kelajak uchun)
// ================================================
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-books') {
        event.waitUntil(Promise.resolve());
    }
});

// ================================================
//  ERROR HANDLING
// ================================================
self.addEventListener('error', (event) => {
    console.error('[SW Error]', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('[SW Unhandled]', event.reason);
});

console.log(`[SW] OnLibrary Service Worker ${SW_VERSION} loaded`);