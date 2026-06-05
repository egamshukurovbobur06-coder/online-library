// ============ FIREBASE CONFIG ============
const firebaseConfig = {
    apiKey: "AIzaSyDR9U-ZrthEDBI84_uKUlEVCqIRQ-76JGk",
    authDomain: "online-kutubxona-uz.firebaseapp.com",
    databaseURL: "https://online-kutubxona-uz-default-rtdb.firebaseio.com",
    projectId: "online-kutubxona-uz",
    storageBucket: "online-kutubxona-uz.firebasestorage.app",
    messagingSenderId: "752374802732",
    appId: "1:752374802732:web:b5f5122a43730521f22489"
};

// Firebase'ni ishga tushirish
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ============ MA'LUMOTLAR ============
let currentUser = null;
let shelfCount = 0;
const MAX_SHELVES = 3;
const SESSION_DURATION = 60 * 60 * 1000; // 1 soat

const BOOK_COLORS = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
    '#1abc9c', '#e67e22', '#2c3e50', '#c0392b', '#16a085',
    '#8e44ad', '#d35400', '#27ae60', '#2980b9', '#f1c40f'
];

const THEMES = {
    cosmic: {
        name: 'Koinot',
        icon: '🌌',
        className: ''
    },
    kabutar: {
        name: 'Kabutar',
        icon: '🕊️',
        className: 'theme-kabutar'
    },
    booklover: {
        name: 'Booklover',
        icon: '📖',
        className: 'theme-booklover'
    }
};

// ============ FOYDALANUVCHILAR ============
function getUsers() {
    return new Promise((resolve) => {
        db.ref('users').once('value').then(snapshot => {
            const users = snapshot.val() || {};
            resolve(Object.values(users));
        });
    });
}

function saveUser(user) {
    return db.ref(`users/${user.login}`).set(user);
}

async function findUserByLogin(login) {
    const snapshot = await db.ref(`users/${login}`).once('value');
    return snapshot.val() || null;
}

async function updateUserBooks(login, bookCount) {
    const user = await findUserByLogin(login);
    if (user) {
        user.books = bookCount;
        await saveUser(user);
    }
}

// ============ SESSIYA ============
function checkSession() {
    const sessionTime = localStorage.getItem('sessionTime');
    if (sessionTime) {
        const elapsed = Date.now() - parseInt(sessionTime);
        if (elapsed > SESSION_DURATION) {
            logout();
            return false;
        }
    }
    return true;
}

function updateSessionTime() {
    localStorage.setItem('sessionTime', Date.now().toString());
}

// ============ AUTH ============
function showAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));

    if (tab === 'login') {
        document.querySelector('.auth-tab[data-tab="login"]').classList.add('active');
        document.getElementById('loginPanel').classList.add('active');
    } else {
        document.querySelector('.auth-tab[data-tab="register"]').classList.add('active');
        document.getElementById('registerPanel').classList.add('active');
    }
    document.getElementById('authMessage').className = 'auth-message';
    document.getElementById('authMessage').textContent = '';
}

function showAuthMessage(text, type) {
    const msg = document.getElementById('authMessage');
    msg.textContent = text;
    msg.className = 'auth-message ' + type;
    setTimeout(() => {
        msg.className = 'auth-message';
        msg.textContent = '';
    }, 4000);
}

async function login() {
    const loginInput = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!loginInput || !password) {
        showAuthMessage('Login va parolni kiriting', 'error');
        return;
    }

    const user = await findUserByLogin(loginInput);
    if (!user) {
        showAuthMessage('Bunday foydalanuvchi topilmadi', 'error');
        return;
    }

    if (user.password !== password) {
        showAuthMessage('Parol noto\'g\'ri', 'error');
        return;
    }

    currentUser = user;
    updateSessionTime();
    localStorage.setItem('lastLoggedInLogin', user.login);
    enterApp();
}

async function register() {
    const name = document.getElementById('regName').value.trim();
    const loginInput = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;

    if (!name || !loginInput || !password || !passwordConfirm) {
        showAuthMessage('Barcha maydonlarni to\'ldiring', 'error');
        return;
    }

    if (name.length < 2) {
        showAuthMessage('Ism kamida 2 ta belgidan iborat bo\'lishi kerak', 'error');
        return;
    }

    if (loginInput.length < 3) {
        showAuthMessage('Login kamida 3 ta belgidan iborat bo\'lishi kerak', 'error');
        return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(loginInput)) {
        showAuthMessage('Login faqat harflar, raqamlar va pastki chiziqdan iborat bo\'lishi kerak', 'error');
        return;
    }

    const existingUser = await findUserByLogin(loginInput);
    if (existingUser) {
        showAuthMessage('Bu login allaqachon band qilingan', 'error');
        return;
    }

    if (password.length < 8) {
        showAuthMessage('Parol kamida 8 ta belgidan iborat bo\'lishi kerak', 'error');
        return;
    }

    if (!/[A-Z]/.test(password)) {
        showAuthMessage('Parolda kamida 1 ta katta harf bo\'lishi kerak', 'error');
        return;
    }

    if (!/[0-9]/.test(password)) {
        showAuthMessage('Parolda kamida 1 ta raqam bo\'lishi kerak', 'error');
        return;
    }

    if (password !== passwordConfirm) {
        showAuthMessage('Parollar mos kelmadi', 'error');
        return;
    }

    const newUser = {
        name: name,
        login: loginInput,
        password: password,
        books: 0,
        registeredAt: new Date().toISOString()
    };

    await saveUser(newUser);
    currentUser = newUser;
    updateSessionTime();
    localStorage.setItem('lastLoggedInLogin', newUser.login);
    enterApp();
}

function enterApp() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';

    document.getElementById('sidebarAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('sidebarName').textContent = currentUser.name;
    document.getElementById('sidebarEmail').textContent = '@' + currentUser.login;

    document.getElementById('profileAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = '@' + currentUser.login;

    loadShelves();
    updateAllStats();
    applyTheme(localStorage.getItem('appTheme') || 'cosmic');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('sessionTime');
    document.getElementById('authSection').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';

    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    const libraryLink = document.querySelector('.sidebar-link[data-panel="library"]');
    if (libraryLink) libraryLink.classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    const libraryPanel = document.getElementById('libraryPanel');
    if (libraryPanel) libraryPanel.classList.add('active');
}

// ============ PANEL NAVIGATSIYASI ============
function initNavigation() {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            const panelId = link.dataset.panel;

            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            const panel = document.getElementById(panelId + 'Panel');
            if (panel) panel.classList.add('active');

            if (panelId === 'profile') updateProfileStats();
            if (panelId === 'stats') renderGlobalStats();
            if (panelId === 'themes') renderThemesGrid();

            if (window.innerWidth <= 1024) {
                document.getElementById('sidebar').classList.remove('open');
            }
        });
    });
}

// ============ STATISTIKA ============
function updateAllStats() {
    const books = document.querySelectorAll('.book');
    const total = books.length;
    const read = document.querySelectorAll('.book[data-status="read"]').length;
    const reading = document.querySelectorAll('.book[data-status="reading"]').length;
    const unread = document.querySelectorAll('.book[data-status="unread"]').length;

    document.getElementById('statTotal').textContent = total;
    document.getElementById('statRead').textContent = read;
    document.getElementById('statReading').textContent = reading;
    document.getElementById('statUnread').textContent = unread;

    if (currentUser) {
        updateUserBooks(currentUser.login, total);
    }
}

function updateProfileStats() {
    const total = document.querySelectorAll('.book').length;
    const read = document.querySelectorAll('.book[data-status="read"]').length;

    document.getElementById('profileBooks').textContent = total;
    document.getElementById('profileShelves').textContent = shelfCount;
    document.getElementById('profileRead').textContent = read;
}

async function renderGlobalStats() {
    const users = await getUsers();
    const currentBooks = document.querySelectorAll('.book').length;

    const allUsers = users.map(u => {
        if (u.login === currentUser.login) {
            return { ...u, books: currentBooks };
        }
        return u;
    });

    allUsers.sort((a, b) => b.books - a.books);

    const container = document.getElementById('globalStatsList');

    if (allUsers.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #94a3b8;">
                <p style="font-size: 40px; margin-bottom: 12px;">📊</p>
                <p>Hozircha foydalanuvchilar yo'q</p>
            </div>
        `;
        return;
    }

    container.innerHTML = allUsers.map((u, i) => `
        <div class="global-stats-item" style="${u.login === currentUser.login ? 'background: rgba(139, 92, 246, 0.15); border-color: rgba(139, 92, 246, 0.4);' : ''}">
            <div class="global-stats-rank">${i + 1}</div>
            <div class="global-stats-avatar">${u.name.charAt(0).toUpperCase()}</div>
            <div class="global-stats-name">${u.name} ${u.login === currentUser.login ? '(Siz)' : ''}</div>
            <div class="global-stats-count">${u.books} ta</div>
        </div>
    `).join('');
}

// ============ JAVONLAR ============
function addShelf() {
    if (shelfCount >= MAX_SHELVES) {
        alert(`Maksimum ${MAX_SHELVES} ta javon qo'shishingiz mumkin`);
        return;
    }
    showPrompt('Yangi javon nomini kiriting', 'Javon', (name) => {
        createShelf(name);
    });
}

function createShelf(name) {
    shelfCount++;
    const id = Date.now();
    const container = document.getElementById('shelvesContainer');

    const empty = container.querySelector('.empty-shelves');
    if (empty) empty.remove();

    const shelf = document.createElement('div');
    shelf.className = 'shelf';
    shelf.id = `shelf-${id}`;
    shelf.innerHTML = `
        <div class="shelf-header">
            <span class="shelf-name" id="shelfName-${id}">${escapeHtml(name)}</span>
            <div class="shelf-actions">
                <button class="shelf-btn add-book" onclick="showAddBookModal(${id})">+ Kitob</button>
                <button class="shelf-btn rename" onclick="renameShelf(${id})">✏️</button>
                <button class="shelf-btn delete" onclick="deleteShelf(${id})">🗑️</button>
            </div>
        </div>
        <div class="books-row" id="books-${id}"></div>
        <div class="shelf-board"></div>
    `;
    container.appendChild(shelf);
    saveShelves();
    updateAddButton();
    updateAllStats();
    updateProfileStats();
}

function renameShelf(id) {
    const currentName = document.getElementById(`shelfName-${id}`).textContent;
    showPrompt('Javon nomini o\'zgartirish', currentName, (newName) => {
        document.getElementById(`shelfName-${id}`).textContent = escapeHtml(newName);
        saveShelves();
    });
}

function deleteShelf(id) {
    if (confirm('Javon va undagi barcha kitoblar o\'chiriladi. Davom etasizmi?')) {
        const shelf = document.getElementById(`shelf-${id}`);
        if (shelf) {
            shelf.remove();
            shelfCount--;
            saveShelves();
            updateAddButton();
            updateAllStats();
            updateProfileStats();

            if (document.getElementById('shelvesContainer').children.length === 0) {
                document.getElementById('shelvesContainer').innerHTML = '<div class="empty-shelves">Hozircha javonlar yo\'q</div>';
            }
        }
    }
}

function updateAddButton() {
    const btn = document.getElementById('addShelfBtn');
    if (shelfCount >= MAX_SHELVES) {
        btn.disabled = true;
        btn.textContent = `Maksimum (${MAX_SHELVES})`;
    } else {
        btn.disabled = false;
        btn.textContent = '+ Yangi javon';
    }
}

// ============ KITOBLAR ============
function showAddBookModal(shelfId) {
    const colorsHtml = BOOK_COLORS.map(c =>
        `<div class="color-circle" style="background:${c}" data-color="${c}"></div>`
    ).join('');

    const modal = document.getElementById('bookModal');
    const body = modal.querySelector('.modal-body');
    body.innerHTML = `
        <h3>Yangi kitob qo'shish</h3>
        <input type="text" id="bookTitle" class="modal-input" placeholder="Kitob nomi *">
        <input type="text" id="bookAuthor" class="modal-input" placeholder="Yozuvchi">
        <textarea id="bookDesc" class="modal-input" placeholder="Tavsif" rows="3"></textarea>
        <label style="color: #94a3b8; font-size: 13px; display: block; margin-bottom: 8px;">Kitob muqovasi (ixtiyoriy, faqat kitob detalida ko'rinadi)</label>
        <input type="file" id="bookCover" class="modal-input" accept="image/*" style="padding: 10px;">
        <label style="color: #94a3b8; font-size: 13px; display: block; margin-bottom: 8px;">Kitob rangi (javonda ko'rinadi)</label>
        <div class="color-list" id="colorList">${colorsHtml}</div>
        <div class="modal-actions">
            <button class="modal-btn" id="cancelBookBtn">Bekor qilish</button>
            <button class="modal-btn edit" id="saveBookBtn">Saqlash</button>
        </div>
    `;

    let selectedColor = BOOK_COLORS[0];

    modal.classList.add('active');

    document.querySelectorAll('#colorList .color-circle').forEach(c => {
        if (c.dataset.color === BOOK_COLORS[0]) c.classList.add('selected');
        c.onclick = () => {
            document.querySelectorAll('#colorList .color-circle').forEach(c2 => c2.classList.remove('selected'));
            c.classList.add('selected');
            selectedColor = c.dataset.color;
        };
    });

    document.getElementById('saveBookBtn').onclick = () => {
        const title = document.getElementById('bookTitle').value.trim();
        if (!title) {
            alert('Iltimos, kitob nomini kiriting');
            return;
        }

        const author = document.getElementById('bookAuthor').value.trim() || 'Noma\'lum';
        const desc = document.getElementById('bookDesc').value.trim();
        const coverFile = document.getElementById('bookCover').files[0];

        if (coverFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                createBook(shelfId, title, author, desc, selectedColor, e.target.result);
                modal.classList.remove('active');
            };
            reader.readAsDataURL(coverFile);
        } else {
            createBook(shelfId, title, author, desc, selectedColor, null);
            modal.classList.remove('active');
        }
    };

    document.getElementById('cancelBookBtn').onclick = () => modal.classList.remove('active');
}

function createBook(shelfId, title, author, desc, color, cover) {
    const row = document.getElementById(`books-${shelfId}`);
    const height = Math.floor(Math.random() * 40) + 140;

    const book = document.createElement('div');
    book.className = 'book';
    book.style.background = color;
    book.style.height = height + 'px';
    book.dataset.title = title;
    book.dataset.author = author;
    book.dataset.description = desc;
    book.dataset.color = color;
    book.dataset.cover = cover || '';
    book.dataset.status = 'unread';
    book.dataset.rating = '0';

    const textColor = getTextColor(color);
    book.innerHTML = `<div class="book-title" style="color:${textColor}">${escapeHtml(title)}</div>`;
    book.onclick = () => showBookModal(book);

    row.appendChild(book);
    saveShelves();
    updateAllStats();
    updateProfileStats();
}

function getTextColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? '#1a1a1a' : '#ffffff';
}

function showBookModal(book) {
    const title = book.dataset.title;
    const author = book.dataset.author;
    const desc = book.dataset.description;
    const cover = book.dataset.cover;
    const status = book.dataset.status;
    const rating = parseInt(book.dataset.rating) || 0;

    const modal = document.getElementById('bookModal');
    const body = modal.querySelector('.modal-body');
    body.innerHTML = `
        <h3>${escapeHtml(title)}</h3>
        ${cover ? `<div style="text-align: center; margin-bottom: 16px;"><img src="${cover}" alt="${escapeHtml(title)}" style="max-width: 150px; max-height: 220px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"></div>` : ''}
        <div class="book-info">
            <p>✍️ Yozuvchi: ${escapeHtml(author)}</p>
            ${desc ? `<p>📝 Tavsif: ${escapeHtml(desc)}</p>` : ''}
        </div>
        <label style="color: #94a3b8; font-size: 13px;">Holati</label>
        <div class="status-group">
            <button class="status-btn ${status === 'unread' ? 'active' : ''}" data-status="unread">📌 O'qilmagan</button>
            <button class="status-btn ${status === 'reading' ? 'active' : ''}" data-status="reading">📖 O'qiyapman</button>
            <button class="status-btn ${status === 'read' ? 'active' : ''}" data-status="read">✅ O'qilgan</button>
        </div>
        <label style="color: #94a3b8; font-size: 13px;">Baholash</label>
        <div class="rating-stars" id="ratingContainer">
            ${[1, 2, 3, 4, 5].map(i => `<span class="rating-star ${i <= rating ? 'active' : ''}" data-rating="${i}">★</span>`).join('')}
        </div>
        <div class="modal-actions">
            <button class="modal-btn edit" id="editBookBtn">✏️ Tahrirlash</button>
            <button class="modal-btn delete" id="deleteBookBtn">🗑️ O'chirish</button>
        </div>
    `;

    body.querySelectorAll('.status-btn').forEach(btn => {
        btn.onclick = () => {
            book.dataset.status = btn.dataset.status;
            saveShelves();
            updateAllStats();
            updateProfileStats();
            showBookModal(book);
        };
    });

    body.querySelectorAll('.rating-star').forEach(star => {
        star.onclick = () => {
            const val = parseInt(star.dataset.rating);
            book.dataset.rating = val;
            saveShelves();
            showBookModal(book);
        };
    });

    document.getElementById('editBookBtn').onclick = () => {
        modal.classList.remove('active');
        showEditBookModal(book);
    };

    document.getElementById('deleteBookBtn').onclick = () => {
        if (confirm(`"${title}" kitobini o'chirishni xohlaysizmi?`)) {
            book.remove();
            saveShelves();
            updateAllStats();
            updateProfileStats();
            modal.classList.remove('active');
        }
    };

    modal.classList.add('active');
}

function showEditBookModal(book) {
    const modal = document.getElementById('bookModal');
    const body = modal.querySelector('.modal-body');
    body.innerHTML = `
        <h3>Kitobni tahrirlash</h3>
        <input type="text" id="editTitle" class="modal-input" value="${escapeHtml(book.dataset.title)}" placeholder="Kitob nomi">
        <input type="text" id="editAuthor" class="modal-input" value="${escapeHtml(book.dataset.author)}" placeholder="Yozuvchi">
        <textarea id="editDesc" class="modal-input" rows="3" placeholder="Tavsif">${escapeHtml(book.dataset.description || '')}</textarea>
        <label style="color: #94a3b8; font-size: 13px; display: block; margin-bottom: 8px;">Yangi muqova (ixtiyoriy, faqat kitob detalida ko'rinadi)</label>
        <input type="file" id="editCover" class="modal-input" accept="image/*" style="padding: 10px;">
        ${book.dataset.cover ? `<p style="color: #94a3b8; font-size: 12px; margin-bottom: 12px;">✅ Joriy muqova mavjud</p>` : ''}
        <div class="modal-actions">
            <button class="modal-btn" id="cancelEditBtn">Bekor qilish</button>
            <button class="modal-btn edit" id="saveEditBtn">Saqlash</button>
        </div>
    `;

    document.getElementById('saveEditBtn').onclick = () => {
        const newTitle = document.getElementById('editTitle').value.trim();
        if (!newTitle) {
            alert('Kitob nomi bo\'sh bo\'lishi mumkin emas');
            return;
        }

        const coverFile = document.getElementById('editCover').files[0];

        const updateBook = function(coverData) {
            book.dataset.title = newTitle;
            book.dataset.author = document.getElementById('editAuthor').value.trim() || 'Noma\'lum';
            book.dataset.description = document.getElementById('editDesc').value.trim();

            if (coverData) {
                book.dataset.cover = coverData;
            }

            book.querySelector('.book-title').textContent = newTitle;
            saveShelves();
            updateAllStats();
            modal.classList.remove('active');
            showBookModal(book);
        };

        if (coverFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updateBook(e.target.result);
            };
            reader.readAsDataURL(coverFile);
        } else {
            updateBook(null);
        }
    };

    document.getElementById('cancelEditBtn').onclick = () => {
        modal.classList.remove('active');
        showBookModal(book);
    };

    modal.classList.add('active');
}

// ============ QIDIRUV ============
function initSearch() {
    const input = document.getElementById('searchInput');
    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();

        document.querySelectorAll('.book').forEach(book => {
            const title = book.dataset.title.toLowerCase();
            const author = book.dataset.author.toLowerCase();
            const matches = title.includes(term) || author.includes(term);

            book.style.display = term === '' || matches ? '' : 'none';

            const shelf = book.closest('.shelf');
            if (shelf && term !== '') {
                const visibleBooks = shelf.querySelectorAll('.book:not([style*="display: none"])').length;
                shelf.style.display = visibleBooks === 0 ? 'none' : '';
            } else if (shelf) {
                shelf.style.display = '';
            }
        });
    });
}

// ============ MAVZULAR ============
function renderThemesGrid() {
    const grid = document.getElementById('themesGrid');
    const currentTheme = localStorage.getItem('appTheme') || 'cosmic';

    grid.innerHTML = Object.entries(THEMES).map(([key, theme]) => `
        <div class="theme-card ${key === currentTheme ? 'active' : ''}" data-theme="${key}" style="
            ${key === 'cosmic' ? 'background: linear-gradient(135deg, #1e1b4b 0%, #0f0a2e 50%, #1a0a2e 100%); color: #e2e8f0; border: 1px solid rgba(139,92,246,0.3);' : ''}
            ${key === 'kabutar' ? 'background: linear-gradient(135deg, #fff5f9 0%, #fdf2f8 30%, #f3e8ff 100%); color: #4a1942; border: 1px solid rgba(236,72,153,0.2);' : ''}
            ${key === 'booklover' ? 'background: linear-gradient(135deg, #fdf2f8 0%, #e0f2fe 40%, #f3e8ff 100%); color: #1e1b4b; border: 1px solid rgba(236,72,153,0.2);' : ''}
        ">
            <span class="theme-card-icon">${theme.icon}</span>
            <span class="theme-card-name">${theme.name}</span>
        </div>
    `).join('');

    grid.querySelectorAll('.theme-card').forEach(card => {
        card.onclick = () => {
            const themeKey = card.dataset.theme;
            applyTheme(themeKey);
            renderThemesGrid();
        };
    });
}

function applyTheme(key) {
    document.body.classList.remove('theme-kabutar', 'theme-booklover');

    const theme = THEMES[key];
    if (theme && theme.className) {
        document.body.classList.add(theme.className);
    }

    localStorage.setItem('appTheme', key);
}

// ============ FIREBASE SAQLASH ============
function saveShelves() {
    if (!currentUser) return;

    const shelves = [];
    document.querySelectorAll('.shelf').forEach(s => {
        const id = s.id.replace('shelf-', '');
        const name = s.querySelector('.shelf-name').textContent;
        const books = [];
        s.querySelectorAll('.book').forEach(b => {
            books.push({
                title: b.dataset.title,
                author: b.dataset.author,
                description: b.dataset.description,
                color: b.dataset.color,
                cover: b.dataset.cover || '',
                height: b.style.height,
                status: b.dataset.status,
                rating: b.dataset.rating
            });
        });
        shelves.push({ id, name, books });
    });

    db.ref(`shelves/${currentUser.login}`).set({
        shelves: shelves,
        shelfCount: shelfCount
    });
}

async function loadShelves() {
    if (!currentUser) return;

    const snapshot = await db.ref(`shelves/${currentUser.login}`).once('value');
    const saved = snapshot.val();
    const container = document.getElementById('shelvesContainer');

    if (saved && saved.shelves) {
        const shelves = saved.shelves;
        shelfCount = saved.shelfCount || shelves.length;
        container.innerHTML = '';

        shelves.forEach(s => {
            const shelf = document.createElement('div');
            shelf.className = 'shelf';
            shelf.id = `shelf-${s.id}`;
            shelf.innerHTML = `
                <div class="shelf-header">
                    <span class="shelf-name" id="shelfName-${s.id}">${escapeHtml(s.name)}</span>
                    <div class="shelf-actions">
                        <button class="shelf-btn add-book" onclick="showAddBookModal(${s.id})">+ Kitob</button>
                        <button class="shelf-btn rename" onclick="renameShelf(${s.id})">✏️</button>
                        <button class="shelf-btn delete" onclick="deleteShelf(${s.id})">🗑️</button>
                    </div>
                </div>
                <div class="books-row" id="books-${s.id}"></div>
                <div class="shelf-board"></div>
            `;
            container.appendChild(shelf);

            const row = document.getElementById(`books-${s.id}`);
            s.books.forEach(b => {
                const book = document.createElement('div');
                book.className = 'book';
                book.style.background = b.color;
                book.style.height = b.height;
                book.dataset.title = b.title;
                book.dataset.author = b.author;
                book.dataset.description = b.description || '';
                book.dataset.color = b.color;
                book.dataset.cover = b.cover || '';
                book.dataset.status = b.status || 'unread';
                book.dataset.rating = b.rating || '0';

                const textColor = getTextColor(b.color);
                book.innerHTML = `<div class="book-title" style="color:${textColor}">${escapeHtml(b.title)}</div>`;
                book.onclick = () => showBookModal(book);
                row.appendChild(book);
            });
        });
    } else {
        container.innerHTML = '<div class="empty-shelves">Hozircha javonlar yo\'q</div>';
        shelfCount = 0;
    }

    updateAddButton();
    updateAllStats();
    updateProfileStats();
}

// ============ PROMPT ============
function showPrompt(title, defaultValue, callback) {
    const modal = document.getElementById('bookModal');
    const body = modal.querySelector('.modal-body');
    body.innerHTML = `
        <h3>${title}</h3>
        <input type="text" id="promptInput" class="modal-input" value="${escapeHtml(defaultValue)}" autofocus>
        <div class="modal-actions">
            <button class="modal-btn" id="promptCancel">Bekor qilish</button>
            <button class="modal-btn edit" id="promptSave">Saqlash</button>
        </div>
    `;
    modal.classList.add('active');

    const input = document.getElementById('promptInput');
    input.focus();
    input.select();

    document.getElementById('promptSave').onclick = () => {
        const val = input.value.trim();
        if (val) callback(val);
        modal.classList.remove('active');
    };

    document.getElementById('promptCancel').onclick = () => modal.classList.remove('active');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            if (val) callback(val);
            modal.classList.remove('active');
        }
    });
}

// ============ UTILS ============
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============ INIT ============
window.onload = function () {
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.onclick = () => showAuthTab(tab.dataset.tab);
    });

    document.getElementById('loginBtn').onclick = login;
    document.getElementById('registerBtn').onclick = register;

    document.getElementById('loginPassword').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') login();
    });

    document.getElementById('regPasswordConfirm').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') register();
    });

    if (!checkSession()) return;

    const sessionTime = localStorage.getItem('sessionTime');
    const savedLogin = localStorage.getItem('lastLoggedInLogin');

    if (sessionTime && savedLogin) {
        const elapsed = Date.now() - parseInt(sessionTime);
        if (elapsed <= SESSION_DURATION) {
            findUserByLogin(savedLogin).then(user => {
                if (user) {
                    currentUser = user;
                    enterApp();
                }
            });
        } else {
            localStorage.removeItem('sessionTime');
        }
    }

    initNavigation();
    initSearch();

    document.getElementById('addShelfBtn').onclick = addShelf;
    document.getElementById('sidebarLogout').onclick = logout;

    document.getElementById('menuToggle').onclick = () => {
        document.getElementById('sidebar').classList.toggle('open');
    };

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.onclick = () => btn.closest('.modal-custom').classList.remove('active');
    });

    window.onclick = (e) => {
        if (e.target.classList.contains('modal-custom')) {
            e.target.classList.remove('active');
        }
    };

    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.getElementById('menuToggle');
        if (window.innerWidth <= 1024 &&
            !sidebar.contains(e.target) &&
            e.target !== menuToggle &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
};