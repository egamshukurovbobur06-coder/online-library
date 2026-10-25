// ================================================
//  OnLibrary — PROFESSIONAL JS v9.0
//  Admin Library · 4 Qatorli Javon · 10 O'lcham
//  PDF/Audio Progress · Chat Read · Kitoblar paneli
// ================================================

// ================================================
//  FIREBASE KONFIGURATSIYA
// ================================================
const firebaseConfig = {
    apiKey: "AIzaSyDR9U-ZrthEDBI84_uKUlEVCqIRQ-76JGk",
    authDomain: "online-kutubxona-uz.firebaseapp.com",
    databaseURL: "https://online-kutubxona-uz-default-rtdb.firebaseio.com",
    projectId: "online-kutubxona-uz",
    storageBucket: "online-kutubxona-uz.firebasestorage.app",
    messagingSenderId: "752374802732",
    appId: "1:752374802732:web:b5f5122a43730521f22489"
};

// ================================================
//  ✅ ADMIN KONFIGURATSIYA
//  Bu yerga o'zingizning admin email'ingizni kiriting
// ================================================
const ADMIN_EMAILS = [
    'egamshukurovbobur06@gmail.com',      // ← o'zgartiring
    // 'sizning@emailingiz.com'
];

// ================================================
//  PDF.JS WORKER
// ================================================
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
}

// ================================================
//  SVG ICONS
// ================================================
const ICONS = {
    author: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
    description: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    calendar: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    tag: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
    pages: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>`,
    bookCover: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    viewMode: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    share: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    rating: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    library: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:var(--green);flex-shrink:0;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    check: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="vertical-align:middle;margin-right:6px;color:#22c55e;flex-shrink:0;"><polyline points="20 6 9 17 4 12"/></svg>`,
    reading: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:#f39c12;flex-shrink:0;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    unread: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:#e74c3c;flex-shrink:0;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    pdf: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:#dc2626;flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    audio: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:#8b5cf6;flex-shrink:0;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    link: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:#0ea5e9;flex-shrink:0;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    progress: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:middle;margin-right:6px;color:#f39c12;flex-shrink:0;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
};

// ================================================
//  EMAILJS
// ================================================
const EMAILJS_PUBLIC_KEY = 'nlaLJOH8rHQ1s_qfY';
const EMAILJS_SERVICE_ID = 'service_kxucgmi';
const EMAILJS_TEMPLATE_ID = 'template_b5ua3vo';

if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ================================================
//  GLOBAL O'ZGARUVCHILAR
// ================================================
let db, auth, chatRef = null;
let currentUser = null;
let isAdmin = false;
let viewingOtherUser = null;
let selectedUser = null;
let isEditing = false;
let pendingUser = null;
let resetEmail_global = '';
let activityTrackerInited = false;

const SESSION_DURATION = 60 * 60 * 1000;

const BOOK_HEIGHT_DEFAULT = 60;
const BOOK_WIDTH_DEFAULT = 24;

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// ✅ 10 ta balandlik
const BOOK_HEIGHTS = [
    { h: 40 }, { h: 48 }, { h: 52 }, { h: 56 }, { h: 60 },
    { h: 64 }, { h: 68 }, { h: 72 }, { h: 76 }, { h: 80 }
];

// ✅ 10 ta qalinlik
const BOOK_WIDTHS = [
    { w: 6 },  { w: 8 },  { w: 10 }, { w: 12 }, { w: 14 },
    { w: 18 }, { w: 22 }, { w: 28 }, { w: 36 }, { w: 44 }
];

const BOOK_COLORS = [
    '#e74c3c', '#c0392b', '#e67e22', '#d35400', '#f39c12',
    '#f1c40f', '#ff6b6b', '#ff8787', '#ffa502', '#ff6348',
    '#3498db', '#2980b9', '#2ecc71', '#27ae60', '#1abc9c',
    '#16a085', '#9b59b6', '#8e44ad', '#00bcd4', '#0097a7',
    '#ecf0f1', '#bdc3c7', '#95a5a6', '#7f8c8d', '#6b4226',
    '#8b6914', '#a0522d', '#5d3a1a', '#3d2b1f', '#2c3e50'
];

// Wizard state
let addBookWizard = null;

// Chat
let totalUnreadChats = 0;

// Drag & drop
let cropperInstance = null;
let cropCallback = null;

let draggedBook = null;
let isDragging = false;
let longPressTimer = null;
let dragClone = null;
let selectedBookForMove = null;
let isMoveMode = false;

// Share
let currentShareData = null;

// PDF
let pdfDoc = null;
let pdfPageNum = 1;
let pdfScale = 1.0;
let pdfRendering = false;
let pdfCurrentBook = null;

// Audio
let audioCurrentBook = null;
let audioProgressInterval = null;
const audioEl = () => document.getElementById('audioElement');

// Books panel
let booksPanelFilter = 'all';
let cachedAdminBooks = [];

// ================================================
//  YORDAMCHI FUNKSIYALAR
// ================================================

function getUsers() {
    return new Promise(resolve => {
        db.ref('users').once('value')
            .then(snapshot => resolve(Object.values(snapshot.val() || {})))
            .catch(() => resolve([]));
    });
}

function saveUser(user) {
    return db.ref(`users/${user.uid}`).set(user);
}

async function findUserByUid(uid) {
    const snapshot = await db.ref(`users/${uid}`).once('value');
    return snapshot.val() || null;
}

function checkSession() {
    const time = localStorage.getItem('sessionTime');
    if (time && Date.now() - parseInt(time) > SESSION_DURATION) {
        logout();
        return false;
    }
    return true;
}

function updateSessionTime() {
    localStorage.setItem('sessionTime', Date.now().toString());
}

function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, s => map[s]);
}

function getTextColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? '#1a1a1a' : '#ffffff';
}

function getChatId(user1, user2) {
    return [user1, user2].sort().join('_');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function setBtnLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
        btn.classList.add('btn-loading');
        btn.disabled = true;
    } else {
        btn.classList.remove('btn-loading');
        btn.disabled = false;
    }
}

function generateBookId() {
    return 'b_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function sanitizeFilename(name) {
    return String(name || 'onlibrary').replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 60);
}

function debounce(fn, wait = 300) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function formatFileSize(bytes) {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function formatRelativeTime(timestamp) {
    if (!timestamp) return '';
    const diff = Date.now() - timestamp;
    const min = Math.floor(diff / 60000);
    if (min < 1) return 'hozir';
    if (min < 60) return `${min} daqiqa oldin`;
    const hours = Math.floor(min / 60);
    if (hours < 24) return `${hours} soat oldin`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} kun oldin`;
    const months = Math.floor(days / 30);
    return `${months} oy oldin`;
}

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function base64ToUint8Array(base64DataUrl) {
    const base64Part = base64DataUrl.split(',')[1] || base64DataUrl;
    const binaryString = atob(base64Part);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// ================================================
//  CUSTOM ALERT
// ================================================
function showAlert(message, type = 'info', title = null) {
    const modal = document.getElementById('customAlert');
    const icon = document.getElementById('customAlertIcon');
    const titleEl = document.getElementById('customAlertTitle');
    const msgEl = document.getElementById('customAlertMessage');

    if (!modal) { alert(message); return; }

    const icons = {
        success: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    const titles = { success: 'Muvaffaqiyatli', error: 'Xatolik', warning: 'Diqqat', info: 'Ma\'lumot' };

    icon.className = 'custom-modal-icon ' + type;
    icon.innerHTML = icons[type] || icons.info;
    titleEl.textContent = title || titles[type] || 'Xabar';
    msgEl.textContent = message;
    modal.classList.add('active');

    const okBtn = document.getElementById('customAlertOk');
    okBtn.onclick = () => modal.classList.remove('active');

    const escHandler = (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
    setTimeout(() => okBtn.focus(), 100);
}

// ================================================
//  CUSTOM CONFIRM
// ================================================
function showConfirm(message, onConfirm, options = {}) {
    const modal = document.getElementById('customConfirm');
    const msgEl = document.getElementById('customConfirmMessage');
    const titleEl = document.getElementById('customConfirmTitle');
    const okBtn = document.getElementById('customConfirmOk');
    const cancelBtn = document.getElementById('customConfirmCancel');

    if (!modal) { if (confirm(message)) onConfirm(); return; }

    titleEl.textContent = options.title || 'Tasdiqlash';
    msgEl.textContent = message;
    okBtn.textContent = options.confirmText || 'Ha, davom etish';
    cancelBtn.textContent = options.cancelText || 'Bekor qilish';

    modal.classList.add('active');

    const cleanup = () => {
        modal.classList.remove('active');
        okBtn.onclick = null;
        cancelBtn.onclick = null;
        modal.onclick = null;
    };

    okBtn.onclick = () => { cleanup(); if (typeof onConfirm === 'function') onConfirm(); };
    cancelBtn.onclick = cleanup;
    modal.onclick = (e) => { if (e.target === modal) cleanup(); };

    const escHandler = (e) => {
        if (e.key === 'Escape') {
            cleanup();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    setTimeout(() => okBtn.focus(), 100);
}

// ================================================
//  MOVE NOTIFICATION
// ================================================
function showMoveNotification(message) {
    let notification = document.getElementById('moveNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'moveNotification';
        notification.style.cssText = `
            position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
            background:rgba(26,58,26,0.96); color:#e8f0e8; padding:14px 26px;
            border-radius:12px; z-index:9999; font-size:14px; font-family:var(--font-ui);
            border:1px solid rgba(111,168,111,0.4); backdrop-filter:blur(10px);
            transition:all 0.3s ease; box-shadow:0 8px 24px rgba(0,0,0,0.3);
            opacity:0; pointer-events:none;
        `;
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.style.opacity = '1';
    notification.style.bottom = '24px';
    clearTimeout(notification._timeout);
    notification._timeout = setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.bottom = '0px';
    }, 2200);
}

// ================================================
//  📌 PROGRESS (PDF + Audio) SAQLASH
// ================================================
async function getBookProgress(bookId) {
    if (!currentUser || !bookId) return null;
    try {
        const snap = await db.ref(`progress/${currentUser.uid}/${bookId}`).once('value');
        return snap.val() || null;
    } catch (_) {
        return null;
    }
}

async function saveBookProgress(bookId, partial) {
    if (!currentUser || !bookId) return;
    try {
        await db.ref(`progress/${currentUser.uid}/${bookId}`).update({
            ...partial,
            updatedAt: Date.now()
        });
    } catch (_) {}
}

async function deleteBookProgress(bookId) {
    if (!currentUser || !bookId) return;
    try {
        await db.ref(`progress/${currentUser.uid}/${bookId}`).remove();
    } catch (_) {}
}

// ================================================
//  CROP MODAL
// ================================================
function openCropModal(file, aspectRatio, title, callback) {
    const modal = document.getElementById('cropModal');
    const img = document.getElementById('cropImage');
    const titleEl = document.getElementById('cropTitle');

    if (!modal || !img) {
        const reader = new FileReader();
        reader.onload = (e) => callback(e.target.result);
        reader.readAsDataURL(file);
        return;
    }

    if (titleEl) titleEl.textContent = title || 'Rasmni qirqish';

    const aspectTabs = document.getElementById('cropAspectTabs');
    if (aspectTabs) {
        aspectTabs.querySelectorAll('.crop-aspect-btn').forEach(btn => {
            btn.classList.remove('active');
            const val = btn.dataset.aspect;
            if (aspectRatio === null || aspectRatio === undefined || isNaN(aspectRatio)) {
                if (val === 'free') btn.classList.add('active');
            } else if (Math.abs(parseFloat(val) - aspectRatio) < 0.001) {
                btn.classList.add('active');
            }
        });
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        img.src = e.target.result;
        modal.classList.add('active');

        if (cropperInstance) {
            try { cropperInstance.destroy(); } catch(_) {}
            cropperInstance = null;
        }

        if (typeof Cropper !== 'undefined') {
            const initialAspect = (aspectRatio === null || aspectRatio === undefined || isNaN(aspectRatio))
                ? NaN : aspectRatio;

            cropperInstance = new Cropper(img, {
                aspectRatio: initialAspect,
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 0.85,
                restore: false,
                guides: true,
                center: true,
                highlight: false,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: false,
                background: false,
                responsive: true,
                checkOrientation: false,
                modal: true,
                movable: true,
                rotatable: false,
                scalable: false,
                zoomable: true,
                zoomOnTouch: true,
                zoomOnWheel: true,
                wheelZoomRatio: 0.1,
                minContainerWidth: 200,
                minContainerHeight: 200,
                minCropBoxWidth: 20,
                minCropBoxHeight: 20
            });
        }
        cropCallback = callback;
    };
    reader.readAsDataURL(file);
}

function closeCropModal() {
    const modal = document.getElementById('cropModal');
    if (modal) modal.classList.remove('active');
    if (cropperInstance) {
        try { cropperInstance.destroy(); } catch(_) {}
        cropperInstance = null;
    }
    cropCallback = null;
}

function applyCrop() {
    if (!cropperInstance) { closeCropModal(); return; }

    const canvas = cropperInstance.getCroppedCanvas({
        maxWidth: 900,
        maxHeight: 1400,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    });

    if (!canvas) { closeCropModal(); return; }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    if (typeof cropCallback === 'function') cropCallback(dataUrl);
    closeCropModal();
}

function initCropModal() {
    const cropCloseBtn = document.getElementById('cropCloseBtn');
    const cropCancelBtn = document.getElementById('cropCancelBtn');
    const cropSaveBtn = document.getElementById('cropSaveBtn');
    const cropModal = document.getElementById('cropModal');
    const aspectTabs = document.getElementById('cropAspectTabs');

    if (cropCloseBtn) cropCloseBtn.onclick = closeCropModal;
    if (cropCancelBtn) cropCancelBtn.onclick = closeCropModal;
    if (cropSaveBtn) cropSaveBtn.onclick = applyCrop;

    if (cropModal) {
        cropModal.onclick = (e) => { if (e.target === cropModal) closeCropModal(); };
    }

    if (aspectTabs) {
        aspectTabs.querySelectorAll('.crop-aspect-btn').forEach(btn => {
            btn.onclick = () => {
                if (!cropperInstance) return;
                const val = btn.dataset.aspect;
                aspectTabs.querySelectorAll('.crop-aspect-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (val === 'free') {
                    cropperInstance.setAspectRatio(NaN);
                } else {
                    cropperInstance.setAspectRatio(parseFloat(val));
                }
            };
        });
    }
}

// ================================================
//  FAOLLIK KUZATUVCHI
// ================================================
function initActivityTracker() {
    if (activityTrackerInited) return;
    activityTrackerInited = true;

    let lastUpdate = Date.now();
    const handler = () => {
        if (!currentUser) return;
        const now = Date.now();
        if (now - lastUpdate > 60 * 1000) {
            lastUpdate = now;
            updateSessionTime();
        }
    };

    ['click', 'keydown', 'mousemove', 'scroll', 'touchstart', 'touchmove'].forEach(ev => {
        document.addEventListener(ev, handler, { passive: true });
    });
}

// ================================================
//  AUTH UI
// ================================================
function showAuthTab(tab) {
    document.querySelectorAll('.auth-tab, .auth-panel').forEach(el => el.classList.remove('active'));
    document.querySelector(`.auth-tab[data-tab="${tab}"]`)?.classList.add('active');
    document.getElementById(tab === 'login' ? 'loginPanel' : 'registerPanel')?.classList.add('active');

    const msg = document.getElementById('authMessage');
    if (msg) { msg.className = 'auth-message'; msg.textContent = ''; }
}

function showAuthMessage(text, type) {
    const msg = document.getElementById('authMessage');
    if (!msg) return;
    msg.textContent = text;
    msg.className = `auth-message ${type}`;
    setTimeout(() => { msg.className = 'auth-message'; msg.textContent = ''; }, 4000);
}

// ================================================
//  LOGIN / REGISTER / GOOGLE
// ================================================
async function login() {
    const email = document.getElementById('loginEmail')?.value.trim().toLowerCase();
    const password = document.getElementById('loginPassword')?.value;
    const btn = document.getElementById('loginBtn');

    if (!email || !password) { showAuthMessage('Email va parolni kiriting', 'error'); return; }
    if (!isValidEmail(email)) { showAuthMessage('Email formati noto\'g\'ri', 'error'); return; }

    setBtnLoading(btn, true);
    try {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        const fbUser = cred.user;

        if (!fbUser.emailVerified) {
            pendingUser = {
                email: fbUser.email,
                name: fbUser.displayName || email.split('@')[0],
                alreadyRegistered: true
            };
            showVerifyScreen(email);
            return;
        }
        await completeLogin(fbUser);
    } catch (error) {
        const messages = {
            'auth/user-not-found': 'Bunday email ro\'yxatdan o\'tmagan',
            'auth/wrong-password': 'Parol noto\'g\'ri',
            'auth/invalid-email': 'Email formati noto\'g\'ri',
            'auth/invalid-credential': 'Email yoki parol noto\'g\'ri',
            'auth/too-many-requests': 'Juda ko\'p urinish. Keyinroq urinib ko\'ring',
            'auth/user-disabled': 'Bu akkaunt bloklangan'
        };
        showAuthMessage(messages[error.code] || 'Xatolik: ' + error.message, 'error');
    } finally {
        setBtnLoading(btn, false);
    }
}

async function register() {
    const name = document.getElementById('regName')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim().toLowerCase();
    const password = document.getElementById('regPassword')?.value;
    const confirm = document.getElementById('regPasswordConfirm')?.value;
    const btn = document.getElementById('registerBtn');

    if (!name || !email || !password || !confirm) { showAuthMessage('Barcha maydonlarni to\'ldiring', 'error'); return; }
    if (name.length < 2) { showAuthMessage('Ism kamida 2 ta belgi', 'error'); return; }
    if (!isValidEmail(email)) { showAuthMessage('Email formati noto\'g\'ri', 'error'); return; }
    if (password.length < 6) { showAuthMessage('Parol kamida 6 ta belgi', 'error'); return; }
    if (password !== confirm) { showAuthMessage('Parollar mos kelmadi', 'error'); return; }

    setBtnLoading(btn, true);
    try {
        const code = String(Math.floor(100000 + Math.random() * 900000));
        await db.ref(`pending_registrations/${btoa(email)}`).set({
            code, name, email,
            createdAt: Date.now(),
            expiresAt: Date.now() + (10 * 60 * 1000)
        });

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: email, to_name: name, verification_code: code
        });

        pendingUser = { name, email, password };
        showVerifyScreen(email);
    } catch (error) {
        console.error('Register xatosi:', error);
        showAuthMessage('Xatolik: ' + (error.text || error.message), 'error');
    } finally {
        setBtnLoading(btn, false);
    }
}

async function signInWithGoogle() {
    const btn = document.getElementById('googleSignInBtn');
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    setBtnLoading(btn, true);
    try {
        const cred = await auth.signInWithPopup(provider);
        const fbUser = cred.user;

        let userData = await findUserByUid(fbUser.uid);
        if (!userData) {
            userData = {
                uid: fbUser.uid,
                name: fbUser.displayName || 'Foydalanuvchi',
                email: fbUser.email,
                avatar: fbUser.photoURL || '',
                books: 0,
                registeredAt: new Date().toISOString(),
                provider: 'google'
            };
            await saveUser(userData);
        } else if (fbUser.photoURL && !userData.avatar) {
            userData.avatar = fbUser.photoURL;
            await saveUser(userData);
        }

        await completeLogin(fbUser);
    } catch (error) {
        if (error.code === 'auth/popup-closed-by-user' ||
            error.code === 'auth/cancelled-popup-request') return;

        if (error.code === 'auth/account-exists-with-different-credential') {
            showAuthMessage('Bu email boshqa usulda ro\'yxatdan o\'tgan', 'error');
            return;
        }
        showAuthMessage('Google xatoligi: ' + (error.message || error.code), 'error');
    } finally {
        setBtnLoading(btn, false);
    }
}

async function completeLogin(fbUser, updateSession = true) {
    let userData = await findUserByUid(fbUser.uid);
    if (!userData) {
        userData = {
            uid: fbUser.uid,
            name: fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : 'Foydalanuvchi'),
            email: fbUser.email || '',
            avatar: fbUser.photoURL || '',
            books: 0,
            registeredAt: new Date().toISOString()
        };
        await saveUser(userData);
    }

    currentUser = userData;

    // ✅ Admin tekshiruvi
    isAdmin = ADMIN_EMAILS.includes((userData.email || '').toLowerCase()) || userData.isAdmin === true;

    if (updateSession) updateSessionTime();

    localStorage.setItem('lastLoggedInUid', fbUser.uid);
    hideVerifyScreen();
    hideResetScreen();
    enterApp();
    initActivityTracker();
}

// ================================================
//  EMAIL VERIFICATION
// ================================================
function showVerifyScreen(email) {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('verifySection').style.display = 'flex';
    const el = document.getElementById('verifyEmailText');
    if (el) el.textContent = email;
    const input = document.getElementById('verifyCodeInput');
    if (input) input.value = '';
}

function hideVerifyScreen() {
    const vs = document.getElementById('verifySection');
    if (vs) vs.style.display = 'none';
}

async function checkEmailVerified() {
    const input = document.getElementById('verifyCodeInput');
    const code = input?.value.trim();
    const btn = document.getElementById('checkVerifyBtn');

    if (!code || code.length !== 6) { showAlert('6 xonali kodni kiriting', 'warning'); return; }
    if (!pendingUser) { showAlert('Sessiya tugagan. Qaytadan ro\'yxatdan o\'ting', 'warning'); cancelVerification(); return; }

    setBtnLoading(btn, true);
    try {
        const key = btoa(pendingUser.email);
        const snap = await db.ref(`pending_registrations/${key}`).once('value');
        const saved = snap.val();

        if (!saved) { showAlert('Kod topilmadi. Qayta ro\'yxatdan o\'ting', 'error'); return; }
        if (Date.now() > saved.expiresAt) { showAlert('Kod muddati tugagan. Yangi kod so\'rang', 'warning'); return; }
        if (saved.code !== code) { showAlert('Kod noto\'g\'ri. Qayta urinib ko\'ring', 'error'); return; }

        if (pendingUser.alreadyRegistered) {
            await db.ref(`pending_registrations/${key}`).remove();
            pendingUser = null;
            hideVerifyScreen();
            document.getElementById('authSection').style.display = 'flex';
            showAuthMessage('Email tasdiqlandi! Endi parol bilan kiring', 'success');
            return;
        }

        const cred = await auth.createUserWithEmailAndPassword(pendingUser.email, pendingUser.password);
        const fbUser = cred.user;
        await fbUser.updateProfile({ displayName: pendingUser.name });

        const newUser = {
            uid: fbUser.uid,
            name: pendingUser.name,
            email: pendingUser.email,
            avatar: '',
            books: 0,
            registeredAt: new Date().toISOString(),
            provider: 'email',
            emailVerified: true
        };
        await saveUser(newUser);

        await db.ref(`pending_registrations/${key}`).remove();
        pendingUser = null;
        await completeLogin(fbUser);
    } catch (error) {
        console.error('Verify xatosi:', error);
        if (error.code === 'auth/email-already-in-use') {
            showAlert('Bu email allaqachon ro\'yxatdan o\'tgan', 'error');
        } else {
            showAlert('Xatolik: ' + (error.message || error.code), 'error');
        }
    } finally {
        setBtnLoading(btn, false);
    }
}

async function resendVerificationEmail() {
    if (!pendingUser) { showAlert('Qayta ro\'yxatdan o\'ting', 'warning'); return; }

    const btn = document.getElementById('resendVerifyBtn');
    setBtnLoading(btn, true);
    try {
        const code = String(Math.floor(100000 + Math.random() * 900000));
        const key = btoa(pendingUser.email);

        await db.ref(`pending_registrations/${key}`).set({
            code, name: pendingUser.name, email: pendingUser.email,
            createdAt: Date.now(), expiresAt: Date.now() + (10 * 60 * 1000)
        });

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: pendingUser.email, to_name: pendingUser.name, verification_code: code
        });

        showAlert('Yangi kod yuborildi', 'success');
    } catch (e) {
        showAlert('Xatolik: ' + (e.text || e.message), 'error');
    } finally {
        setBtnLoading(btn, false);
    }
}

function cancelVerification() {
    pendingUser = null;
    hideVerifyScreen();
    document.getElementById('authSection').style.display = 'flex';
    ['regName', 'regEmail', 'regPassword', 'regPasswordConfirm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const codeInput = document.getElementById('verifyCodeInput');
    if (codeInput) codeInput.value = '';
}

// ================================================
//  PAROLNI TIKLASH
// ================================================
function openForgotModal() {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('resetSection').style.display = 'flex';
    document.getElementById('resetStep1').style.display = 'block';
    document.getElementById('resetStep2').style.display = 'none';

    const loginEmail = document.getElementById('loginEmail')?.value.trim();
    const resetEmailInput = document.getElementById('resetEmail');
    if (loginEmail && resetEmailInput) resetEmailInput.value = loginEmail;
}

async function sendResetCode() {
    const email = document.getElementById('resetEmail')?.value.trim().toLowerCase();
    const btn = document.getElementById('sendResetCodeBtn');

    if (!email || !isValidEmail(email)) { showAlert('To\'g\'ri email manzil kiriting', 'warning'); return; }

    setBtnLoading(btn, true);
    try {
        const users = await getUsers();
        const user = users.find(u => u.email && u.email.toLowerCase() === email);
        if (!user) { showAlert('Bu email ro\'yxatdan o\'tmagan', 'error'); return; }

        const code = String(Math.floor(100000 + Math.random() * 900000));
        await db.ref(`password_resets/${btoa(email)}`).set({
            code, email, createdAt: Date.now(), expiresAt: Date.now() + (10 * 60 * 1000)
        });

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: email, to_name: user.name || 'Foydalanuvchi', verification_code: code
        });

        resetEmail_global = email;
        document.getElementById('resetEmailText').textContent = email;
        document.getElementById('resetStep1').style.display = 'none';
        document.getElementById('resetStep2').style.display = 'block';
    } catch (e) {
        console.error(e);
        showAlert('Xatolik: ' + (e.text || e.message), 'error');
    } finally {
        setBtnLoading(btn, false);
    }
}

async function confirmResetPassword() {
    const code = document.getElementById('resetCodeInput')?.value.trim();
    const newPass = document.getElementById('newPassword')?.value;
    const newPassConfirm = document.getElementById('newPasswordConfirm')?.value;
    const btn = document.getElementById('confirmResetBtn');

    if (!code || code.length !== 6) { showAlert('6 xonali kodni kiriting', 'warning'); return; }
    if (!newPass || newPass.length < 6) { showAlert('Parol kamida 6 belgi', 'warning'); return; }
    if (newPass !== newPassConfirm) { showAlert('Parollar mos kelmadi', 'error'); return; }

    setBtnLoading(btn, true);
    try {
        const key = btoa(resetEmail_global);
        const snap = await db.ref(`password_resets/${key}`).once('value');
        const saved = snap.val();

        if (!saved) { showAlert('Kod topilmadi. Qaytadan boshlang', 'error'); return; }
        if (Date.now() > saved.expiresAt) { showAlert('Kod muddati tugagan', 'warning'); return; }
        if (saved.code !== code) { showAlert('Kod noto\'g\'ri', 'error'); return; }

        await auth.sendPasswordResetEmail(resetEmail_global, {
            url: window.location.origin + window.location.pathname
        });

        await db.ref(`password_resets/${key}`).remove();

        showAlert('Kod to\'g\'ri! Endi emailingizga yuborilgan havolani bosing va yangi parolni kiriting',
            'success', 'Muvaffaqiyatli');
        closeResetSection();
    } catch (e) {
        console.error(e);
        showAlert('Xatolik: ' + (e.message || e.code), 'error');
    } finally {
        setBtnLoading(btn, false);
    }
}

function hideResetScreen() {
    const rs = document.getElementById('resetSection');
    if (rs) rs.style.display = 'none';
}

function closeResetSection() {
    resetEmail_global = '';
    hideResetScreen();
    document.getElementById('authSection').style.display = 'flex';
    ['resetEmail', 'resetCodeInput', 'newPassword', 'newPasswordConfirm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

function backToResetStep1() {
    document.getElementById('resetStep1').style.display = 'block';
    document.getElementById('resetStep2').style.display = 'none';
    ['resetCodeInput', 'newPassword', 'newPasswordConfirm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

// ================================================
//  LOGOUT
// ================================================
function logout() {
    if (chatRef) { chatRef.off(); chatRef = null; }
    auth.signOut().catch(() => {});

    currentUser = null;
    isAdmin = false;
    viewingOtherUser = null;
    selectedUser = null;
    pendingUser = null;
    resetEmail_global = '';
    cachedAdminBooks = [];
    totalUnreadChats = 0;

    localStorage.removeItem('sessionTime');
    localStorage.removeItem('lastLoggedInUid');

    document.getElementById('authSection').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';

    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('open');
        sidebar.classList.add('collapsed');
    }

    updateBottomNav();
    hideVerifyScreen();
    hideResetScreen();

    ['loginEmail', 'loginPassword', 'regName', 'regEmail', 'regPassword',
     'regPasswordConfirm', 'verifyCodeInput', 'resetEmail', 'resetCodeInput',
     'newPassword', 'newPasswordConfirm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    activityTrackerInited = false;
}

// ================================================
//  SIDEBAR / BOTTOM NAV
// ================================================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    if (window.innerWidth > 768) sidebar.classList.toggle('collapsed');
    else {
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('collapsed');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    if (window.innerWidth > 768) sidebar.classList.add('collapsed');
    else { sidebar.classList.add('collapsed'); sidebar.classList.remove('open'); }
}

function updateBottomNav() {
    const bottomNav = document.getElementById('bottomNav');
    if (!bottomNav) return;

    const activePanel = document.querySelector('.panel.active');
    if (!activePanel) return;

    const map = {
        'libraryPanel': 'library', 'statsPanel': 'stats', 'usersPanel': 'users',
        'chatsPanel': 'chats', 'profilePanel': 'profile', 'userProfilePanel': 'users',
        'otherLibraryPanel': 'users', 'chatPanel': 'chats', 'booksPanel': 'books'
    };
    const activeTab = map[activePanel.id] || 'library';
    bottomNav.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.panel) {
            item.classList.toggle('active', item.dataset.panel === activeTab);
        }
    });

    updateChatBadge();
}

function updateChatBadge() {
    const chatNavItem = document.querySelector('.nav-item[data-panel="chats"]');
    if (chatNavItem) {
        let badge = chatNavItem.querySelector('.nav-badge');
        if (totalUnreadChats > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'nav-badge';
                chatNavItem.appendChild(badge);
            }
            badge.textContent = totalUnreadChats > 99 ? '99+' : totalUnreadChats;
            badge.style.display = 'flex';
        } else if (badge) {
            badge.style.display = 'none';
        }
    }

    const chatSidebarLink = document.querySelector('.sidebar-link[data-panel="chats"]');
    if (chatSidebarLink) {
        let badge = chatSidebarLink.querySelector('.sidebar-badge');
        if (totalUnreadChats > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'sidebar-badge';
                chatSidebarLink.appendChild(badge);
            }
            badge.textContent = totalUnreadChats > 99 ? '99+' : totalUnreadChats;
            badge.style.display = 'flex';
        } else if (badge) {
            badge.style.display = 'none';
        }
    }
}

async function refreshTotalUnreadChats() {
    if (!currentUser) return;
    try {
        const users = await getUsers();
        let total = 0;
        for (const user of users) {
            if (user.uid === currentUser.uid) continue;
            const chatId = getChatId(currentUser.uid, user.uid);
            const snap = await db.ref(`chats/${chatId}`).once('value');
            const messages = snap.val() || {};
            const unread = Object.values(messages).filter(m => m.from !== currentUser.uid && !m.read).length;
            total += unread;
        }
        totalUnreadChats = total;
        updateChatBadge();
    } catch (_) {}
}

function initMobileAddBook() {
    const addBtn = document.getElementById('mobileAddBookBtn');
    if (addBtn) addBtn.addEventListener('click', (e) => { e.stopPropagation(); openAddBookWizard(); });
}

// ================================================
//  PANELS
// ================================================
function showPanel(panelId) {
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
    const map = { otherLibrary: 'users', chatPanel: 'chats', books: 'books' };
    const targetPanel = map[panelId] || panelId;
    document.querySelector(`.sidebar-link[data-panel="${targetPanel}"]`)?.classList.add('active');

    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
        panel.style.display = 'none';
    });

    const panel = document.getElementById(panelId + 'Panel');
    if (panel) {
        panel.classList.add('active');
        const flexPanels = ['library', 'profile', 'stats', 'userProfile'];
        panel.style.display = flexPanels.includes(panelId) ? 'flex' : 'block';
    }

    const searchInput = document.getElementById('searchInput');
    const headerSearch = document.getElementById('headerSearch');

    if (searchInput) {
        if (panelId === 'users') {
            searchInput.placeholder = "Foydalanuvchi nomi bo'yicha qidirish...";
            searchInput.dataset.searchType = 'users';
            if (headerSearch) headerSearch.style.display = '';
        } else if (panelId === 'library' || panelId === 'otherLibrary') {
            searchInput.placeholder = "Kitob nomi yoki yozuvchi bo'yicha qidirish...";
            searchInput.dataset.searchType = 'books';
            if (headerSearch) headerSearch.style.display = '';
        } else if (panelId === 'books') {
            searchInput.placeholder = "Kitob qidirish...";
            searchInput.dataset.searchType = 'adminBooks';
            if (headerSearch) headerSearch.style.display = '';
        } else {
            if (headerSearch) headerSearch.style.display = 'none';
        }
    }

    const addBtn = document.getElementById('addBookToShelfBtn');
    if (addBtn) addBtn.style.display = panelId === 'library' ? 'inline-flex' : 'none';

    switch (panelId) {
        case 'profile': loadProfileData(); break;
        case 'stats': updateStatsDonut(); break;
        case 'users': renderGlobalUsers(); break;
        case 'chats': renderChatList(); break;
        case 'library': updateBooksCount(); break;
        case 'books': renderBooksPanel(); break;
    }

    updateBottomNav();
    if (window.innerWidth <= 768) closeSidebar();
}

// ================================================
//  ✅ YANGI: JAVON AUTO-FLOW (kitob sig'masa keyingi qatorga)
// ================================================
function doesBookFitInRow(container, bookWidth) {
    if (!container) return true;
    const containerWidth = container.clientWidth || container.offsetWidth;
    if (containerWidth <= 0) return true;

    const books = container.querySelectorAll('.book');
    let usedWidth = 0;
    books.forEach(b => {
        const w = parseFloat(b.style.width) || parseFloat(b.dataset.width) || 24;
        usedWidth += w;
    });

    if (books.length > 0) usedWidth += (books.length - 1) * 6;

    const style = getComputedStyle(container);
    const padL = parseFloat(style.paddingLeft) || 0;
    const padR = parseFloat(style.paddingRight) || 0;
    const available = containerWidth - padL - padR;

    const needed = usedWidth + bookWidth + (books.length > 0 ? 6 : 0);
    return needed <= available;
}

function createNewShelfRow(shelfEl, rowNum) {
    const divider = document.createElement('div');
    divider.className = 'shelf-divider';

    const row = document.createElement('div');
    row.className = 'shelf-row';

    const booksContainer = document.createElement('div');
    booksContainer.className = 'shelf-row-books';
    // ✅ TO'G'RI: closest bilan bookshelf-unit'dan olish
    const shelfNum = shelfEl.closest('.bookshelf-unit')?.dataset.shelf || shelfEl.dataset.shelf || '1';
    booksContainer.dataset.shelf = shelfNum;
    booksContainer.dataset.row = rowNum;

    row.appendChild(booksContainer);
    return { divider, row, booksContainer };
}
function addBookToShelfWithFlow(shelfEl, bookElement) {
    if (!shelfEl || !bookElement) return null;

    const shelfRows = shelfEl.querySelector('.shelf-rows');
    if (!shelfRows) return null;

    const bookWidth = parseFloat(bookElement.style.width) || parseFloat(bookElement.dataset.width) || 24;

    const rows = shelfEl.querySelectorAll('.shelf-row');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const container = row.querySelector('.shelf-row-books');
        if (doesBookFitInRow(container, bookWidth)) {
            container.appendChild(bookElement);
            return container;
        }
    }

    const lastRow = rows[rows.length - 1];
    if (!lastRow) return null;

    const newRowNum = rows.length + 1;
    const { divider, row, booksContainer } = createNewShelfRow(shelfEl, newRowNum);

    lastRow.parentNode.insertBefore(divider, lastRow.nextSibling);
    lastRow.parentNode.insertBefore(row, divider.nextSibling);

    booksContainer.appendChild(bookElement);
    return booksContainer;
}

function redistributeBooksInShelf(shelfEl, bookDataArray) {
    if (!shelfEl || !Array.isArray(bookDataArray)) return;

    const shelfRows = shelfEl.querySelector('.shelf-rows');
    if (!shelfRows) return;

    shelfRows.querySelectorAll('.shelf-row').forEach((row, idx) => {
    if (idx >= 3) row.remove();
});
shelfRows.querySelectorAll('.shelf-divider').forEach((div, idx) => {
    if (idx >= 2) div.remove();
});

    shelfRows.querySelectorAll('.shelf-row-books').forEach(c => c.innerHTML = '');

    bookDataArray.forEach(bookData => {
        const book = createBookElement(bookData);
        addBookToShelfWithFlow(shelfEl, book);
    });

    cleanupEmptyRows(shelfEl);
}

function cleanupEmptyRows(shelfEl) {
    const shelfRows = shelfEl.querySelector('.shelf-rows');
    if (!shelfRows) return;

    const rows = Array.from(shelfEl.querySelectorAll('.shelf-row'));
for (let i = rows.length - 1; i >= 3; i--) {
    const row = rows[i];
    const books = row.querySelectorAll('.book');
    if (books.length === 0) {
        const divider = row.previousElementSibling;
        if (divider && divider.classList.contains('shelf-divider')) {
            divider.remove();
        }
        row.remove();
    }
}
}

// ================================================
//  KITOB ELEMENT
// ================================================
function createBookElement(bookData) {
    const title = bookData.title || 'Nomsiz';
    const color = bookData.color || '#8b6914';
    const coverType = bookData.coverType || 'hard';
    const viewMode = bookData.viewMode || 'color';
    const spineImage = bookData.spineImage || '';
    const isHard = coverType === 'hard';

    let width = parseFloat(bookData.width) || BOOK_WIDTH_DEFAULT;
    if (width < 6) width = 6;
    if (width > 44) width = 44;

    let height = parseFloat(bookData.height) || BOOK_HEIGHT_DEFAULT;
    if (height < 40) height = 40;
    if (height > 80) height = 80;

    const isImageMode = (viewMode === 'image' && spineImage);
    const thickness = bookData.thickness || (isHard ? Math.floor(Math.random() * 4) + 4 : Math.floor(Math.random() * 3) + 1);

    // ✅ AVVAL shriftni hisoblash
    let fontSize;
    const titleLength = title.length;
    if (titleLength <= 3) fontSize = 11;
    else if (titleLength <= 5) fontSize = 10;
    else if (titleLength <= 8) fontSize = 9;
    else if (titleLength <= 12) fontSize = 8;
    else fontSize = 7;

    // ✅ Keyin border/soya
    let border, boxShadow, borderRadius;
    if (isImageMode) {
        border = 'none';
        boxShadow = '1px 2px 6px rgba(0,0,0,0.35)';
        borderRadius = '3px';
    } else {
        border = bookData.border || (isHard ? '2px solid rgba(0,0,0,0.15)' : '1px solid rgba(0,0,0,0.08)');
        boxShadow = bookData.boxShadow || (isHard
            ? `${thickness}px 1px 6px rgba(0,0,0,0.5), inset 1px 0 0 rgba(255,255,255,0.08)`
            : `${thickness}px 1px 4px rgba(0,0,0,0.3), inset 1px 0 0 rgba(255,255,255,0.04)`);
        borderRadius = isHard ? '3px 3px 3px 3px' : '2px 2px 2px 2px';
    }

    // ✅ ENDI `book` yaratamiz
    const book = document.createElement('div');
    book.className = 'book';
    book.style.height = height + 'px';
    book.style.width = width + 'px';
    book.style.minWidth = width + 'px';
    book.style.maxWidth = width + 'px';
    book.style.border = border;
    book.style.boxShadow = boxShadow;
    book.style.borderRadius = borderRadius;

    // ✅ Fon
    if (isImageMode) {
        book.style.background = `url(${spineImage}) center / 100% 100% no-repeat`;
        book.classList.add('book-image-mode');
    } else {
        book.style.background = color;
        book.classList.remove('book-image-mode');
    }

    // ✅ Data atributlar
    book.dataset.bookId = bookData.bookId || generateBookId();
    book.dataset.title = title;
    book.dataset.author = bookData.author || '';
    book.dataset.description = bookData.description || '';
    book.dataset.color = color;
    book.dataset.cover = bookData.cover || '';
    book.dataset.status = bookData.status || 'unread';
    book.dataset.rating = bookData.rating || '0';
    book.dataset.cell = bookData.cell || '1-1';
    book.dataset.width = width;
    book.dataset.height = height;
    book.dataset.coverType = coverType;
    book.dataset.thickness = thickness;
    book.dataset.year = bookData.year || '';
    book.dataset.genre = bookData.genre || '';
    book.dataset.pages = bookData.pages || '';
    book.dataset.viewMode = viewMode;
    book.dataset.spineImage = spineImage;

    if (bookData.fileType) {
        book.dataset.fileType = bookData.fileType;
        book.dataset.fileName = bookData.fileName || '';
        book.dataset.fileMime = bookData.fileMime || '';
    }
    if (bookData.externalUrl) {
        book.dataset.externalUrl = bookData.externalUrl;
        book.dataset.externalSource = bookData.externalSource || 'other';
    }
    if (bookData.addedFrom) {
        book.dataset.addedFrom = bookData.addedFrom;
        book.dataset.originalBookId = bookData.originalBookId || '';
    }
    if (bookData.isFromAdmin) {
        book.dataset.isFromAdmin = 'true';
    }

    // ✅ Matn (faqat rasm rejimida emas)
    if (isImageMode) {
        book.innerHTML = '';
    } else {
        // Faqat CSS truncatsiya — to'liq nom beriladi, kerak bo'lsa CSS "…" qo'yadi
        book.innerHTML = `<div class="book-title" style="color:${getTextColor(color)}; font-size: ${fontSize}px;" title="${escapeHtml(title)}">${escapeHtml(title)}</div>`;
    }

    // ✅ Progress tekshiruvi
    (async () => {
        try {
            const progress = await getBookProgress(book.dataset.bookId);
            if (progress && (progress.pdfPage > 1 || progress.audioTime > 10)) {
                book.classList.add('has-progress');
            }
        } catch (_) {}
    })();

    book.onclick = () => {
        if (isMoveMode) return;
        showBookModal(book);
    };

    return book;
}
// ================================================
//  ILOVAGA KIRISH
// ================================================
function enterApp() {
    if (document.getElementById('mainApp').style.display === 'flex') return;

    document.getElementById('authSection').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';

    // ✅ Admin tugmasini ko'rsatish/yashirish
    const adminBtn = document.getElementById('adminUploadBtn');
    if (adminBtn) adminBtn.style.display = isAdmin ? 'inline-flex' : 'none';

        updateSidebarInfo();
    showPanel('library');
    loadAllBooks();
    initNotifications();
    initUsersSearch();
    refreshTotalUnreadChats();

    if (window.innerWidth > 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('collapsed');
    }
    updateBottomNav();
    initMobileAddBook();
}

async function loadAllBooks() {
    if (!currentUser) return;

    // Avvalgi kitoblarni o'chirish
    document.querySelectorAll('#libraryPanel .book').forEach(book => book.remove());

    // Firebase'dan olish
    let allBooks = [];
    try {
        const snapshot = await db.ref(`mainShelf/${currentUser.uid}`).once('value');
        const saved = snapshot.val();
        if (saved?.books && Array.isArray(saved.books)) allBooks = saved.books;
    } catch (_) {}

    // Eski formatdan ko'chirish
    if (!allBooks.length) {
        try {
            const snapshot = await db.ref(`shelves/${currentUser.uid}`).once('value');
            const saved = snapshot.val();
            if (saved?.shelves) {
                saved.shelves.forEach(shelf => {
                    if (shelf.books) allBooks = allBooks.concat(shelf.books);
                });
                if (allBooks.length) await db.ref(`mainShelf/${currentUser.uid}`).set({ books: allBooks });
            }
        } catch (_) {}
    }

    // ✅ Layout tayyor bo'lishini kutish (2 frame)
    await new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });

    // Javonlarni tozalash + 4 ta yangi qator yaratish
    const shelves = document.querySelectorAll('#libraryPanel .wooden-bookshelf');
    shelves.forEach(shelfEl => {
        const shelfRows = shelfEl.querySelector('.shelf-rows');
        if (!shelfRows) return;
        
        // ✅ TO'G'RI: bookshelf-unit'dan shelf raqamini olish
        const shelfNum = shelfEl.closest('.bookshelf-unit')?.dataset.shelf || '1';
        
        shelfRows.innerHTML = '';
for (let r = 1; r <= 3; r++) {
    const row = document.createElement('div');
    row.className = 'shelf-row';
    const booksContainer = document.createElement('div');
    booksContainer.className = 'shelf-row-books';
    booksContainer.dataset.shelf = shelfNum;
    booksContainer.dataset.row = r;
    row.appendChild(booksContainer);
    shelfRows.appendChild(row);
    if (r < 3) {
        const divider = document.createElement('div');
        divider.className = 'shelf-divider';
        shelfRows.appendChild(divider);
    }
}
    });

    if (!allBooks.length) {
        updateBooksCount();
        updateProfileStats();
        return;
    }

    // Kitoblarni javon raqami bo'yicha guruhlash
    const grouped = { 1: [], 2: [], 3: [] };
    allBooks.forEach(b => {
        const shelfNum = b.cell ? parseInt(b.cell.split('-')[0]) : 1;
        const target = (shelfNum >= 1 && shelfNum <= 3) ? shelfNum : 1;
        grouped[target].push(b);
    });

    // Har bir javonga kitoblarni taqsimlash
    shelves.forEach(shelfEl => {
        const shelfNum = parseInt(shelfEl.closest('.bookshelf-unit')?.dataset.shelf || 1);
        const booksForShelf = grouped[shelfNum] || [];
        
        booksForShelf.forEach(bookData => {
            const book = createBookElement({
                ...bookData,
                status: bookData.status || 'unread',
                rating: bookData.rating || '0'
            });
            addBookToShelfWithFlow(shelfEl, book);
        });
        
        cleanupEmptyRows(shelfEl);
    });

    updateBooksCount();
    updateProfileStats();
}

function updateSidebarInfo() {
    const avatar = document.getElementById('sidebarAvatar');
    if (avatar) {
        avatar.textContent = currentUser.name.charAt(0).toUpperCase();
        avatar.style.backgroundImage = '';
        if (currentUser.avatar) {
            avatar.style.backgroundImage = `url(${currentUser.avatar})`;
            avatar.textContent = '';
        }
    }
    const nameEl = document.getElementById('sidebarName');
    if (nameEl) nameEl.textContent = currentUser.name;
}

// ================================================
//  KITOBLAR
// ================================================
function getAllBookRows() {
    return document.querySelectorAll('#libraryPanel .shelf-row-books');
}

function updateBooksCount() {
    const el = document.getElementById('booksCount');
    if (el) el.textContent = document.querySelectorAll('#libraryPanel .book').length;
    updateProfileStats();
    updateStatsDonut();
}

function updateProfileStats() {
    const books = document.querySelectorAll('#libraryPanel .book');
    const total = books.length;
    const read = document.querySelectorAll('#libraryPanel .book[data-status="read"]').length;

    const pb = document.getElementById('profileBooks');
    const pr = document.getElementById('profileRead');
    if (pb) pb.textContent = total;
    if (pr) pr.textContent = read;
}

function saveMainShelf() {
    if (!currentUser) return;
    const books = [];
    document.querySelectorAll('#libraryPanel .book').forEach(book => {
        if (!book.dataset.bookId) book.dataset.bookId = generateBookId();
        const bookData = {
            bookId: book.dataset.bookId,
            title: book.dataset.title,
            author: book.dataset.author,
            description: book.dataset.description,
            color: book.dataset.color,
            cover: book.dataset.cover || '',
            height: parseInt(book.dataset.height) || BOOK_HEIGHT_DEFAULT,
            width: parseInt(book.dataset.width) || BOOK_WIDTH_DEFAULT,
            status: book.dataset.status,
            rating: book.dataset.rating,
            cell: book.dataset.cell,
            coverType: book.dataset.coverType || 'hard',
            year: book.dataset.year || '',
            genre: book.dataset.genre || '',
            pages: book.dataset.pages || '',
            viewMode: book.dataset.viewMode || 'color',
            spineImage: book.dataset.spineImage || ''
        };
        const fileType = book.dataset.fileType || '';
        if (fileType) {
            bookData.fileType = fileType;
            bookData.fileName = book.dataset.fileName || '';
            bookData.fileMime = book.dataset.fileMime || '';
        }
        const externalUrl = book.dataset.externalUrl || '';
        if (externalUrl) {
            bookData.externalUrl = externalUrl;
            bookData.externalSource = book.dataset.externalSource || 'other';
        }
        if (book.dataset.addedFrom) {
            bookData.addedFrom = book.dataset.addedFrom;
            bookData.originalBookId = book.dataset.originalBookId || '';
            bookData.isFromAdmin = book.dataset.isFromAdmin === 'true';
        }
        books.push(bookData);
    });
    db.ref(`mainShelf/${currentUser.uid}`).set({ books });
}

async function saveBookFile(bookId, fileData, fileMime, fileName, isAdminBook = false) {
    if (!currentUser) return;
    try {
        const path = isAdminBook ? `adminBookFiles/${bookId}` : `bookFiles/${currentUser.uid}/${bookId}`;
        await db.ref(path).set({
            data: fileData,
            mime: fileMime,
            name: fileName,
            createdAt: Date.now()
        });
    } catch (err) {
        console.error('Fayl saqlashda xatolik:', err);
        throw err;
    }
}

async function getBookFile(uid, bookId, isAdminBook = false) {
    if (isAdminBook) {
        const snap = await db.ref(`adminBookFiles/${bookId}`).once('value');
        return snap.val() || null;
    }
    const snap = await db.ref(`bookFiles/${uid}/${bookId}`).once('value');
    return snap.val() || null;
}
// ================================================
//  ✅ ADMIN YUKLASH MODAL
// ================================================
let adminUploadData = {
    cover: '',
    bookType: 'simple',
    pdfData: '',
    pdfFileName: '',
    pdfMime: '',
    audioData: '',
    audioFileName: '',
    audioMime: '',
    externalUrl: '',
    linkSource: 'mutolaa'
};

function openAdminUploadModal() {
    if (!isAdmin) {
        showAlert('Faqat sayt egasi kitob yuklay oladi', 'error');
        return;
    }

    const modal = document.getElementById('adminUploadModal');
    if (!modal) return;

    // Formani tozalash
    adminUploadData = {
        cover: '',
        bookType: 'simple',
        pdfData: '',
        pdfFileName: '',
        pdfMime: '',
        audioData: '',
        audioFileName: '',
        audioMime: '',
        externalUrl: '',
        linkSource: 'mutolaa'
    };

    document.getElementById('adminBookTitle').value = '';
    document.getElementById('adminBookAuthor').value = '';
    document.getElementById('adminBookDesc').value = '';
    document.getElementById('adminBookCoverPreview').innerHTML = '';
    document.getElementById('adminBookCover').value = '';
    document.getElementById('adminPdfFile').value = '';
    document.getElementById('adminAudioFile').value = '';
    document.getElementById('adminLinkUrl').value = '';
    document.getElementById('adminPdfPreview').textContent = '';
    document.getElementById('adminAudioPreview').textContent = '';

    // Tablarni reset qilish
    document.querySelectorAll('#adminBookTypeTabs .book-type-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.type === 'simple');
    });
    document.querySelectorAll('#adminLinkSourceTabs .link-source-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.source === 'mutolaa');
    });

    // Bo'limlar
    document.getElementById('adminPdfSection').style.display = 'none';
    document.getElementById('adminAudioSection').style.display = 'none';
    document.getElementById('adminLinkSection').style.display = 'none';

    modal.classList.add('active');
}

function closeAdminUploadModal() {
    const modal = document.getElementById('adminUploadModal');
    if (modal) modal.classList.remove('active');
}

function initAdminUploadModal() {
    // Close
    document.getElementById('adminUploadCloseBtn')?.addEventListener('click', closeAdminUploadModal);
    document.getElementById('adminUploadCancelBtn')?.addEventListener('click', closeAdminUploadModal);

    const modal = document.getElementById('adminUploadModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAdminUploadModal();
        });
    }

    // Muqova rasm
    const coverBtn = document.getElementById('adminBookCoverBtn');
    const coverInput = document.getElementById('adminBookCover');
    if (coverBtn && coverInput) {
        coverBtn.addEventListener('click', () => coverInput.click());
        coverInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            openCropModal(file, 0.6667, 'Muqova rasmini qirqish', async (croppedDataUrl) => {
                adminUploadData.cover = croppedDataUrl;
                const preview = document.getElementById('adminBookCoverPreview');
                preview.innerHTML = `<img src="${croppedDataUrl}" alt="Muqova">`;
            });
        });
    }

    // Format tablar
    document.querySelectorAll('#adminBookTypeTabs .book-type-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('#adminBookTypeTabs .book-type-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            adminUploadData.bookType = tab.dataset.type;

            document.getElementById('adminPdfSection').style.display = 'none';
            document.getElementById('adminAudioSection').style.display = 'none';
            document.getElementById('adminLinkSection').style.display = 'none';

            if (adminUploadData.bookType === 'pdf') {
                document.getElementById('adminPdfSection').style.display = 'block';
            } else if (adminUploadData.bookType === 'audio') {
                document.getElementById('adminAudioSection').style.display = 'block';
            } else if (adminUploadData.bookType === 'link') {
                document.getElementById('adminLinkSection').style.display = 'block';
            }
        });
    });

    // PDF fayl
    const pdfInput = document.getElementById('adminPdfFile');
    if (pdfInput) {
        pdfInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > MAX_FILE_SIZE_BYTES) {
                showAlert(`Fayl juda katta. Maks: ${MAX_FILE_SIZE_MB} MB`, 'error');
                e.target.value = '';
                return;
            }
            const preview = document.getElementById('adminPdfPreview');
            preview.textContent = 'Yuklanmoqda...';
            try {
                adminUploadData.pdfData = await fileToDataUrl(file);
                adminUploadData.pdfFileName = file.name;
                adminUploadData.pdfMime = file.type || 'application/pdf';
                preview.textContent = `✓ ${file.name} (${formatFileSize(file.size)})`;
            } catch (_) {
                showAlert('Faylni o\'qishda xatolik', 'error');
                preview.textContent = '';
            }
        });
    }

    // Audio fayl
    const audioInput = document.getElementById('adminAudioFile');
    if (audioInput) {
        audioInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > MAX_FILE_SIZE_BYTES) {
                showAlert(`Fayl juda katta. Maks: ${MAX_FILE_SIZE_MB} MB`, 'error');
                e.target.value = '';
                return;
            }
            const preview = document.getElementById('adminAudioPreview');
            preview.textContent = 'Yuklanmoqda...';
            try {
                adminUploadData.audioData = await fileToDataUrl(file);
                adminUploadData.audioFileName = file.name;
                adminUploadData.audioMime = file.type || 'audio/mpeg';
                preview.textContent = `✓ ${file.name} (${formatFileSize(file.size)})`;
            } catch (_) {
                showAlert('Faylni o\'qishda xatolik', 'error');
                preview.textContent = '';
            }
        });
    }

    // Havola manba
    document.querySelectorAll('#adminLinkSourceTabs .link-source-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('#adminLinkSourceTabs .link-source-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            adminUploadData.linkSource = tab.dataset.source;
        });
    });

    // Saqlash
    document.getElementById('adminUploadSaveBtn')?.addEventListener('click', saveAdminBook);
}

async function saveAdminBook() {
    if (!isAdmin) {
        showAlert('Ruxsat yo\'q', 'error');
        return;
    }

    const title = document.getElementById('adminBookTitle').value.trim();
    const author = document.getElementById('adminBookAuthor').value.trim() || 'Noma\'lum';
    const description = document.getElementById('adminBookDesc').value.trim();

    // Validatsiya
    if (!title) {
        showAlert('Kitob nomini kiriting', 'warning');
        return;
    }

    const bookType = adminUploadData.bookType;

    if (bookType === 'pdf' && !adminUploadData.pdfData) {
        showAlert('PDF faylni yuklang', 'warning');
        return;
    }
    if (bookType === 'audio' && !adminUploadData.audioData) {
        showAlert('Audio faylni yuklang', 'warning');
        return;
    }
    if (bookType === 'link') {
        const url = document.getElementById('adminLinkUrl').value.trim();
        if (!url) {
            showAlert('Havolani kiriting', 'warning');
            return;
        }
        if (!/^https?:\/\//i.test(url)) {
            showAlert('Havola http:// yoki https:// bilan boshlanishi kerak', 'warning');
            return;
        }
        adminUploadData.externalUrl = url;
    }

    const btn = document.getElementById('adminUploadSaveBtn');
    setBtnLoading(btn, true);

    try {
        const bookId = 'ab_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        const color = BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)];

        const bookData = {
            bookId,
            title: title.slice(0, 80),
            author,
            description,
            color,
            cover: adminUploadData.cover || '',
            height: BOOK_HEIGHT_DEFAULT,
            width: BOOK_WIDTH_DEFAULT,
            status: 'unread',
            rating: '0',
            coverType: 'hard',
            year: '',
            genre: '',
            pages: '',
            viewMode: 'color',
            spineImage: '',
            addedBy: currentUser.uid,
            addedAt: Date.now()
        };

        if (bookType === 'pdf') {
            bookData.fileType = 'pdf';
            bookData.fileName = adminUploadData.pdfFileName;
            bookData.fileMime = adminUploadData.pdfMime;
            await saveBookFile(bookId, adminUploadData.pdfData, adminUploadData.pdfMime, adminUploadData.pdfFileName, true);
        } else if (bookType === 'audio') {
            bookData.fileType = 'audio';
            bookData.fileName = adminUploadData.audioFileName;
            bookData.fileMime = adminUploadData.audioMime;
            await saveBookFile(bookId, adminUploadData.audioData, adminUploadData.audioMime, adminUploadData.audioFileName, true);
        } else if (bookType === 'link') {
            bookData.externalUrl = adminUploadData.externalUrl;
            bookData.externalSource = adminUploadData.linkSource;
        }

        await db.ref(`adminLibrary/books/${bookId}`).set(bookData);

        // Keshni yangilash
        cachedAdminBooks = [];

        closeAdminUploadModal();
        showAlert(`"${title}" muvaffaqiyatli yuklandi`, 'success');

        // Ro'yxatni yangilash
        if (document.getElementById('booksPanel')?.classList.contains('active')) {
            await renderBooksPanel();
        }
    } catch (err) {
        console.error('Saqlash xatosi:', err);
        showAlert('Saqlashda xatolik: ' + err.message, 'error');
    } finally {
        setBtnLoading(btn, false);
    }
}
// ================================================
//  ✅ KITOBLAR PANELI (Admin)
// ================================================
function initBooksPanel() {
    document.querySelectorAll('.books-filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.books-filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            booksPanelFilter = tab.dataset.filter;
            renderBooksPanel();
        });
    });

    const uploadBtn = document.getElementById('adminUploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', openAdminUploadModal);
    }

    initAdminUploadModal();
    initAdminEditModal();
}
async function renderBooksPanel() {
    const grid = document.getElementById('booksGrid');
    if (!grid) return;

    if (!cachedAdminBooks.length) {
        grid.innerHTML = `
            <div class="books-grid-empty">
                <div class="share-spinner" style="margin:0 auto 12px;"></div>
                Yuklanmoqda...
            </div>`;

        try {
            const snap = await db.ref('adminLibrary/books').once('value');
            const data = snap.val() || {};
            cachedAdminBooks = Object.values(data);
        } catch (_) {
            cachedAdminBooks = [];
        }
    }

    let filtered = cachedAdminBooks;
    if (booksPanelFilter !== 'all') {
        filtered = cachedAdminBooks.filter(b => {
            const type = b.fileType || (b.externalUrl ? 'link' : 'simple');
            return type === booksPanelFilter;
        });
    }

    if (!filtered.length) {
        grid.innerHTML = `
            <div class="books-grid-empty">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                <div>${booksPanelFilter === 'all' ? 'Hali kitob yuklanmagan' : 'Bu turdagi kitoblar yo\'q'}</div>
            </div>`;
        return;
    }

    grid.innerHTML = filtered.map(book => {
        const type = book.fileType || (book.externalUrl ? 'link' : 'simple');
        const badgeClass = type === 'pdf' ? 'pdf' : type === 'audio' ? 'audio' : type === 'link' ? 'link' : 'simple';
        const badgeText = type === 'pdf' ? 'PDF' : type === 'audio' ? 'Audio' : type === 'link' ? 'Havola' : 'Kitob';
        const color = book.color || '#3d6b3d';
        const coverStyle = book.cover
            ? `background-image:url(${book.cover});`
            : `background:${color};`;

        // ✅ Admin amallar (faqat admin uchun)
        const adminActions = isAdmin ? `
            <button class="book-grid-edit" title="Tahrirlash" data-edit-id="${book.bookId}">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
            </button>
            <button class="book-grid-delete" title="O'chirish" data-delete-id="${book.bookId}">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </button>` : '';

        return `
            <div class="book-grid-item" data-book-id="${book.bookId}">
                <div class="book-grid-cover" style="${coverStyle}">
                    ${!book.cover ? escapeHtml((book.title || '?').charAt(0).toUpperCase()) : ''}
                </div>
                <div class="book-grid-info">
                    <div class="book-grid-title">${escapeHtml(book.title || 'Nomsiz')}</div>
                    <div class="book-grid-author">${escapeHtml(book.author || 'Noma\'lum')}</div>
                    <div class="book-grid-meta">
                        <span class="book-grid-badge ${badgeClass}">${badgeText}</span>
                        ${book.pages ? `<span class="book-grid-pages">${book.pages} bet</span>` : ''}
                    </div>
                </div>
                <div class="book-grid-actions">
                    <button class="book-grid-add" title="Javonimga olish" data-add-id="${book.bookId}">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                    ${adminActions}
                </div>
            </div>`;
    }).join('');

    // Click — modal
    grid.querySelectorAll('.book-grid-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.book-grid-add')) return;
            if (e.target.closest('.book-grid-edit')) return;
            if (e.target.closest('.book-grid-delete')) return;
            const bookId = item.dataset.bookId;
            const book = cachedAdminBooks.find(b => b.bookId === bookId);
            if (book) showAdminBookModal(book);
        });
    });

    // + Javonimga olish
    grid.querySelectorAll('.book-grid-add').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const bookId = btn.dataset.addId;
            const book = cachedAdminBooks.find(b => b.bookId === bookId);
            if (!book) return;
            await addAdminBookToMyShelf(book);
        });
    });

    // ✎ Tahrirlash (faqat admin)
    grid.querySelectorAll('.book-grid-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookId = btn.dataset.editId;
            const book = cachedAdminBooks.find(b => b.bookId === bookId);
            if (!book) return;
            openAdminEditModal(book);
        });
    });

    // 🗑 O'chirish (faqat admin)
    grid.querySelectorAll('.book-grid-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const bookId = btn.dataset.deleteId;
            const book = cachedAdminBooks.find(b => b.bookId === bookId);
            if (!book) return;
            await deleteAdminBook(book);
        });
    });
}
// ================================================
//  ✅ ADMIN KITOBINI O'CHIRISH
// ================================================
async function deleteAdminBook(book) {
    if (!isAdmin) {
        showAlert('Faqat sayt egasi o\'chira oladi', 'error');
        return;
    }

    showConfirm(
        `"${book.title}" kitobini o'chirishni tasdiqlaysizmi?\n\nEslatma: Foydalanuvchilar o'z javoniga olgan nusxalari o'chmaydi.`,
        async () => {
            try {
                // 1. Kitobni adminLibrary'dan o'chirish
                await db.ref(`adminLibrary/books/${book.bookId}`).remove();

                // 2. Faylni o'chirish (agar mavjud bo'lsa)
                if (book.fileType) {
                    try {
                        await db.ref(`adminBookFiles/${book.bookId}`).remove();
                    } catch (_) {}
                }

                // 3. Keshni yangilash
                cachedAdminBooks = cachedAdminBooks.filter(b => b.bookId !== book.bookId);

                // 4. UI'ni qayta chizish
                await renderBooksPanel();

                showAlert(`"${book.title}" o'chirildi`, 'success');
            } catch (err) {
                console.error('O\'chirish xatosi:', err);
                showAlert('O\'chirishda xatolik: ' + err.message, 'error');
            }
        },
        {
            title: 'Kitobni o\'chirish',
            confirmText: 'Ha, o\'chirish',
            cancelText: 'Bekor qilish'
        }
    );
}

async function uploadAdminBooks(files) {
    if (!isAdmin) {
        showAlert('Faqat sayt egasi kitob yuklay oladi', 'error');
        return;
    }

    const total = files.length;
    let success = 0;
    let failed = 0;

    showMoveNotification(`${total} ta fayl yuklanmoqda...`);

    for (const file of files) {
        try {
            await uploadSingleAdminBook(file);
            success++;
        } catch (err) {
            console.error('Yuklashda xato:', err);
            failed++;
        }
    }

    cachedAdminBooks = [];
    await renderBooksPanel();

    if (success > 0) {
        showAlert(`${success} ta kitob yuklandi${failed ? ', ' + failed + ' ta xato' : ''}`, 'success');
    } else {
        showAlert('Yuklashda xatolik yuz berdi', 'error');
    }
}

async function uploadSingleAdminBook(file) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
        throw new Error(`${file.name} juda katta (maks ${MAX_FILE_SIZE_MB}MB)`);
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isAudio = file.type.startsWith('audio/') || /\.(mp3|m4a|wav|ogg|aac)$/i.test(file.name);

    if (!isPdf && !isAudio) {
        throw new Error(`${file.name} qo'llab-quvvatlanmaydi`);
    }

    const bookId = 'ab_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const title = file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ').trim() || 'Nomsiz';
    const color = BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)];

    const bookData = {
        bookId,
        title: title.slice(0, 60),
        author: 'Noma\'lum',
        description: '',
        color,
        cover: '',
        height: BOOK_HEIGHT_DEFAULT,
        width: BOOK_WIDTH_DEFAULT,
        status: 'unread',
        rating: '0',
        coverType: 'hard',
        year: '',
        genre: '',
        pages: '',
        viewMode: 'color',
        spineImage: '',
        fileType: isPdf ? 'pdf' : 'audio',
        fileName: file.name,
        fileMime: file.type || (isPdf ? 'application/pdf' : 'audio/mpeg'),
        addedBy: currentUser.uid,
        addedAt: Date.now()
    };

    const dataUrl = await fileToDataUrl(file);
    await saveBookFile(bookId, dataUrl, bookData.fileMime, file.name, true);

    await db.ref(`adminLibrary/books/${bookId}`).set(bookData);
}
// ================================================
//  ✅ ADMIN KITOBINI TAHRIRLASH
// ================================================
let adminEditData = {
    bookId: null,
    cover: '',        // yangi muqova (dataURL) yoki ''
    coverChanged: false,
    coverRemoved: false
};

function openAdminEditModal(book) {
    if (!isAdmin) {
        showAlert('Faqat sayt egasi tahrirlay oladi', 'error');
        return;
    }

    const modal = document.getElementById('adminEditBookModal');
    if (!modal) return;

    adminEditData = {
        bookId: book.bookId,
        cover: book.cover || '',
        coverChanged: false,
        coverRemoved: false
    };

    document.getElementById('adminEditTitle').value = book.title || '';
    document.getElementById('adminEditAuthor').value = book.author || '';
    document.getElementById('adminEditDesc').value = book.description || '';

    const preview = document.getElementById('adminEditCoverPreview');
    if (book.cover) {
        preview.innerHTML = `<img src="${book.cover}" alt="Muqova">`;
    } else {
        preview.innerHTML = '<span style="color:var(--text-muted);font-size:0.72rem;">Rasm yo\'q</span>';
    }

    const removeBtn = document.getElementById('adminEditCoverRemove');
    removeBtn.style.display = book.cover ? 'inline-flex' : 'none';

    document.getElementById('adminEditCover').value = '';

    modal.classList.add('active');
}

function closeAdminEditModal() {
    const modal = document.getElementById('adminEditBookModal');
    if (modal) modal.classList.remove('active');
    adminEditData = { bookId: null, cover: '', coverChanged: false, coverRemoved: false };
}

function initAdminEditModal() {
    document.getElementById('adminEditCloseBtn')?.addEventListener('click', closeAdminEditModal);
    document.getElementById('adminEditCancelBtn')?.addEventListener('click', closeAdminEditModal);

    const modal = document.getElementById('adminEditBookModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAdminEditModal();
        });
    }

    // Muqova almashtirish
    const coverBtn = document.getElementById('adminEditCoverBtn');
    const coverInput = document.getElementById('adminEditCover');
    if (coverBtn && coverInput) {
        coverBtn.addEventListener('click', () => coverInput.click());
        coverInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            openCropModal(file, 0.6667, 'Yangi muqovani qirqish', (croppedDataUrl) => {
                adminEditData.cover = croppedDataUrl;
                adminEditData.coverChanged = true;
                adminEditData.coverRemoved = false;

                const preview = document.getElementById('adminEditCoverPreview');
                preview.innerHTML = `<img src="${croppedDataUrl}" alt="Muqova">`;

                const removeBtn = document.getElementById('adminEditCoverRemove');
                removeBtn.style.display = 'inline-flex';
            });
        });
    }

    // Muqovani olib tashlash
    document.getElementById('adminEditCoverRemove')?.addEventListener('click', () => {
        adminEditData.cover = '';
        adminEditData.coverChanged = false;
        adminEditData.coverRemoved = true;

        const preview = document.getElementById('adminEditCoverPreview');
        preview.innerHTML = '<span style="color:var(--text-muted);font-size:0.72rem;">Rasm yo\'q</span>';

        document.getElementById('adminEditCoverRemove').style.display = 'none';
        document.getElementById('adminEditCover').value = '';
    });

    // Saqlash
    document.getElementById('adminEditSaveBtn')?.addEventListener('click', saveAdminBookEdit);
}

async function saveAdminBookEdit() {
    if (!isAdmin || !adminEditData.bookId) return;

    const title = document.getElementById('adminEditTitle').value.trim();
    const author = document.getElementById('adminEditAuthor').value.trim() || 'Noma\'lum';
    const description = document.getElementById('adminEditDesc').value.trim();

    if (!title) {
        showAlert('Kitob nomini kiriting', 'warning');
        return;
    }

    const btn = document.getElementById('adminEditSaveBtn');
    setBtnLoading(btn, true);

    try {
        const updates = {
            title: title.slice(0, 80),
            author,
            description
        };

        if (adminEditData.coverRemoved) {
            updates.cover = '';
        } else if (adminEditData.coverChanged && adminEditData.cover) {
            updates.cover = adminEditData.cover;
        }

        await db.ref(`adminLibrary/books/${adminEditData.bookId}`).update(updates);

        // Keshni yangilash
        const idx = cachedAdminBooks.findIndex(b => b.bookId === adminEditData.bookId);
        if (idx !== -1) {
            cachedAdminBooks[idx] = { ...cachedAdminBooks[idx], ...updates };
        }

        closeAdminEditModal();
        await renderBooksPanel();

        showAlert(`"${title}" yangilandi`, 'success');
    } catch (err) {
        console.error('Tahrirlash xatosi:', err);
        showAlert('Saqlashda xatolik: ' + err.message, 'error');
    } finally {
        setBtnLoading(btn, false);
    }
}
function showAdminBookModal(book) {
    const modal = document.getElementById('bookModal');
    const body = modal?.querySelector('.modal-body');
    if (!modal || !body) return;

    modal.classList.remove('wizard-modal');
    const fileType = book.fileType || '';
    const externalUrl = book.externalUrl || '';
    const color = book.color || '#8b6914';

    body.innerHTML = `
        <h3>${escapeHtml(book.title || '')}</h3>
        ${book.cover ? `<div style="text-align:center;margin-bottom:12px;"><img src="${book.cover}" style="max-width:120px;max-height:160px;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,0.15);"></div>` : ''}
        <div class="book-info">
            <p>${ICONS.author} Yozuvchi: ${escapeHtml(book.author || '')}</p>
            ${book.description ? `<p>${ICONS.description} ${escapeHtml(book.description)}</p>` : ''}
            ${book.year ? `<p>${ICONS.calendar} Chiqarilgan: ${escapeHtml(book.year)}</p>` : ''}
            ${book.genre ? `<p>${ICONS.tag} Janr: ${escapeHtml(book.genre)}</p>` : ''}
            ${book.pages ? `<p>${ICONS.pages} Betlar: ${escapeHtml(book.pages)}</p>` : ''}
            ${fileType === 'pdf' ? `<p>${ICONS.pdf} Format: PDF</p>` : ''}
            ${fileType === 'audio' ? `<p>${ICONS.audio} Format: Audio</p>` : ''}
        </div>

        <div class="modal-actions" style="margin-top:14px;">
            ${fileType === 'pdf' ? `<button class="modal-btn edit" id="adminBookReadBtn" style="background:linear-gradient(135deg,#dc2626,#991b1b);">${ICONS.pdf} O'qish</button>` : ''}
            ${fileType === 'audio' ? `<button class="modal-btn edit" id="adminBookListenBtn" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9);">${ICONS.audio} Tinglash</button>` : ''}
            ${externalUrl ? `<button class="modal-btn edit" id="adminBookLinkBtn" style="background:linear-gradient(135deg,#0ea5e9,#0369a1);">${ICONS.link} Ochish</button>` : ''}
        </div>

                <div class="modal-actions" style="margin-top:8px;">
            <button class="modal-btn edit" id="adminBookAddBtn" style="background:linear-gradient(135deg,#22c55e,#16a34a);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Javonimga olish
            </button>
            ${isAdmin ? `
                <button class="modal-btn delete" id="adminBookDeleteBtn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                    </svg>
                    O'chirish
                </button>
            ` : ''}
            <button class="modal-btn" id="adminBookCloseBtn">Yopish</button>
        </div>`;

    const readBtn = document.getElementById('adminBookReadBtn');
    if (readBtn) {
        readBtn.onclick = async () => {
            modal.classList.remove('active');
            await addAdminBookToMyShelf(book, true);
        };
    }
        const deleteBtn = document.getElementById('adminBookDeleteBtn');
    if (deleteBtn) {
        deleteBtn.onclick = async () => {
            modal.classList.remove('active');
            await deleteAdminBook(book);
        };
    }

    const listenBtn = document.getElementById('adminBookListenBtn');
    if (listenBtn) {
        listenBtn.onclick = async () => {
            modal.classList.remove('active');
            await addAdminBookToMyShelf(book, true);
        };
    }

    const linkBtn = document.getElementById('adminBookLinkBtn');
    if (linkBtn) {
        linkBtn.onclick = () => window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }

    modal.classList.add('active');
}

// ✅ Admin kitobini o'z javoniga olish
async function addAdminBookToMyShelf(adminBook, autoOpen = false) {
    if (!currentUser) return;

    // Allaqachon olinganmi?
    const existing = document.querySelector(`#libraryPanel .book[data-original-book-id="${adminBook.bookId}"]`);
    if (existing) {
        if (autoOpen) {
            const fileType = adminBook.fileType;
            if (fileType === 'pdf') { openPdfReader(existing); return; }
            if (fileType === 'audio') { openAudioPlayer(existing); return; }
        }
        showAlert(`"${adminBook.title}" allaqachon javoningizda`, 'info');
        return;
    }

    try {
        const newBookId = generateBookId();

        const newBook = {
            bookId: newBookId,
            title: adminBook.title,
            author: adminBook.author,
            description: adminBook.description || '',
            color: adminBook.color,
            cover: adminBook.cover || '',
            height: adminBook.height || BOOK_HEIGHT_DEFAULT,
            width: adminBook.width || BOOK_WIDTH_DEFAULT,
            status: 'unread',
            rating: '0',
            coverType: adminBook.coverType || 'hard',
            year: adminBook.year || '',
            genre: adminBook.genre || '',
            pages: adminBook.pages || '',
            viewMode: adminBook.viewMode || 'color',
            spineImage: adminBook.spineImage || '',
            addedFrom: 'admin',
            originalBookId: adminBook.bookId,
            isFromAdmin: true
        };

        if (adminBook.fileType) {
            newBook.fileType = adminBook.fileType;
            newBook.fileName = adminBook.fileName || '';
            newBook.fileMime = adminBook.fileMime || '';
        }
        if (adminBook.externalUrl) {
            newBook.externalUrl = adminBook.externalUrl;
            newBook.externalSource = adminBook.externalSource || 'other';
        }

        // Admin faylini nusxalash
        if (adminBook.fileType) {
            const originalFile = await getBookFile(null, adminBook.bookId, true);
            if (originalFile) {
                await db.ref(`bookFiles/${currentUser.uid}/${newBookId}`).set({
                    data: originalFile.data,
                    mime: originalFile.mime,
                    name: originalFile.name,
                    createdAt: Date.now()
                });
            }
        }

        addNewBookData(newBook);
        showAlert(`"${newBook.title}" javoningizga qo'shildi!`, 'success');

        // Agar autoOpen bo'lsa va fayl turi bo'lsa — ochamiz
        if (autoOpen) {
            setTimeout(() => {
                const addedBook = document.querySelector(`#libraryPanel .book[data-book-id="${newBookId}"]`);
                if (addedBook) {
                    if (adminBook.fileType === 'pdf') openPdfReader(addedBook);
                    else if (adminBook.fileType === 'audio') openAudioPlayer(addedBook);
                }
            }, 500);
        }
    } catch (err) {
        console.error('Qo\'shishda xatolik:', err);
        showAlert('Xatolik: ' + err.message, 'error');
    }
}

// ================================================
//  WIZARD — KITOB QO'SHISH (5 BOSQICH)
// ================================================
const WIZARD_STEPS = [
    { id: 1, label: 'Asosiy', required: true },
    { id: 2, label: 'Tafsilotlar', required: false },
    { id: 3, label: 'Muqova', required: true },
    { id: 4, label: 'Format', required: false },
    { id: 5, label: "O'lcham", required: false }
];

function openAddBookWizard() {
    const modal = document.getElementById('bookModal');
    const body = modal?.querySelector('.modal-body');
    if (!modal || !body) return;

    addBookWizard = {
        step: 1,
        totalSteps: WIZARD_STEPS.length,
        data: {
            title: '',
            author: '',
            description: '',
            year: '',
            genre: '',
            pages: '',
            coverType: 'hard',
            color: '',  // ✅ bo'sh — majburiy
            viewMode: 'color',
            spineImage: '',
            cover: '',
            bookType: 'simple',
            pdfData: '',
            pdfFileName: '',
            pdfMime: '',
            audioData: '',
            audioFileName: '',
            audioMime: '',
            externalUrl: '',
            linkSource: 'mutolaa',
            height: BOOK_HEIGHT_DEFAULT,
            width: BOOK_WIDTH_DEFAULT,
            targetShelf: 1
        }
    };

    modal.classList.add('active');
    modal.classList.add('wizard-modal');
    renderWizardStep();
}

function closeAddBookWizard() {
    const modal = document.getElementById('bookModal');
    if (modal) {
        modal.classList.remove('active');
        modal.classList.remove('wizard-modal');
    }
    addBookWizard = null;
}

function renderWizardStep() {
    if (!addBookWizard) return;

    const modal = document.getElementById('bookModal');
    const body = modal?.querySelector('.modal-body');
    if (!body) return;

    const step = addBookWizard.step;
    const total = addBookWizard.totalSteps;

    const progressHtml = `
        <div class="wizard-progress">
            <div class="wizard-progress-bar">
                <div class="wizard-progress-fill" style="width:${(step / total) * 100}%"></div>
            </div>
            <div class="wizard-steps">
                ${WIZARD_STEPS.map(s => `
                    <div class="wizard-step ${s.id === step ? 'active' : ''} ${s.id < step ? 'done' : ''}">
                        <div class="wizard-step-circle">${s.id < step ? '✓' : s.id}</div>
                        <div class="wizard-step-label">${s.label}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    let contentHtml = '';

    // Step 1
    if (step === 1) {
        contentHtml = `
            <h3>Asosiy ma'lumotlar</h3>
            <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:14px;">* belgisi majburiy maydon</p>

            <label class="modal-label">Kitob nomi *</label>
            <input type="text" id="wizardTitle" class="modal-input" placeholder="Kitob nomi" value="${escapeHtml(addBookWizard.data.title)}">

            <label class="modal-label">Yozuvchi</label>
            <input type="text" id="wizardAuthor" class="modal-input" placeholder="Yozuvchi ismi" value="${escapeHtml(addBookWizard.data.author)}">
        `;
    }
    // Step 2
    else if (step === 2) {
        contentHtml = `
            <h3>Qo'shimcha ma'lumotlar</h3>
            <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:14px;">Bu maydonlar ixtiyoriy — o'tkazib yuborishingiz mumkin</p>

            <label class="modal-label">Izoh</label>
            <textarea id="wizardDesc" class="modal-input" rows="2" placeholder="Kitob haqida qisqacha izoh">${escapeHtml(addBookWizard.data.description)}</textarea>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <div>
                    <label class="modal-label">Chiqarilgan yili</label>
                    <input type="number" id="wizardYear" class="modal-input" placeholder="2020" value="${escapeHtml(addBookWizard.data.year)}">
                </div>
                <div>
                    <label class="modal-label">Janri</label>
                    <input type="text" id="wizardGenre" class="modal-input" placeholder="Roman" value="${escapeHtml(addBookWizard.data.genre)}">
                </div>
            </div>

            <label class="modal-label">Betlar soni</label>
            <input type="number" id="wizardPages" class="modal-input" placeholder="350" value="${escapeHtml(addBookWizard.data.pages)}">
        `;
    }
    // Step 3 — RANG MAJBURIY
    else if (step === 3) {
        const colorsHtml = `
            <div class="color-palette">
                <div class="color-group">
                    <div class="color-group-title">Issiq ranglar</div>
                    <div class="color-row">
                        ${BOOK_COLORS.slice(0, 10).map(c => `<div class="color-circle ${c === addBookWizard.data.color ? 'selected' : ''}" style="background:${c}" data-color="${c}"></div>`).join('')}
                    </div>
                </div>
                <div class="color-group">
                    <div class="color-group-title">Sovuq ranglar</div>
                    <div class="color-row">
                        ${BOOK_COLORS.slice(10, 20).map(c => `<div class="color-circle ${c === addBookWizard.data.color ? 'selected' : ''}" style="background:${c}" data-color="${c}"></div>`).join('')}
                    </div>
                </div>
                <div class="color-group">
                    <div class="color-group-title">Neytral ranglar</div>
                    <div class="color-row">
                        ${BOOK_COLORS.slice(20, 30).map(c => `<div class="color-circle ${c === addBookWizard.data.color ? 'selected' : ''}" style="background:${c}" data-color="${c}"></div>`).join('')}
                    </div>
                </div>
            </div>
        `;

        contentHtml = `
            <h3>Muqova ko'rinishi</h3>
            <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:14px;">
                <strong style="color:#dc2626;">Rang tanlash majburiy *</strong>
            </p>

            <label class="modal-label">Muqova turi</label>
            <div style="display:flex;gap:8px;margin-bottom:8px;">
                <button id="wizCoverHardBtn" type="button" class="wizard-cover-btn ${addBookWizard.data.coverType === 'hard' ? 'active' : ''}">Qattiq</button>
                <button id="wizCoverSoftBtn" type="button" class="wizard-cover-btn ${addBookWizard.data.coverType === 'soft' ? 'active' : ''}">Yumshoq</button>
            </div>

            <label class="modal-label" style="margin-top:12px;">Ko'rinish turi</label>
            <div class="view-mode-tabs" id="wizardViewModeTabs">
                <button type="button" class="view-mode-tab ${addBookWizard.data.viewMode === 'color' ? 'active' : ''}" data-mode="color">Rang</button>
                <button type="button" class="view-mode-tab ${addBookWizard.data.viewMode === 'image' ? 'active' : ''}" data-mode="image">Rasm</button>
            </div>

            <div id="wizardColorSection" style="display:${addBookWizard.data.viewMode === 'image' ? 'none' : 'block'};">
                <div style="display:flex;align-items:center;gap:10px;margin:12px 0 8px;">
                    <label class="modal-label" style="margin:0;">Rang tanlash:</label>
                    <input type="color" id="wizardColorPicker" value="${addBookWizard.data.color || '#8b6914'}" style="width:44px;height:36px;border:none;cursor:pointer;border-radius:8px;">
                </div>
                ${colorsHtml}
            </div>

            <div id="wizardImageSection" style="display:${addBookWizard.data.viewMode === 'image' ? 'block' : 'none'};">
                <label class="modal-label" style="margin-top:8px;">Yon tomon rasmi:</label>
                <input type="file" id="wizardSpineImage" class="modal-input" accept="image/*" style="padding:8px;">
                <div id="wizardSpinePreview" style="text-align:center;margin-top:8px;min-height:30px;">
                    ${addBookWizard.data.spineImage ? `<img src="${addBookWizard.data.spineImage}" style="max-height:100px;border-radius:6px;">` : ''}
                </div>
            </div>
        `;
    }
    // Step 4 — Format
    else if (step === 4) {
        contentHtml = `
            <h3>Kitob formati</h3>
            <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:14px;">Ixtiyoriy — oddiy kitob sifatida saqlanadi</p>

            <div class="book-type-tabs" id="wizardBookTypeTabs">
                <button type="button" class="book-type-tab ${addBookWizard.data.bookType === 'simple' ? 'active' : ''}" data-type="simple">Oddiy</button>
                <button type="button" class="book-type-tab ${addBookWizard.data.bookType === 'pdf' ? 'active' : ''}" data-type="pdf">PDF</button>
                <button type="button" class="book-type-tab ${addBookWizard.data.bookType === 'audio' ? 'active' : ''}" data-type="audio">Audio</button>
                <button type="button" class="book-type-tab ${addBookWizard.data.bookType === 'link' ? 'active' : ''}" data-type="link">Havola</button>
            </div>

            <div id="wizardPdfSection" class="file-section" style="display:${addBookWizard.data.bookType === 'pdf' ? 'block' : 'none'};">
                <label class="modal-label">PDF fayl yuklash</label>
                <input type="file" id="wizardPdfFile" class="modal-input" accept="application/pdf,.pdf" style="padding:8px;">
                <p style="font-size:0.68rem;color:var(--text-muted);margin:4px 0 8px;">Maksimal hajm: ${MAX_FILE_SIZE_MB} MB</p>
                <div id="wizardPdfPreview" style="text-align:center;margin-top:8px;font-size:0.75rem;color:var(--text-muted);">
                    ${addBookWizard.data.pdfFileName ? `✓ ${escapeHtml(addBookWizard.data.pdfFileName)}` : ''}
                </div>
            </div>

            <div id="wizardAudioSection" class="file-section" style="display:${addBookWizard.data.bookType === 'audio' ? 'block' : 'none'};">
                <label class="modal-label">Audio fayl yuklash</label>
                <input type="file" id="wizardAudioFile" class="modal-input" accept="audio/*,.mp3,.m4a,.wav,.ogg,.aac" style="padding:8px;">
                <p style="font-size:0.68rem;color:var(--text-muted);margin:4px 0 8px;">Maksimal hajm: ${MAX_FILE_SIZE_MB} MB</p>
                <div id="wizardAudioPreview" style="text-align:center;margin-top:8px;font-size:0.75rem;color:var(--text-muted);">
                    ${addBookWizard.data.audioFileName ? `✓ ${escapeHtml(addBookWizard.data.audioFileName)}` : ''}
                </div>
            </div>

            <div id="wizardLinkSection" class="file-section" style="display:${addBookWizard.data.bookType === 'link' ? 'block' : 'none'};">
                <label class="modal-label">Kitob havolasi (URL)</label>
                <input type="url" id="wizardExternalUrl" class="modal-input" placeholder="https://..." value="${escapeHtml(addBookWizard.data.externalUrl)}">
                <label class="modal-label">Manba</label>
                <div class="link-source-tabs" id="wizardLinkSourceTabs">
                    <button type="button" class="link-source-tab ${addBookWizard.data.linkSource === 'mutolaa' ? 'active' : ''}" data-source="mutolaa">Mutolaa</button>
                    <button type="button" class="link-source-tab ${addBookWizard.data.linkSource === 'google' ? 'active' : ''}" data-source="google">Google Books</button>
                    <button type="button" class="link-source-tab ${addBookWizard.data.linkSource === 'other' ? 'active' : ''}" data-source="other">Boshqa</button>
                </div>
            </div>
        `;
    }
    // Step 5 — O'lcham + Javon
    else if (step === 5) {
        contentHtml = `
            <h3>Kitob o'lchami</h3>
            <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:14px;">Balandlik va qalinlikni tanlang</p>

            <label class="modal-label">Balandlik (${BOOK_HEIGHTS.length} variant)</label>
            <div class="size-options" id="wizardSizeOptions">
                ${BOOK_HEIGHTS.map((s, i) => {
                    const isActive = Math.abs(s.h - addBookWizard.data.height) <= 2;
                    const previewH = Math.round(s.h * 0.7);
                    return `<button type="button" class="size-option ${isActive ? 'active' : ''}" data-height="${s.h}">
                        <span class="size-preview" style="height:${previewH}px;"></span>
                    </button>`;
                }).join('')}
            </div>

            <label class="modal-label">Qalinlik (${BOOK_WIDTHS.length} variant)</label>
            <div class="width-options" id="wizardWidthOptions">
                ${BOOK_WIDTHS.map((w) => {
                    const isActive = Math.abs(w.w - addBookWizard.data.width) <= 1;
                    const previewW = Math.max(3, Math.round(w.w * 0.7));
                    return `<button type="button" class="width-option ${isActive ? 'active' : ''}" data-width="${w.w}">
                        <span class="width-preview" style="width:${previewW}px;"></span>
                    </button>`;
                }).join('')}
            </div>

            <label class="modal-label" style="margin-top:14px;">Qaysi javonga qo'yish?</label>
            <div class="view-mode-tabs" id="wizardShelfTabs" style="margin-top:6px;">
                <button type="button" class="view-mode-tab ${addBookWizard.data.targetShelf === 1 ? 'active' : ''}" data-shelf="1">1-javon</button>
                <button type="button" class="view-mode-tab ${addBookWizard.data.targetShelf === 2 ? 'active' : ''}" data-shelf="2">2-javon</button>
                <button type="button" class="view-mode-tab ${addBookWizard.data.targetShelf === 3 ? 'active' : ''}" data-shelf="3">3-javon</button>
            </div>

            <div class="wizard-preview">
                <p style="font-size:0.72rem;color:var(--text-muted);text-align:center;margin:0 0 12px;">Ko'rinishi:</p>
                <div style="display:flex;justify-content:center;">
                    <div style="height:${addBookWizard.data.height}px;width:${addBookWizard.data.width}px;background:${addBookWizard.data.viewMode === 'image' && addBookWizard.data.spineImage ? `url(${addBookWizard.data.spineImage}) center/100% 100% no-repeat` : (addBookWizard.data.color || '#8b6914')};border-radius:3px;box-shadow:0 4px 12px rgba(0,0,0,0.3);"></div>
                </div>
                ${addBookWizard.data.viewMode === 'color' ? `<p style="text-align:center;font-family:'Playfair Display',serif;color:${getTextColor(addBookWizard.data.color || '#8b6914')};font-size:11px;margin-top:8px;font-style:italic;">${escapeHtml(addBookWizard.data.title || 'Kitob nomi')}</p>` : ''}
            </div>
        `;
    }

    const navHtml = `
        <div class="wizard-nav">
            <button type="button" class="wizard-btn wizard-btn-cancel" id="wizardCancelBtn">Bekor qilish</button>
            ${step > 1 ? `<button type="button" class="wizard-btn wizard-btn-back" id="wizardBackBtn">← Orqaga</button>` : ''}
            ${step < total ? `
                <button type="button" class="wizard-btn wizard-btn-skip" id="wizardSkipBtn">O'tkazib yuborish</button>
                <button type="button" class="wizard-btn wizard-btn-next" id="wizardNextBtn">Keyingi →</button>
            ` : `
                <button type="button" class="wizard-btn wizard-btn-save" id="wizardSaveBtn">Saqlash</button>
            `}
        </div>
    `;

    body.innerHTML = progressHtml + `<div class="wizard-content">${contentHtml}</div>` + navHtml;
    bindWizardEvents(step);
}

function bindWizardEvents(step) {
    const modal = document.getElementById('bookModal');
    const body = modal?.querySelector('.modal-body');
    if (!body || !addBookWizard) return;

    document.getElementById('wizardCancelBtn')?.addEventListener('click', () => {
        showConfirm('Kitob qo\'shishni bekor qilmoqchimisiz?', () => {
            closeAddBookWizard();
        }, { title: 'Bekor qilish', confirmText: 'Ha', cancelText: 'Yo\'q' });
    });

    document.getElementById('wizardBackBtn')?.addEventListener('click', () => {
        saveCurrentStepData();
        addBookWizard.step = Math.max(1, addBookWizard.step - 1);
        renderWizardStep();
    });

    document.getElementById('wizardNextBtn')?.addEventListener('click', () => {
        saveCurrentStepData();
        if (validateCurrentStep()) {
            addBookWizard.step = Math.min(addBookWizard.totalSteps, addBookWizard.step + 1);
            renderWizardStep();
        }
    });

    document.getElementById('wizardSkipBtn')?.addEventListener('click', () => {
        addBookWizard.step = Math.min(addBookWizard.totalSteps, addBookWizard.step + 1);
        renderWizardStep();
    });

    document.getElementById('wizardSaveBtn')?.addEventListener('click', () => {
        saveCurrentStepData();
        if (validateCurrentStep()) {
            finalizeAddBook();
        }
    });

    // Step 3 — Cover events
    if (step === 3) {
        const hardBtn = document.getElementById('wizCoverHardBtn');
        const softBtn = document.getElementById('wizCoverSoftBtn');

        function setCoverType(type) {
            addBookWizard.data.coverType = type;
            if (hardBtn) hardBtn.classList.toggle('active', type === 'hard');
            if (softBtn) softBtn.classList.toggle('active', type === 'soft');
        }
        if (hardBtn) hardBtn.onclick = () => setCoverType('hard');
        if (softBtn) softBtn.onclick = () => setCoverType('soft');

        document.querySelectorAll('#wizardViewModeTabs .view-mode-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('#wizardViewModeTabs .view-mode-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                addBookWizard.data.viewMode = tab.dataset.mode;

                const colorSection = document.getElementById('wizardColorSection');
                const imageSection = document.getElementById('wizardImageSection');
                if (addBookWizard.data.viewMode === 'image') {
                    colorSection.style.display = 'none';
                    imageSection.style.display = 'block';
                } else {
                    colorSection.style.display = 'block';
                    imageSection.style.display = 'none';
                }
            };
        });

        const colorPicker = document.getElementById('wizardColorPicker');
        if (colorPicker) {
            colorPicker.addEventListener('input', () => {
                addBookWizard.data.color = colorPicker.value;
                document.querySelectorAll('#wizardColorSection .color-circle').forEach(c => c.classList.remove('selected'));
            });
        }

        document.querySelectorAll('#wizardColorSection .color-circle').forEach(circle => {
            circle.onclick = () => {
                document.querySelectorAll('#wizardColorSection .color-circle').forEach(c => c.classList.remove('selected'));
                circle.classList.add('selected');
                addBookWizard.data.color = circle.dataset.color;
                if (colorPicker) colorPicker.value = addBookWizard.data.color;
            };
        });

        const spineInput = document.getElementById('wizardSpineImage');
        if (spineInput) {
            spineInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                openCropModal(file, NaN, 'Yon tomon rasmini qirqish', (croppedDataUrl) => {
                    addBookWizard.data.spineImage = croppedDataUrl;
                    const preview = document.getElementById('wizardSpinePreview');
                    if (preview) preview.innerHTML = `<img src="${croppedDataUrl}" style="max-height:100px;border-radius:6px;">`;
                });
            });
        }
    }
    // Step 4
    else if (step === 4) {
        document.querySelectorAll('#wizardBookTypeTabs .book-type-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('#wizardBookTypeTabs .book-type-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                addBookWizard.data.bookType = tab.dataset.type;

                document.getElementById('wizardPdfSection').style.display = 'none';
                document.getElementById('wizardAudioSection').style.display = 'none';
                document.getElementById('wizardLinkSection').style.display = 'none';

                if (addBookWizard.data.bookType === 'pdf') {
                    document.getElementById('wizardPdfSection').style.display = 'block';
                } else if (addBookWizard.data.bookType === 'audio') {
                    document.getElementById('wizardAudioSection').style.display = 'block';
                } else if (addBookWizard.data.bookType === 'link') {
                    document.getElementById('wizardLinkSection').style.display = 'block';
                }
            };
        });

        const pdfInput = document.getElementById('wizardPdfFile');
        if (pdfInput) {
            pdfInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > MAX_FILE_SIZE_BYTES) {
                    showAlert(`Fayl hajmi juda katta. Maks: ${MAX_FILE_SIZE_MB} MB`, 'error');
                    e.target.value = '';
                    return;
                }
                const preview = document.getElementById('wizardPdfPreview');
                preview.textContent = 'Yuklanmoqda...';
                try {
                    addBookWizard.data.pdfData = await fileToDataUrl(file);
                    addBookWizard.data.pdfFileName = file.name;
                    addBookWizard.data.pdfMime = file.type || 'application/pdf';
                    preview.innerHTML = `✓ ${escapeHtml(file.name)} (${formatFileSize(file.size)})`;
                } catch (_) {
                    showAlert('Faylni o\'qishda xatolik', 'error');
                    preview.textContent = '';
                }
            });
        }

        const audioInput = document.getElementById('wizardAudioFile');
        if (audioInput) {
            audioInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > MAX_FILE_SIZE_BYTES) {
                    showAlert(`Fayl hajmi juda katta. Maks: ${MAX_FILE_SIZE_MB} MB`, 'error');
                    e.target.value = '';
                    return;
                }
                const preview = document.getElementById('wizardAudioPreview');
                preview.textContent = 'Yuklanmoqda...';
                try {
                    addBookWizard.data.audioData = await fileToDataUrl(file);
                    addBookWizard.data.audioFileName = file.name;
                    addBookWizard.data.audioMime = file.type || 'audio/mpeg';
                    preview.innerHTML = `✓ ${escapeHtml(file.name)} (${formatFileSize(file.size)})`;
                } catch (_) {
                    showAlert('Faylni o\'qishda xatolik', 'error');
                    preview.textContent = '';
                }
            });
        }

        document.querySelectorAll('#wizardLinkSourceTabs .link-source-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('#wizardLinkSourceTabs .link-source-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                addBookWizard.data.linkSource = tab.dataset.source;
            };
        });
    }
    // Step 5
    else if (step === 5) {
        document.querySelectorAll('#wizardSizeOptions .size-option').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('#wizardSizeOptions .size-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                addBookWizard.data.height = parseInt(btn.dataset.height);

                const previewEl = document.querySelector('.wizard-preview > div > div');
                if (previewEl) previewEl.style.height = addBookWizard.data.height + 'px';
            };
        });

        document.querySelectorAll('#wizardWidthOptions .width-option').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('#wizardWidthOptions .width-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                addBookWizard.data.width = parseInt(btn.dataset.width);

                const previewEl = document.querySelector('.wizard-preview > div > div');
                if (previewEl) previewEl.style.width = addBookWizard.data.width + 'px';
            };
        });

        document.querySelectorAll('#wizardShelfTabs .view-mode-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('#wizardShelfTabs .view-mode-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                addBookWizard.data.targetShelf = parseInt(tab.dataset.shelf);
            };
        });
    }
}

function saveCurrentStepData() {
    if (!addBookWizard) return;
    const step = addBookWizard.step;

    if (step === 1) {
        const titleEl = document.getElementById('wizardTitle');
        const authorEl = document.getElementById('wizardAuthor');
        if (titleEl) addBookWizard.data.title = titleEl.value.trim();
        if (authorEl) addBookWizard.data.author = authorEl.value.trim();
    } else if (step === 2) {
        const descEl = document.getElementById('wizardDesc');
        const yearEl = document.getElementById('wizardYear');
        const genreEl = document.getElementById('wizardGenre');
        const pagesEl = document.getElementById('wizardPages');
        if (descEl) addBookWizard.data.description = descEl.value.trim();
        if (yearEl) addBookWizard.data.year = yearEl.value;
        if (genreEl) addBookWizard.data.genre = genreEl.value.trim();
        if (pagesEl) addBookWizard.data.pages = pagesEl.value;
    } else if (step === 4) {
        const urlInput = document.getElementById('wizardExternalUrl');
        if (urlInput) addBookWizard.data.externalUrl = urlInput.value.trim();
    }
}

function validateCurrentStep() {
    if (!addBookWizard) return false;
    const step = addBookWizard.step;
    const data = addBookWizard.data;

    if (step === 1) {
        if (!data.title || data.title.length < 1) {
            showAlert('Kitob nomini kiriting', 'warning');
            return false;
        }
    } else if (step === 3) {
        // ✅ Rang majburiy
        if (!data.color) {
            showAlert('Rang tanlash majburiy!', 'warning');
            return false;
        }
    } else if (step === 4) {
        if (data.bookType === 'pdf' && !data.pdfData) {
            showAlert('PDF faylni yuklang yoki "O\'tkazib yuborish" tugmasini bosing', 'warning');
            return false;
        }
        if (data.bookType === 'audio' && !data.audioData) {
            showAlert('Audio faylni yuklang yoki "O\'tkazib yuborish" tugmasini bosing', 'warning');
            return false;
        }
        if (data.bookType === 'link') {
            if (!data.externalUrl) {
                showAlert('Havolani kiriting yoki "O\'tkazib yuborish" tugmasini bosing', 'warning');
                return false;
            }
            if (!/^https?:\/\//i.test(data.externalUrl)) {
                showAlert('Havola http:// yoki https:// bilan boshlanishi kerak', 'warning');
                return false;
            }
        }
    }
    return true;
}

async function finalizeAddBook() {
    if (!addBookWizard) return;
    const data = addBookWizard.data;

    if (!data.author) data.author = 'Noma\'lum';
    if (!data.bookType) data.bookType = 'simple';
    if (!data.color) data.color = BOOK_COLORS[0];

    const bookId = generateBookId();

    const bookData = {
        bookId,
        title: data.title,
        author: data.author,
        description: data.description || '',
        color: data.color,
        cover: data.cover || '',
        height: data.height || BOOK_HEIGHT_DEFAULT,
        width: data.width || BOOK_WIDTH_DEFAULT,
        status: 'unread',
        rating: '0',
        coverType: data.coverType || 'hard',
        year: data.year || '',
        genre: data.genre || '',
        pages: data.pages || '',
        viewMode: data.viewMode || 'color',
        spineImage: data.spineImage || ''
    };

    if (data.bookType === 'pdf') {
        bookData.fileType = 'pdf';
        bookData.fileName = data.pdfFileName;
        bookData.fileMime = data.pdfMime;
    } else if (data.bookType === 'audio') {
        bookData.fileType = 'audio';
        bookData.fileName = data.audioFileName;
        bookData.fileMime = data.audioMime;
    } else if (data.bookType === 'link') {
        bookData.externalUrl = data.externalUrl;
        bookData.externalSource = data.linkSource;
    }

    try {
        if (data.bookType === 'pdf' && data.pdfData) {
            await saveBookFile(bookId, data.pdfData, data.pdfMime, data.pdfFileName);
        } else if (data.bookType === 'audio' && data.audioData) {
            await saveBookFile(bookId, data.audioData, data.audioMime, data.audioFileName);
        }

        // ✅ Tanlangan javonga qo'shish
        const targetShelfNum = data.targetShelf || 1;
        const shelfEl = document.querySelector(`#libraryPanel .bookshelf-unit[data-shelf="${targetShelfNum}"] .wooden-bookshelf`);
        if (shelfEl) {
            const bookElement = createBookElement(bookData);
            const container = addBookToShelfWithFlow(shelfEl, bookElement);
            if (container) {
                bookElement.dataset.cell = `${container.dataset.shelf}-${container.dataset.row}`;
            }
        }

        saveMainShelf();
        updateBooksCount();
        updateProfileStats();

        closeAddBookWizard();
        showMoveNotification('Kitob qo\'shildi');
    } catch (err) {
        console.error('Saqlash xatosi:', err);
        showAlert('Saqlashda xatolik: ' + err.message, 'error');
    }
}

function addNewBookData(bookData) {
    const shelves = document.querySelectorAll('#libraryPanel .wooden-bookshelf');
    if (!shelves.length) return;

    let bestShelf = shelves[0];
    let minCount = Infinity;
    shelves.forEach(shelf => {
        const count = shelf.querySelectorAll('.book').length;
        if (count < minCount) { minCount = count; bestShelf = shelf; }
    });
    if (!bestShelf) return;

    const bookElement = createBookElement(bookData);
    const targetContainer = addBookToShelfWithFlow(bestShelf, bookElement);
    if (targetContainer) {
        bookElement.dataset.cell = `${targetContainer.dataset.shelf}-${targetContainer.dataset.row}`;
    }

    saveMainShelf();
    updateBooksCount();
    updateProfileStats();
}

// ================================================
//  KITOB MODAL — KO'RISH
// ================================================
async function showBookModal(book) {
    const modal = document.getElementById('bookModal');
    const body = modal?.querySelector('.modal-body');
    if (!modal || !body) return;

    modal.classList.remove('wizard-modal');

    const status = book.dataset.status;
    const rating = parseInt(book.dataset.rating) || 0;
    const year = book.dataset.year || '';
    const genre = book.dataset.genre || '';
    const pages = book.dataset.pages || '';
    const coverType = book.dataset.coverType || 'hard';
    const viewMode = book.dataset.viewMode || 'color';
    const fileType = book.dataset.fileType || '';
    const fileName = book.dataset.fileName || '';
    const externalUrl = book.dataset.externalUrl || '';
    const externalSource = book.dataset.externalSource || '';

    // ✅ Progress
    const progress = await getBookProgress(book.dataset.bookId);
    let progressHtml = '';
    if (progress) {
        if (fileType === 'pdf' && progress.pdfPage > 1) {
            progressHtml = `<p>${ICONS.progress} O'qilgan joy: <strong>${progress.pdfPage}-sahifa</strong> · ${formatRelativeTime(progress.updatedAt)}</p>`;
        } else if (fileType === 'audio' && progress.audioTime > 0) {
            progressHtml = `<p>${ICONS.progress} Tinglangan joy: <strong>${formatTime(progress.audioTime)}</strong> · ${formatRelativeTime(progress.updatedAt)}</p>`;
        }
    }

    let actionBtnHtml = '';
    if (fileType === 'pdf') {
        actionBtnHtml = `<button class="modal-btn edit" id="openPdfBtn" style="background:linear-gradient(135deg,#dc2626,#991b1b);">${ICONS.pdf} PDF o'qish</button>`;
    } else if (fileType === 'audio') {
        actionBtnHtml = `<button class="modal-btn edit" id="openAudioBtn" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9);">${ICONS.audio} Tinglash</button>`;
    } else if (externalUrl) {
        const srcLabel = externalSource === 'mutolaa' ? 'Mutolaa' : (externalSource === 'google' ? 'Google Books' : 'Havola');
        actionBtnHtml = `<button class="modal-btn edit" id="openLinkBtn" style="background:linear-gradient(135deg,#0ea5e9,#0369a1);">${ICONS.link} ${srcLabel}da ochish</button>`;
    }

    body.innerHTML = `
        <h3>${escapeHtml(book.dataset.title)}</h3>
        ${book.dataset.cover ? `<div style="text-align:center;margin-bottom:12px;"><img src="${book.dataset.cover}" style="max-width:120px;max-height:160px;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,0.15);"></div>` : ''}
        <div class="book-info">
            <p>${ICONS.author} Yozuvchi: ${escapeHtml(book.dataset.author)}</p>
            ${progressHtml}
            ${book.dataset.description ? `<p>${ICONS.description} ${escapeHtml(book.dataset.description)}</p>` : ''}
            ${year ? `<p>${ICONS.calendar} Chiqarilgan: ${escapeHtml(year)}</p>` : ''}
            ${genre ? `<p>${ICONS.tag} Janr: ${escapeHtml(genre)}</p>` : ''}
            ${pages ? `<p>${ICONS.pages} Betlar: ${escapeHtml(pages)}</p>` : ''}
            <p>${ICONS.bookCover} Muqova: ${coverType === 'hard' ? 'Qattiq' : 'Yumshoq'}</p>
            <p>${ICONS.viewMode} Ko'rinish: ${viewMode === 'image' ? 'Yon tomon rasmi' : 'Rang'}</p>
            ${fileType === 'pdf' ? `<p>${ICONS.pdf} Format: PDF (${escapeHtml(fileName)})</p>` : ''}
            ${fileType === 'audio' ? `<p>${ICONS.audio} Format: Audio (${escapeHtml(fileName)})</p>` : ''}
            ${externalUrl ? `<p>${ICONS.link} Manba: ${externalSource === 'mutolaa' ? 'Mutolaa' : (externalSource === 'google' ? 'Google Books' : 'Boshqa')}</p>` : ''}
        </div>

        <label style="color:#7a8a7a;font-size:12px;">Holati</label>
        <div class="status-group">
            <button class="status-btn ${status === 'unread' ? 'active' : ''}" data-status="unread">O'qilmagan</button>
            <button class="status-btn ${status === 'reading' ? 'active' : ''}" data-status="reading">O'qiyapman</button>
            <button class="status-btn ${status === 'read' ? 'active' : ''}" data-status="read">O'qilgan</button>
        </div>

        <label style="color:#7a8a7a;font-size:12px;display:flex;justify-content:space-between;align-items:center;">
            <span>Baho (10 dan)</span>
            <span style="color:#3d6b3d;font-weight:700;font-size:0.85rem;">${rating}/10</span>
        </label>
        <div class="rating-stars rating-stars-10">
            ${[1,2,3,4,5,6,7,8,9,10].map(i => `<span class="rating-star ${i <= rating ? 'active' : ''}" data-rating="${i}">★</span>`).join('')}
        </div>

        <div class="modal-actions">
            ${actionBtnHtml}
        </div>
        <div class="modal-actions" style="margin-top:8px;">
            <button class="modal-btn move" id="moveBookBtn">Ko'chirish</button>
            <button class="modal-btn edit" id="editBookBtn">Tahrirlash</button>
            <button class="modal-btn delete" id="deleteBookBtn">O'chirish</button>
        </div>`;

    body.querySelectorAll('.status-btn').forEach(btn => {
        btn.onclick = () => {
            book.dataset.status = btn.dataset.status;
            saveMainShelf();
            showBookModal(book);
        };
    });

    body.querySelectorAll('.rating-star').forEach(star => {
        star.onclick = () => {
            const newRating = parseInt(star.dataset.rating);
            book.dataset.rating = (parseInt(book.dataset.rating) === newRating) ? '0' : newRating.toString();
            saveMainShelf();
            showBookModal(book);
        };
    });

    document.getElementById('editBookBtn').onclick = () => {
        modal.classList.remove('active');
        showEditBookModal(book);
    };

    document.getElementById('deleteBookBtn').onclick = () => {
        showConfirm(
            `"${book.dataset.title}" kitobini o'chirishni tasdiqlaysizmi?`,
            async () => {
                const bookId = book.dataset.bookId;
                book.remove();
                saveMainShelf();
                updateBooksCount();
                if (currentUser && bookId) {
                    try { await db.ref(`bookFiles/${currentUser.uid}/${bookId}`).remove(); } catch (_) {}
                    try { await deleteBookProgress(bookId); } catch (_) {}
                }
                modal.classList.remove('active');
                showAlert('Kitob o\'chirildi', 'success');
            },
            { title: 'Kitobni o\'chirish', confirmText: 'Ha, o\'chirish', cancelText: 'Bekor qilish' }
        );
    };

    document.getElementById('moveBookBtn').onclick = () => {
        modal.classList.remove('active');
        selectBookForMove(book);
    };

    const openPdfBtn = document.getElementById('openPdfBtn');
    if (openPdfBtn) {
        openPdfBtn.onclick = () => {
            modal.classList.remove('active');
            openPdfReader(book);
        };
    }

    const openAudioBtn = document.getElementById('openAudioBtn');
    if (openAudioBtn) {
        openAudioBtn.onclick = () => {
            modal.classList.remove('active');
            openAudioPlayer(book);
        };
    }

    const openLinkBtn = document.getElementById('openLinkBtn');
    if (openLinkBtn) {
        openLinkBtn.onclick = () => {
            window.open(book.dataset.externalUrl, '_blank', 'noopener,noreferrer');
        };
    }

    modal.classList.add('active');
}

// ================================================
//  KITOB MODAL — TAHRIRLASH
// ================================================
function showEditBookModal(book) {
    const modal = document.getElementById('bookModal');
    const body = modal?.querySelector('.modal-body');
    if (!modal || !body) return;

    modal.classList.remove('wizard-modal');

    const currentCoverType = book.dataset.coverType || 'hard';
    const currentColor = book.dataset.color || '#8b6914';
    const currentViewMode = book.dataset.viewMode || 'color';
    const currentSpineImage = book.dataset.spineImage || '';
    const currentHeight = parseInt(book.dataset.height || book.style.height || BOOK_HEIGHT_DEFAULT);
    const currentWidth = parseInt(book.dataset.width || BOOK_WIDTH_DEFAULT);
    const currentFileType = book.dataset.fileType || '';
    const currentFileName = book.dataset.fileName || '';
    const currentExternalUrl = book.dataset.externalUrl || '';
    const currentExternalSource = book.dataset.externalSource || 'mutolaa';

    const colorsHtml = `
        <div class="color-palette">
            <div class="color-group">
                <div class="color-group-title">Issiq</div>
                <div class="color-row">
                    ${BOOK_COLORS.slice(0, 10).map(c => `<div class="color-circle ${c === currentColor ? 'selected' : ''}" style="background:${c}" data-color="${c}"></div>`).join('')}
                </div>
            </div>
            <div class="color-group">
                <div class="color-group-title">Sovuq</div>
                <div class="color-row">
                    ${BOOK_COLORS.slice(10, 20).map(c => `<div class="color-circle ${c === currentColor ? 'selected' : ''}" style="background:${c}" data-color="${c}"></div>`).join('')}
                </div>
            </div>
            <div class="color-group">
                <div class="color-group-title">Neytral</div>
                <div class="color-row">
                    ${BOOK_COLORS.slice(20, 30).map(c => `<div class="color-circle ${c === currentColor ? 'selected' : ''}" style="background:${c}" data-color="${c}"></div>`).join('')}
                </div>
            </div>
        </div>`;

    body.innerHTML = `
        <h3>Tahrirlash</h3>

        <label class="modal-label">Kitob nomi</label>
        <input type="text" id="editTitle" class="modal-input" value="${escapeHtml(book.dataset.title)}">

        <label class="modal-label">Yozuvchi</label>
        <input type="text" id="editAuthor" class="modal-input" value="${escapeHtml(book.dataset.author)}">

        <label class="modal-label">Izoh</label>
        <textarea id="editDesc" class="modal-input" rows="2">${escapeHtml(book.dataset.description || '')}</textarea>

        <label class="modal-label">Balandlik (${BOOK_HEIGHTS.length} variant)</label>
        <div class="size-options" id="editSizeOptions">
            ${BOOK_HEIGHTS.map(s => {
                const isActive = Math.abs(s.h - currentHeight) <= 2;
                const previewH = Math.round(s.h * 0.7);
                return `<button type="button" class="size-option ${isActive ? 'active' : ''}" data-height="${s.h}">
                    <span class="size-preview" style="height:${previewH}px;"></span>
                </button>`;
            }).join('')}
        </div>

        <label class="modal-label">Qalinlik (${BOOK_WIDTHS.length} variant)</label>
        <div class="width-options" id="editWidthOptions">
            ${BOOK_WIDTHS.map(w => {
                const isActive = Math.abs(w.w - currentWidth) <= 1;
                const previewW = Math.max(3, Math.round(w.w * 0.7));
                return `<button type="button" class="width-option ${isActive ? 'active' : ''}" data-width="${w.w}">
                    <span class="width-preview" style="width:${previewW}px;"></span>
                </button>`;
            }).join('')}
        </div>

        <label class="modal-label" style="margin-top:14px;">Ko'rinish turi</label>
        <div class="view-mode-tabs" id="editViewModeTabs">
            <button type="button" class="view-mode-tab ${currentViewMode === 'color' ? 'active' : ''}" data-mode="color">Rang</button>
            <button type="button" class="view-mode-tab ${currentViewMode === 'image' ? 'active' : ''}" data-mode="image">Rasm</button>
        </div>

        <div id="editColorPickerSection" style="display:${currentViewMode === 'image' ? 'none' : 'block'};">
            <input type="color" id="editColorPicker" value="${currentColor}" style="width:44px;height:36px;border:none;cursor:pointer;border-radius:8px;margin-bottom:8px;">
            ${colorsHtml}
        </div>

        <div id="editSpineImageSection" style="display:${currentViewMode === 'image' ? 'block' : 'none'};">
            <label class="modal-label">Yon tomon rasmi:</label>
            <input type="file" id="editSpineImage" class="modal-input" accept="image/*" style="padding:8px;">
            <div id="editSpineImagePreview" style="text-align:center;margin-top:8px;">
                ${currentSpineImage ? `<img src="${currentSpineImage}" style="max-height:100px;border-radius:6px;">` : ''}
            </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:4px 0;">
            <div>
                <label class="modal-label">Yili</label>
                <input type="number" id="editYear" class="modal-input" value="${escapeHtml(book.dataset.year || '')}">
            </div>
            <div>
                <label class="modal-label">Janri</label>
                <input type="text" id="editGenre" class="modal-input" value="${escapeHtml(book.dataset.genre || '')}">
            </div>
        </div>

        <label class="modal-label">Betlar</label>
        <input type="number" id="editPages" class="modal-input" value="${escapeHtml(book.dataset.pages || '')}">

        <div class="modal-actions">
            <button class="modal-btn" id="cancelEditBtn">Bekor qilish</button>
            <button class="modal-btn edit" id="saveEditBtn">Saqlash</button>
        </div>`;

    modal.classList.add('active');

    let selectedColor = currentColor;
    let selectedEditHeight = currentHeight;
    let selectedEditWidth = currentWidth;
    let selectedEditViewMode = currentViewMode;
    let selectedEditSpineImage = currentSpineImage;
    let selectedEditLinkSource = currentExternalSource;

    const editColorPicker = document.getElementById('editColorPicker');
    if (editColorPicker) {
        editColorPicker.addEventListener('input', () => {
            selectedColor = editColorPicker.value;
            document.querySelectorAll('#bookModal .color-circle').forEach(c => c.classList.remove('selected'));
        });
    }
    document.querySelectorAll('#bookModal .color-circle').forEach(circle => {
        circle.onclick = () => {
            document.querySelectorAll('#bookModal .color-circle').forEach(c => c.classList.remove('selected'));
            circle.classList.add('selected');
            selectedColor = circle.dataset.color;
            if (editColorPicker) editColorPicker.value = selectedColor;
        };
    });

    document.querySelectorAll('#editSizeOptions .size-option').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('#editSizeOptions .size-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedEditHeight = parseInt(btn.dataset.height);
        };
    });

    document.querySelectorAll('#editWidthOptions .width-option').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('#editWidthOptions .width-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedEditWidth = parseInt(btn.dataset.width);
        };
    });

    document.querySelectorAll('#editViewModeTabs .view-mode-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('#editViewModeTabs .view-mode-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            selectedEditViewMode = tab.dataset.mode;
            const colorSection = document.getElementById('editColorPickerSection');
            const imageSection = document.getElementById('editSpineImageSection');
            if (selectedEditViewMode === 'image') {
                colorSection.style.display = 'none';
                imageSection.style.display = 'block';
            } else {
                colorSection.style.display = 'block';
                imageSection.style.display = 'none';
            }
        };
    });

    const editSpineInput = document.getElementById('editSpineImage');
    if (editSpineInput) {
        editSpineInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            openCropModal(file, NaN, 'Yon tomon rasmini qirqish', (croppedDataUrl) => {
                selectedEditSpineImage = croppedDataUrl;
                const preview = document.getElementById('editSpineImagePreview');
                if (preview) preview.innerHTML = `<img src="${croppedDataUrl}" style="max-height:100px;border-radius:6px;">`;
            });
        });
    }

    document.getElementById('saveEditBtn').onclick = async () => {
        if (selectedEditViewMode === 'image' && !selectedEditSpineImage) {
            showAlert('Yon tomon rasmini yuklang', 'warning'); return;
        }

        book.dataset.title = document.getElementById('editTitle')?.value.trim() || book.dataset.title;
        book.dataset.author = document.getElementById('editAuthor')?.value.trim() || 'Noma\'lum';
        book.dataset.description = document.getElementById('editDesc')?.value.trim() || '';
        book.dataset.year = document.getElementById('editYear')?.value || '';
        book.dataset.genre = document.getElementById('editGenre')?.value.trim() || '';
        book.dataset.pages = document.getElementById('editPages')?.value || '';
        book.dataset.height = selectedEditHeight;
        book.style.height = selectedEditHeight + 'px';
        book.dataset.color = selectedColor;
        book.dataset.viewMode = selectedEditViewMode;
        book.dataset.spineImage = selectedEditSpineImage;
        book.dataset.width = selectedEditWidth;
        book.style.width = selectedEditWidth + 'px';
        book.style.minWidth = selectedEditWidth + 'px';
        book.style.maxWidth = selectedEditWidth + 'px';

        const isHard = book.dataset.coverType === 'hard';
        const thickness = isHard ? Math.floor(Math.random() * 4) + 4 : Math.floor(Math.random() * 3) + 1;

        if (selectedEditViewMode === 'image' && selectedEditSpineImage) {
            book.style.background = `url(${selectedEditSpineImage}) center / 100% 100% no-repeat`;
            book.style.border = 'none';
            book.style.boxShadow = '1px 2px 6px rgba(0,0,0,0.35)';
            book.style.borderRadius = '3px';
            book.classList.add('book-image-mode');
            const titleEl = book.querySelector('.book-title');
            if (titleEl) titleEl.remove();
        } else {
            book.style.background = selectedColor;
            book.style.border = isHard ? '2px solid rgba(0,0,0,0.15)' : '1px solid rgba(0,0,0,0.08)';
            book.style.boxShadow = isHard
                ? `${thickness}px 1px 6px rgba(0,0,0,0.5), inset 1px 0 0 rgba(255,255,255,0.08)`
                : `${thickness}px 1px 4px rgba(0,0,0,0.3), inset 1px 0 0 rgba(255,255,255,0.04)`;
            book.style.borderRadius = isHard ? '3px 3px 3px 3px' : '2px 2px 2px 2px';
            book.classList.remove('book-image-mode');

            const titleEl = book.querySelector('.book-title');
            if (!titleEl) {
                const newTitle = document.createElement('div');
                newTitle.className = 'book-title';
                newTitle.style.color = getTextColor(selectedColor);
                newTitle.style.fontSize = '10px';
                newTitle.textContent = book.dataset.title;
                book.appendChild(newTitle);
            } else {
                titleEl.style.color = getTextColor(selectedColor);
                titleEl.textContent = book.dataset.title;
            }
        }

        saveMainShelf();
        updateBooksCount();
        modal.classList.remove('active');
        showBookModal(book);
    };

    document.getElementById('cancelEditBtn').onclick = () => {
        modal.classList.remove('active');
        showBookModal(book);
    };
}

// ================================================
//  PDF READER
// ================================================
async function openPdfReader(book) {
    const modal = document.getElementById('pdfReaderModal');
    if (!modal) return;

    const bookId = book.dataset.bookId;
    const title = book.dataset.title || 'PDF';

    document.getElementById('pdfReaderTitle').textContent = title;
    document.getElementById('pdfReaderSubtitle').textContent = 'Yuklanmoqda...';
    document.getElementById('pdfReaderLoading').style.display = 'flex';
    document.getElementById('pdfCanvas').style.display = 'none';

    modal.classList.add('active');
    pdfCurrentBook = book;
    pdfPageNum = 1;
    pdfScale = 1.0;
    document.getElementById('pdfZoomInfo').textContent = '100%';

    const progress = await getBookProgress(bookId);
    const savedPage = progress?.pdfPage || 1;
    const savedScale = progress?.pdfScale || 1.0;

    let fileData = null;
    try {
        fileData = await getBookFile(currentUser.uid, bookId);
    } catch (_) {}

    if (!fileData || !fileData.data) {
        showAlert('PDF fayl topilmadi', 'error');
        closePdfReader();
        return;
    }

    try {
        const bytes = base64ToUint8Array(fileData.data);
        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        pdfDoc = await loadingTask.promise;
        document.getElementById('pdfPageTotal').textContent = pdfDoc.numPages;
        document.getElementById('pdfPageInput').max = pdfDoc.numPages;
        document.getElementById('pdfReaderSubtitle').textContent = `${pdfDoc.numPages} sahifa · ${formatFileSize(fileData.data.length)}`;

        pdfScale = savedScale;
        document.getElementById('pdfZoomInfo').textContent = Math.round(pdfScale * 100) + '%';

        const startPage = Math.min(savedPage, pdfDoc.numPages);
        await renderPdfPage(startPage);

        if (savedPage > 1) {
            showMoveNotification(`${savedPage}-sahifadan davom etyapsiz`);
        }
    } catch (err) {
        console.error('PDF yuklash xatosi:', err);
        showAlert('PDF yuklashda xatolik: ' + err.message, 'error');
        closePdfReader();
    }
}

async function renderPdfPage(num) {
    if (!pdfDoc || pdfRendering) return;
    pdfRendering = true;

    try {
        const page = await pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: pdfScale * 1.5 });
        const canvas = document.getElementById('pdfCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = 'auto';
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';
        canvas.style.display = 'block';

        await page.render({ canvasContext: ctx, viewport }).promise;

        document.getElementById('pdfReaderLoading').style.display = 'none';
        document.getElementById('pdfPageInput').value = num;
        pdfPageNum = num;

        if (pdfCurrentBook) {
            saveBookProgress(pdfCurrentBook.dataset.bookId, {
                pdfPage: num,
                pdfScale: pdfScale
            });
        }
    } catch (err) {
        console.error('Sahifa render xatosi:', err);
    } finally {
        pdfRendering = false;
    }
}

function closePdfReader() {
    const modal = document.getElementById('pdfReaderModal');
    if (modal) modal.classList.remove('active');
    if (pdfDoc) {
        try { pdfDoc.destroy(); } catch (_) {}
        pdfDoc = null;
    }
    pdfCurrentBook = null;
}

function initPdfReader() {
    document.getElementById('pdfReaderCloseBtn')?.addEventListener('click', closePdfReader);

    document.getElementById('pdfPrevBtn')?.addEventListener('click', () => {
        if (pdfPageNum <= 1) return;
        renderPdfPage(pdfPageNum - 1);
    });

    document.getElementById('pdfNextBtn')?.addEventListener('click', () => {
        if (!pdfDoc || pdfPageNum >= pdfDoc.numPages) return;
        renderPdfPage(pdfPageNum + 1);
    });

    document.getElementById('pdfPageInput')?.addEventListener('change', (e) => {
        const n = parseInt(e.target.value);
        if (n >= 1 && pdfDoc && n <= pdfDoc.numPages) {
            renderPdfPage(n);
        }
    });

    document.getElementById('pdfZoomInBtn')?.addEventListener('click', () => {
        pdfScale = Math.min(3, pdfScale + 0.25);
        document.getElementById('pdfZoomInfo').textContent = Math.round(pdfScale * 100) + '%';
        if (pdfPageNum) renderPdfPage(pdfPageNum);
    });

    document.getElementById('pdfZoomOutBtn')?.addEventListener('click', () => {
        pdfScale = Math.max(0.5, pdfScale - 0.25);
        document.getElementById('pdfZoomInfo').textContent = Math.round(pdfScale * 100) + '%';
        if (pdfPageNum) renderPdfPage(pdfPageNum);
    });

    document.getElementById('pdfDownloadBtn')?.addEventListener('click', async () => {
        if (!pdfCurrentBook) return;
        const file = await getBookFile(currentUser.uid, pdfCurrentBook.dataset.bookId);
        if (!file) return;
        const a = document.createElement('a');
        a.href = file.data;
        a.download = file.name || 'document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('pdfReaderModal');
        if (!modal?.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') document.getElementById('pdfPrevBtn')?.click();
        if (e.key === 'ArrowRight') document.getElementById('pdfNextBtn')?.click();
        if (e.key === 'Escape') closePdfReader();
    });
}

// ================================================
//  AUDIO PLAYER
// ================================================
async function openAudioPlayer(book) {
    const modal = document.getElementById('audioPlayerModal');
    if (!modal) return;

    const bookId = book.dataset.bookId;
    const title = book.dataset.title || 'Audio kitob';
    const author = book.dataset.author || '—';
    const cover = book.dataset.cover || '';
    const color = book.dataset.color || '#8b5cf6';

    document.getElementById('audioTitle').textContent = title;
    document.getElementById('audioAuthor').textContent = author;

    const coverEl = document.getElementById('audioCover');
    if (cover) {
        coverEl.style.backgroundImage = `url(${cover})`;
        coverEl.textContent = '';
        coverEl.classList.add('has-image');
    } else {
        coverEl.style.backgroundImage = '';
        coverEl.style.background = color;
        coverEl.textContent = title.charAt(0).toUpperCase();
        coverEl.classList.remove('has-image');
    }

    modal.classList.add('active');
    audioCurrentBook = book;

    let fileData = null;
    try {
        fileData = await getBookFile(currentUser.uid, bookId);
    } catch (_) {}

    if (!fileData || !fileData.data) {
        showAlert('Audio fayl topilmadi', 'error');
        closeAudioPlayer();
        return;
    }

    const audio = audioEl();
    if (!audio) return;
    audio.src = fileData.data;
    audio.load();

    document.getElementById('audioDuration').textContent = '0:00';
    document.getElementById('audioCurrentTime').textContent = '0:00';
    document.getElementById('audioProgressBar').style.width = '0%';

    const progress = await getBookProgress(bookId);
    const savedTime = progress?.audioTime || 0;

    const seekHandler = () => {
        if (savedTime > 0 && savedTime < audio.duration) {
            audio.currentTime = savedTime;
            setTimeout(() => {
                showMoveNotification(`${formatTime(savedTime)}dan davom etyapsiz`);
            }, 400);
        }
        audio.removeEventListener('loadedmetadata', seekHandler);
    };
    audio.addEventListener('loadedmetadata', seekHandler);

    setTimeout(() => { audio.play().catch(() => {}); }, 300);
}

function closeAudioPlayer() {
    const modal = document.getElementById('audioPlayerModal');
    if (modal) modal.classList.remove('active');
    const audio = audioEl();
    if (audio) {
        if (audioCurrentBook && audio.currentTime > 0) {
            saveBookProgress(audioCurrentBook.dataset.bookId, {
                audioTime: audio.currentTime
            });
        }
        audio.pause();
        audio.src = '';
    }
    audioCurrentBook = null;
}

function initAudioPlayer() {
    const audio = audioEl();
    if (!audio) return;

    const playBtn = document.getElementById('audioPlayBtn');
    const playIcon = document.getElementById('audioPlayIcon');
    const pauseIcon = document.getElementById('audioPauseIcon');
    const progress = document.getElementById('audioProgress');
    const progressBar = document.getElementById('audioProgressBar');
    const currentTimeEl = document.getElementById('audioCurrentTime');
    const durationEl = document.getElementById('audioDuration');
    const volumeSlider = document.getElementById('audioVolume');
    const speedBtn = document.getElementById('audioSpeedBtn');

    document.getElementById('audioPlayerCloseBtn')?.addEventListener('click', closeAudioPlayer);

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) audio.play().catch(() => {});
            else audio.pause();
        });
    }

    audio.addEventListener('play', () => {
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
    });

    audio.addEventListener('pause', () => {
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
    });

    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });

    let lastSavedTime = 0;
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);

        if (audioCurrentBook && Math.abs(audio.currentTime - lastSavedTime) >= 5) {
            lastSavedTime = audio.currentTime;
            saveBookProgress(audioCurrentBook.dataset.bookId, {
                audioTime: audio.currentTime
            });
        }
    });

    if (progress) {
        progress.addEventListener('click', (e) => {
            const rect = progress.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    }

    document.getElementById('audioRewindBtn')?.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 15);
    });

    document.getElementById('audioForwardBtn')?.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
    });

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = parseFloat(e.target.value);
        });
    }

    document.getElementById('audioMuteBtn')?.addEventListener('click', () => {
        audio.muted = !audio.muted;
        document.getElementById('audioVolumeIcon').style.opacity = audio.muted ? '0.3' : '1';
    });

    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    let speedIdx = 2;
    if (speedBtn) {
        speedBtn.addEventListener('click', () => {
            speedIdx = (speedIdx + 1) % speeds.length;
            audio.playbackRate = speeds[speedIdx];
            speedBtn.textContent = speeds[speedIdx] + '×';
        });
    }

    window.addEventListener('beforeunload', () => {
        if (audioCurrentBook && audio.currentTime > 0) {
            saveBookProgress(audioCurrentBook.dataset.bookId, {
                audioTime: audio.currentTime
            });
        }
    });

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('audioPlayerModal');
        if (!modal?.classList.contains('active')) return;
        if (e.key === ' ' || e.key === 'Space') { e.preventDefault(); playBtn?.click(); }
        if (e.key === 'ArrowLeft') document.getElementById('audioRewindBtn')?.click();
        if (e.key === 'ArrowRight') document.getElementById('audioForwardBtn')?.click();
        if (e.key === 'Escape') closeAudioPlayer();
    });
}

// ================================================
//  PROFIL
// ================================================
function setFieldsDisabled(disabled) {
    ['profileAge', 'profileProfession', 'profileQuote'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.disabled = disabled;
            el.style.opacity = disabled ? '0.6' : '1';
            el.style.cursor = disabled ? 'not-allowed' : 'text';
            el.style.background = disabled ? 'var(--bg-light)' : 'var(--bg-white)';
        }
    });

    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
        if (disabled) {
            editBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Tahrirlash`;
        } else {
            editBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Saqlash`;
        }
    }
}

async function toggleEditProfile() {
    if (isEditing) {
        currentUser.age = document.getElementById('profileAge')?.value || '';
        currentUser.profession = document.getElementById('profileProfession')?.value || '';
        currentUser.quote = document.getElementById('profileQuote')?.value || '';
        await saveUser(currentUser);
        isEditing = false;
        setFieldsDisabled(true);
        showAlert('Profil ma\'lumotlari saqlandi', 'success');
    } else {
        isEditing = true;
        setFieldsDisabled(false);
        document.getElementById('profileAge')?.focus();
    }
}

function loadProfileData() {
    const avatar = document.getElementById('profileAvatar');
    if (avatar) {
        avatar.textContent = currentUser.name.charAt(0).toUpperCase();
        avatar.style.backgroundImage = '';
        if (currentUser.avatar) {
            avatar.style.backgroundImage = `url(${currentUser.avatar})`;
            avatar.textContent = '';
        }
    }
    const nameEl = document.getElementById('profileName');
    if (nameEl) nameEl.textContent = currentUser.name;

    const ageEl = document.getElementById('profileAge');
    if (ageEl) ageEl.value = currentUser.age || '';
    const profEl = document.getElementById('profileProfession');
    if (profEl) profEl.value = currentUser.profession || '';
    const quoteEl = document.getElementById('profileQuote');
    if (quoteEl) quoteEl.value = currentUser.quote || '';

    updateProfileStats();
    if (!isEditing) setFieldsDisabled(true);
}

// ================================================
//  STATISTIKA
// ================================================
function updateStatsDonut() {
    const books = document.querySelectorAll('#libraryPanel .book');
    const total = books.length;
    const read = document.querySelectorAll('#libraryPanel .book[data-status="read"]').length;
    const reading = document.querySelectorAll('#libraryPanel .book[data-status="reading"]').length;
    const unread = document.querySelectorAll('#libraryPanel .book[data-status="unread"]').length;

    const circumference = 2 * Math.PI * 80;

    const readPercent = total > 0 ? (read / total) * 100 : 0;
    const readDash = (readPercent / 100) * circumference;
    const readCircle = document.getElementById('statsReadCircle');
    if (readCircle) {
        readCircle.style.strokeDasharray = `${readDash} ${circumference}`;
        readCircle.style.strokeDashoffset = '0';
        readCircle.style.stroke = '#22c55e';
    }

    const readingPercent = total > 0 ? (reading / total) * 100 : 0;
    const readingDash = (readingPercent / 100) * circumference;
    const readingCircle = document.getElementById('statsReadingCircle');
    if (readingCircle) {
        readingCircle.style.strokeDasharray = `${readingDash} ${circumference}`;
        readingCircle.style.strokeDashoffset = -((readPercent / 100) * circumference);
        readingCircle.style.stroke = '#f39c12';
    }

    const unreadPercent = total > 0 ? (unread / total) * 100 : 0;
    const unreadDash = (unreadPercent / 100) * circumference;
    const unreadCircle = document.getElementById('statsUnreadCircle');
    if (unreadCircle) {
        unreadCircle.style.strokeDasharray = `${unreadDash} ${circumference}`;
        unreadCircle.style.strokeDashoffset = -(((readPercent + readingPercent) / 100) * circumference);
        unreadCircle.style.stroke = '#e74c3c';
    }

    const totalText = document.getElementById('statsTotalText');
    if (totalText) totalText.textContent = total;

    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setTxt('statsReadCount', read);
    setTxt('statsReadingCount', reading);
    setTxt('statsUnreadCount', unread);
    setTxt('statsReadPercent', total > 0 ? Math.round(readPercent) + '%' : '0%');
    setTxt('statsReadingPercent', total > 0 ? Math.round(readingPercent) + '%' : '0%');
    setTxt('statsUnreadPercent', total > 0 ? Math.round(unreadPercent) + '%' : '0%');
}

// ================================================
//  USERS SEARCH (faqat foydalanuvchilar)
// ================================================
function initUsersSearch() {
    const input = document.getElementById('usersSearchInput');
    const clearBtn = document.getElementById('usersSearchClear');
    if (input) {
        input.addEventListener('input', debounce(() => {
            const q = input.value.trim();
            if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';
            filterUsersList(q);
        }, 250));
    }

    if (clearBtn) {
        clearBtn.onclick = () => {
            if (input) input.value = '';
            clearBtn.style.display = 'none';
            filterUsersList('');
        };
    }
}

function filterUsersList(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('#globalUsersList .global-stats-item').forEach(item => {
        const name = item.querySelector('.global-stats-name')?.textContent.toLowerCase() || '';
        item.style.display = (!q || name.includes(q)) ? '' : 'none';
    });
}

// ================================================
//  FOYDALANUVCHILAR
// ================================================
async function renderGlobalUsers() {
    viewingOtherUser = null;
    const container = document.getElementById('globalUsersList');
    if (!container) return;

    try {
        const [usersSnap, mainShelfSnap] = await Promise.all([
            db.ref('users').once('value'),
            db.ref('mainShelf').once('value')
        ]);

        const users = Object.values(usersSnap.val() || {});
        const mainShelf = mainShelfSnap.val() || {};

        const userData = users.map(user => {
            let bookCount = 0;
            const userBooks = mainShelf[user.uid];
            if (userBooks?.books && Array.isArray(userBooks.books)) {
                bookCount = userBooks.books.length;
            }
            return {
                name: user.name,
                uid: user.uid,
                books: bookCount,
                avatar: user.avatar || ''
            };
        });

        userData.sort((a, b) => b.books - a.books);

        if (!userData.length) {
            container.innerHTML = '<div style="text-align:center;padding:40px;color:#7a8a7a;">Foydalanuvchilar yo\'q</div>';
            return;
        }

        container.innerHTML = userData.map((user, index) => `
            <div class="global-stats-item" data-uid="${user.uid}" style="${user.uid === currentUser.uid ? 'background:var(--green-lightest);' : ''}">
                <div class="global-stats-rank">${index + 1}</div>
                <div class="global-stats-avatar" style="${user.avatar ? `background-image:url(${user.avatar});` : ''}">
                    ${user.avatar ? '' : user.name.charAt(0).toUpperCase()}
                </div>
                <div class="global-stats-name">${escapeHtml(user.name)}${user.uid === currentUser.uid ? ' (Siz)' : ''}</div>
                <div class="global-stats-count">${user.books} ta</div>
            </div>
        `).join('');

        container.querySelectorAll('.global-stats-item').forEach(item => {
            item.addEventListener('click', async function() {
                if (this.dataset.uid === currentUser.uid) return;
                await showUserProfile(this.dataset.uid);
            });
        });
    } catch (error) {
        console.error('Foydalanuvchilarni yuklashda xatolik:', error);
    }
}

async function showUserProfile(uid) {
    const userData = await findUserByUid(uid);
    if (!userData) { showAlert('Foydalanuvchi topilmadi', 'error'); return; }

    selectedUser = userData;
    document.querySelectorAll('.panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });

    const panel = document.getElementById('userProfilePanel');
    if (!panel) return;
    panel.classList.add('active');
    panel.style.display = 'flex';
    document.getElementById('headerSearch').style.display = 'none';

    const avatar = document.getElementById('userProfileAvatar');
    if (avatar) {
        avatar.textContent = userData.name.charAt(0).toUpperCase();
        avatar.style.backgroundImage = '';
        if (userData.avatar) {
            avatar.style.backgroundImage = `url(${userData.avatar})`;
            avatar.textContent = '';
        }
    }

    document.getElementById('userProfileName').textContent = userData.name;
    document.getElementById('userProfileAge').textContent = userData.age || '—';
    document.getElementById('userProfileProfession').textContent = userData.profession || '—';
    document.getElementById('userProfileQuote').textContent = userData.quote || '—';

    let bookCount = 0, readCount = 0, readingBooks = [];
    try {
        const snapshot = await db.ref(`mainShelf/${uid}`).once('value');
        const books = snapshot.val()?.books || [];
        bookCount = books.length;
        readCount = books.filter(b => b.status === 'read').length;
        readingBooks = books.filter(b => b.status === 'reading');
    } catch (_) {}

    document.getElementById('userProfileBooks').textContent = bookCount;
    document.getElementById('userProfileRead').textContent = readCount;

    const readingContainer = document.getElementById('userReadingBooks');
    const readingSection = document.getElementById('userReadingSection');

    if (readingContainer && readingSection) {
        if (readingBooks.length > 0) {
            readingSection.style.display = 'block';
            readingContainer.innerHTML = readingBooks.map(book => `
                <div class="user-reading-book" style="border-left-color: ${book.color || '#3d6b3d'}">
                    <span class="user-reading-book-title">${escapeHtml(book.title || 'Nomsiz')}</span>
                    <span class="user-reading-book-author">${escapeHtml(book.author || '')}</span>
                </div>
            `).join('');
        } else {
            readingSection.style.display = 'none';
        }
    }

    document.getElementById('viewUserLibraryBtn').onclick = () => viewOtherLibrary(uid);
    document.getElementById('chatWithUserBtn').onclick = () => {
        if (uid === currentUser.uid) { showAlert('O\'zingiz bilan chatlasha olmaysiz', 'warning'); return; }
        showOtherProfileAndChat(userData);
    };

    updateBottomNav();
}

// ================================================
//  BOSHQA KUTUBXONA
// ================================================
async function viewOtherLibrary(uid) {
    const userData = await findUserByUid(uid);
    if (!userData) return;

    viewingOtherUser = userData;
    document.querySelectorAll('.panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });

    const panel = document.getElementById('otherLibraryPanel');
    if (panel) {
        panel.classList.add('active');
        panel.style.display = 'flex';
        const hs = document.getElementById('headerSearch');
        if (hs) hs.style.display = '';
    }

    document.getElementById('otherLibraryTitle').textContent = `${userData.name}ning kutubxonasi`;

    const goToProfileBtn = document.getElementById('goToProfileBtn');
    if (goToProfileBtn) {
        goToProfileBtn.style.display = 'inline-flex';
        goToProfileBtn.onclick = () => { if (viewingOtherUser) showUserProfile(viewingOtherUser.uid); };
    }

    const backBtn = document.getElementById('backToUserProfileBtn');
    if (backBtn) {
        backBtn.style.display = 'inline-flex';
        backBtn.onclick = () => { if (viewingOtherUser) showUserProfile(viewingOtherUser.uid); };
    }

    const container = document.getElementById('otherShelvesContainer');
    if (!container) return;

    let allBooks = [];
    try {
        const snapshot = await db.ref(`mainShelf/${uid}`).once('value');
        if (snapshot.val()?.books) allBooks = snapshot.val().books;
    } catch (_) {}

    let html = `
        <div class="carousel-wrapper">
            <button class="carousel-arrow prev" onclick="scrollOtherCarousel(-1)" aria-label="Oldingi javon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="carousel-arrow next" onclick="scrollOtherCarousel(1)" aria-label="Keyingi javon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div class="shelves-container" id="otherShelvesCarousel">`;

    for (let shelf = 1; shelf <= 3; shelf++) {
        html += `
        <div class="bookshelf-unit" data-shelf="${shelf}">
            <div class="wooden-bookshelf">
                <div class="shelf-rows">`;
    for (let row = 1; row <= 3; row++) {
        html += `<div class="shelf-row"><div class="shelf-row-books" data-shelf="${shelf}" data-row="${row}"></div></div>`;
        if (row < 3) html += '<div class="shelf-divider"></div>';
        }
        html += `
                    </div>
                    <div class="cabinet">
                        <div class="cabinet-door left"><div class="cabinet-handle"></div></div>
                        <div class="cabinet-door right"><div class="cabinet-handle"></div></div>
                    </div>
                    <div class="shelf-legs"><div class="leg left"></div><div class="leg right"></div></div>
                </div>
            </div>`;
    }

    html += `
            </div>
            <div class="carousel-dots">
                <button class="carousel-dot active" onclick="goToOtherShelf(0)"></button>
                <button class="carousel-dot" onclick="goToOtherShelf(1)"></button>
                <button class="carousel-dot" onclick="goToOtherShelf(2)"></button>
            </div>
        </div>`;

    container.innerHTML = html;

    // Kitoblarni 4 qatorga taqsimlash
    if (allBooks.length) {
        const shelves = container.querySelectorAll('.wooden-bookshelf');
        const grouped = { 1: [], 2: [], 3: [] };
        allBooks.forEach(b => {
            const shelfNum = b.cell ? parseInt(b.cell.split('-')[0]) : 1;
            const target = (shelfNum >= 1 && shelfNum <= 3) ? shelfNum : 1;
            grouped[target].push(b);
        });

        shelves.forEach((shelfEl, idx) => {
            const shelfNum = idx + 1;
            const booksForShelf = grouped[shelfNum] || [];
            booksForShelf.forEach(bookData => {
                const bookElement = createBookElement({
                    ...bookData,
                    status: bookData.status || 'unread',
                    rating: bookData.rating || '0'
                });
                bookElement.onclick = function() { showOtherBookModal(bookData, uid); };
                addBookToShelfWithFlow(shelfEl, bookElement);
            });
        });
    } else {
        const firstRow = container.querySelector('.shelf-row-books');
        if (firstRow) firstRow.innerHTML = '<div style="width:100%;text-align:center;color:rgba(255,220,170,0.6);font-size:0.75rem;padding:8px;">Kitoblar yo\'q</div>';
    }

    updateBottomNav();
}

function scrollOtherCarousel(direction) {
    const container = document.getElementById('otherShelvesCarousel');
    if (!container) return;
    const w = container.querySelector('.bookshelf-unit')?.offsetWidth || window.innerWidth;
    container.scrollTo({ left: container.scrollLeft + (direction * w), behavior: 'smooth' });
    setTimeout(updateOtherCarouselDots, 400);
}

function goToOtherShelf(index) {
    const container = document.getElementById('otherShelvesCarousel');
    if (!container) return;
    const w = container.querySelector('.bookshelf-unit')?.offsetWidth || window.innerWidth;
    container.scrollTo({ left: index * w, behavior: 'smooth' });
    setTimeout(updateOtherCarouselDots, 400);
}

function updateOtherCarouselDots() {
    const container = document.getElementById('otherShelvesCarousel');
    if (!container) return;
    const w = container.querySelector('.bookshelf-unit')?.offsetWidth || window.innerWidth;
    const currentIndex = Math.round(container.scrollLeft / w);
    container.parentElement.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function showOtherBookModal(book, ownerUid) {
    const modal = document.getElementById('bookModal');
    const body = modal?.querySelector('.modal-body');
    if (!modal || !body) return;

    modal.classList.remove('wizard-modal');

    const rating = parseInt(book.rating) || 0;
    const year = book.year || '';
    const genre = book.genre || '';
    const pages = book.pages || '';
    const coverType = book.coverType || 'hard';
    const viewMode = book.viewMode || 'color';
    const fileType = book.fileType || '';
    const externalUrl = book.externalUrl || '';
    const externalSource = book.externalSource || '';

    body.innerHTML = `
        <h3>${escapeHtml(book.title || '')}</h3>
        ${book.cover ? `<div style="text-align:center;margin-bottom:12px;"><img src="${book.cover}" style="max-width:120px;max-height:160px;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,0.15);"></div>` : ''}
        <div class="book-info">
            <p>${ICONS.author} Yozuvchi: ${escapeHtml(book.author || '')}</p>
            ${book.description ? `<p>${ICONS.description} ${escapeHtml(book.description)}</p>` : ''}
            ${year ? `<p>${ICONS.calendar} Chiqarilgan: ${escapeHtml(year)}</p>` : ''}
            ${genre ? `<p>${ICONS.tag} Janr: ${escapeHtml(genre)}</p>` : ''}
            ${pages ? `<p>${ICONS.pages} Betlar: ${escapeHtml(pages)}</p>` : ''}
            <p>${ICONS.bookCover} Muqova: ${coverType === 'hard' ? 'Qattiq' : 'Yumshoq'}</p>
            ${fileType === 'pdf' ? `<p>${ICONS.pdf} PDF format</p>` : ''}
            ${fileType === 'audio' ? `<p>${ICONS.audio} Audio format</p>` : ''}
            ${externalUrl ? `<p>${ICONS.link} Manba: ${externalSource === 'mutolaa' ? 'Mutolaa' : (externalSource === 'google' ? 'Google Books' : 'Boshqa')}</p>` : ''}
        </div>

        <label style="color:#7a8a7a;font-size:12px;">Baho (10 dan)</label>
        <div class="rating-stars rating-stars-10">
            ${[1,2,3,4,5,6,7,8,9,10].map(i => `<span class="rating-star ${i <= rating ? 'active' : ''}" data-rating="${i}">★</span>`).join('')}
        </div>

        <div class="modal-actions">
            ${externalUrl ? `<button class="modal-btn edit" id="openOtherLinkBtn" style="background:linear-gradient(135deg,#0ea5e9,#0369a1);">${ICONS.link} Ochish</button>` : ''}
        </div>
        <div class="modal-actions" style="margin-top:8px;">
            <button class="modal-btn edit" id="addToMyLibraryBtn" style="background:linear-gradient(135deg,#22c55e,#16a34a);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Javonimga olish
            </button>
            <button class="modal-btn" id="closeOtherBookBtn">Yopish</button>
        </div>`;

    document.getElementById('closeOtherBookBtn').onclick = () => modal.classList.remove('active');

    const linkBtn = document.getElementById('openOtherLinkBtn');
    if (linkBtn) {
        linkBtn.onclick = () => window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }

    const addBtn = document.getElementById('addToMyLibraryBtn');
    if (addBtn) {
        addBtn.onclick = async () => {
            await addBookToMyLibrary(book, ownerUid);
            modal.classList.remove('active');
        };
    }

    modal.classList.add('active');
}

async function addBookToMyLibrary(bookData, ownerUid) {
    if (!currentUser) return;
    if (!ownerUid) {
        showAlert('Manba foydalanuvchi topilmadi', 'error');
        return;
    }

    try {
        const newBookId = generateBookId();

        const newBook = {
            bookId: newBookId,
            title: bookData.title,
            author: bookData.author,
            description: bookData.description || '',
            color: bookData.color,
            cover: bookData.cover || '',
            height: bookData.height || BOOK_HEIGHT_DEFAULT,
            width: bookData.width || BOOK_WIDTH_DEFAULT,
            status: 'unread',
            rating: '0',
            coverType: bookData.coverType || 'hard',
            year: bookData.year || '',
            genre: bookData.genre || '',
            pages: bookData.pages || '',
            viewMode: bookData.viewMode || 'color',
            spineImage: bookData.spineImage || '',
            addedFrom: ownerUid,
            originalBookId: bookData.bookId || ''
        };

        if (bookData.fileType) {
            newBook.fileType = bookData.fileType;
            newBook.fileName = bookData.fileName || '';
            newBook.fileMime = bookData.fileMime || '';
        }
        if (bookData.externalUrl) {
            newBook.externalUrl = bookData.externalUrl;
            newBook.externalSource = bookData.externalSource || 'other';
        }

        if (bookData.fileType && bookData.bookId) {
            try {
                const originalFile = await getBookFile(ownerUid, bookData.bookId);
                if (originalFile) {
                    await db.ref(`bookFiles/${currentUser.uid}/${newBookId}`).set({
                        data: originalFile.data,
                        mime: originalFile.mime,
                        name: originalFile.name,
                        createdAt: Date.now()
                    });
                }
            } catch (err) {
                console.error('Faylni nusxalashda xatolik:', err);
            }
        }

        addNewBookData(newBook);
        showAlert(`"${newBook.title}" javoningizga qo'shildi!`, 'success');
    } catch (err) {
        console.error('Qo\'shishda xatolik:', err);
        showAlert('Xatolik: ' + err.message, 'error');
    }
}

// ================================================
//  CHAT — READ/UNREAD
// ================================================
function sendChat() {
    const input = document.getElementById('chatInput');
    if (!input) return;

    const text = input.value.trim();
    if (!text || !chatRef) return;

    chatRef.push({
        from: currentUser.uid,
        fromName: currentUser.name,
        text,
        time: Date.now(),
        read: false
    });

    if (viewingOtherUser) {
        db.ref(`notifications/${viewingOtherUser.uid}`).push({
            from: currentUser.uid,
            fromName: currentUser.name,
            text: text.substring(0, 40),
            time: Date.now(),
            read: false
        });
    }
    input.value = '';

    setTimeout(() => refreshTotalUnreadChats(), 500);
}

async function markChatMessagesAsRead(chatId) {
    if (!currentUser || !chatId) return;
    try {
        const snap = await db.ref(`chats/${chatId}`).once('value');
        const messages = snap.val() || {};
        const updates = {};

        for (const [key, msg] of Object.entries(messages)) {
            if (msg.from !== currentUser.uid && !msg.read) {
                updates[`${key}/read`] = true;
                updates[`${key}/readAt`] = Date.now();
            }
        }

        if (Object.keys(updates).length) {
            await db.ref(`chats/${chatId}`).update(updates);
            await refreshTotalUnreadChats();
        }
    } catch (err) {
        console.error('Mark as read xatosi:', err);
    }
}

function initNotifications() {
    if (!currentUser) return;

    db.ref(`notifications/${currentUser.uid}`).on('value', snapshot => {
        const notifications = snapshot.val() || {};
        const entries = Object.entries(notifications)
            .map(([key, val]) => ({ key, ...val }))
            .sort((a, b) => b.time - a.time);

        const badge = document.getElementById('notificationBadge');
        if (badge) {
            const unread = entries.filter(n => !n.read).length;
            badge.textContent = unread;
            badge.style.display = unread > 0 ? 'flex' : 'none';
        }

        const container = document.getElementById('notificationList');
        if (!container) return;

        if (!entries.length) {
            container.innerHTML = `
                <div class="notification-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                    <div>Bildirishnomalar yo'q</div>
                </div>`;
            return;
        }

        container.innerHTML = entries.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}"
                 data-from="${notification.from}" data-key="${notification.key}">
                <div class="notification-avatar">${(notification.fromName || '?').charAt(0).toUpperCase()}</div>
                <div class="notification-info">
                    <strong>${escapeHtml(notification.fromName || '?')}</strong>
                    <p>${escapeHtml(notification.text)}</p>
                </div>
                <div class="notification-time">${new Date(notification.time).toLocaleTimeString('uz', {hour: '2-digit', minute: '2-digit'})}</div>
            </div>
        `).join('');

        container.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', async function() {
                await db.ref(`notifications/${currentUser.uid}/${this.dataset.key}/read`).set(true);
                document.getElementById('notificationDropdown').style.display = 'none';
                const user = await findUserByUid(this.dataset.from);
                if (user) showOtherProfileAndChat(user);
            });
        });
    });
}

async function renderChatList() {
    const container = document.getElementById('chatsList');
    if (!container) return;

    try {
        const users = await getUsers();
        const otherUsers = [];

        for (const user of users) {
            if (user.uid === currentUser.uid) continue;
            const snapshot = await db.ref(`chats/${getChatId(currentUser.uid, user.uid)}`).once('value');
            const messages = snapshot.val();
            if (messages && Object.keys(messages).length) {
                const last = Object.values(messages).sort((a, b) => b.time - a.time)[0];
                const unreadCount = Object.values(messages).filter(m => m.from !== currentUser.uid && !m.read).length;
                otherUsers.push({ ...user, lastMsg: last, unreadCount });
            }
        }

        if (!otherUsers.length) {
            container.innerHTML = '<div style="text-align:center;padding:40px;color:#7a8a7a;">Suhbatlar yo\'q</div>';
            return;
        }

        otherUsers.sort((a, b) => b.lastMsg.time - a.lastMsg.time);

        container.innerHTML = otherUsers.map(user => `
            <div class="chat-list-item ${user.unreadCount > 0 ? 'has-unread' : ''}" data-uid="${user.uid}">
                <div class="chat-list-avatar">${user.name.charAt(0).toUpperCase()}</div>
                <div class="chat-list-info">
                    <div class="chat-list-name">
                        ${escapeHtml(user.name)}
                        ${user.unreadCount > 0 ? ` <span class="chat-unread-badge">${user.unreadCount}</span>` : ''}
                    </div>
                    <div class="chat-list-last">${user.lastMsg.from === currentUser.uid ? 'Siz: ' : ''}${escapeHtml(user.lastMsg.text.substring(0, 30))}</div>
                </div>
                ${user.unreadCount > 0 ? '<div class="chat-unread-dot"></div>' : ''}
            </div>
        `).join('');

        container.querySelectorAll('.chat-list-item').forEach(item => {
            item.addEventListener('click', async function() {
                const user = await findUserByUid(this.dataset.uid);
                if (user) showOtherProfileAndChat(user);
            });
        });
    } catch (error) {
        console.error('Chatlarni yuklashda xatolik:', error);
    }
}

async function showOtherProfileAndChat(user) {
    document.querySelectorAll('.panel').forEach(panel => { panel.classList.remove('active'); panel.style.display = 'none'; });

    document.getElementById('chatPanel').classList.add('active');
    document.getElementById('chatPanel').style.display = 'block';
    document.getElementById('headerSearch').style.display = 'none';

    viewingOtherUser = user;

    const titleEl = document.getElementById('chatTitle');
    if (titleEl) titleEl.textContent = user.name;

    const chatId = getChatId(currentUser.uid, user.uid);
    chatRef = db.ref(`chats/${chatId}`);

    const messagesContainer = document.getElementById('chatMessages');
    if (messagesContainer) messagesContainer.innerHTML = '<div style="text-align:center;padding:40px;color:#7a8a7a;">Yuklanmoqda...</div>';

    markChatMessagesAsRead(chatId);

    chatRef.off();
    chatRef.on('value', snapshot => {
        const messages = snapshot.val() || {};
        const container = document.getElementById('chatMessages');
        if (!container) return;

        if (!Object.keys(messages).length) {
            container.innerHTML = '<div style="text-align:center;padding:40px;color:#7a8a7a;">Xabarlar yo\'q</div>';
            return;
        }

        container.innerHTML = Object.values(messages)
            .sort((a, b) => a.time - b.time)
            .map(msg => {
                const isMine = msg.from === currentUser.uid;
                let readIndicator = '';
                if (isMine) {
                    readIndicator = msg.read
                        ? '<span class="chat-msg-read read" title="O\'qilgan">✓✓</span>'
                        : '<span class="chat-msg-read unread" title="Yuborilgan">✓</span>';
                }

                return `
                    <div class="chat-msg ${isMine ? 'mine' : 'theirs'}">
                        <div class="chat-msg-text">${escapeHtml(msg.text)}</div>
                        <div class="chat-msg-footer">
                            <span class="chat-msg-time">${new Date(msg.time).toLocaleTimeString('uz', {hour: '2-digit', minute: '2-digit'})}</span>
                            ${readIndicator}
                        </div>
                    </div>
                `;
            }).join('');

        container.scrollTop = container.scrollHeight;
        setTimeout(() => refreshTotalUnreadChats(), 500);
    });

    updateBottomNav();
}

// ================================================
//  DRAG & DROP
// ================================================
function initDragAndDrop() {
    const libraryPanel = document.getElementById('libraryPanel');
    if (!libraryPanel) return;

    libraryPanel.addEventListener('mousedown', function(e) {
        const book = e.target.closest('.book');
        if (!book) return;
        if (document.getElementById('bookModal')?.classList.contains('active')) return;
        if (isMoveMode) return;

        isDragging = false;
        longPressTimer = setTimeout(() => startDragging(book, e.clientX, e.clientY), 400);
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging || !dragClone) return;
        e.preventDefault();
        dragClone.style.left = (e.clientX - 25) + 'px';
        dragClone.style.top = (e.clientY - 35) + 'px';
        highlightRow(getRowUnderPoint(e.clientX, e.clientY));
    });

    document.addEventListener('mouseup', function(e) {
        clearTimeout(longPressTimer);
        if (isDragging && draggedBook) {
            dropBook(draggedBook, getRowUnderPoint(e.clientX, e.clientY));
            stopDragging();
        }
        isDragging = false;
        draggedBook = null;
    });

    libraryPanel.addEventListener('touchstart', function(e) {
        const book = e.target.closest('.book');
        if (!book) return;
        if (document.getElementById('bookModal')?.classList.contains('active')) return;
        if (isMoveMode) return;

        const touch = e.touches[0];
        isDragging = false;
        longPressTimer = setTimeout(() => startDragging(book, touch.clientX, touch.clientY), 500);
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        if (!isDragging || !dragClone) return;
        e.preventDefault();
        const touch = e.touches[0];
        dragClone.style.left = (touch.clientX - 25) + 'px';
        dragClone.style.top = (touch.clientY - 35) + 'px';
        highlightRow(getRowUnderPoint(touch.clientX, touch.clientY));
    }, { passive: false });

    document.addEventListener('touchend', function(e) {
        clearTimeout(longPressTimer);
        if (isDragging && draggedBook) {
            const touch = e.changedTouches[0];
            dropBook(draggedBook, getRowUnderPoint(touch.clientX, touch.clientY));
            stopDragging();
        }
        isDragging = false;
        draggedBook = null;
    });
}

function startDragging(book, x, y) {
    if (isDragging) return;
    isDragging = true;
    draggedBook = book;
    book.style.opacity = '0.5';

    dragClone = book.cloneNode(true);
    dragClone.style.cssText = `
        position:fixed; z-index:9999; pointer-events:none; opacity:0.85;
        left:${x - 25}px; top:${y - 35}px; border-radius:3px;
    `;
    document.body.appendChild(dragClone);
    if (navigator.vibrate) navigator.vibrate(20);
}

function stopDragging() {
    if (draggedBook) draggedBook.style.opacity = '1';
    if (dragClone) { dragClone.remove(); dragClone = null; }
    document.querySelectorAll('.shelf-row.drag-over').forEach(row => row.classList.remove('drag-over'));
    draggedBook = null;
    isDragging = false;
}

function getRowUnderPoint(x, y) {
    const rows = document.querySelectorAll('#libraryPanel .shelf-row');
    for (const row of rows) {
        const rect = row.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return row;
    }
    return null;
}

function highlightRow(row) {
    document.querySelectorAll('.shelf-row.drag-over').forEach(r => r.classList.remove('drag-over'));
    if (row) row.classList.add('drag-over');
}

function dropBook(book, targetRow) {
    if (!book || !targetRow) return;
    const booksContainer = targetRow.querySelector('.shelf-row-books');
    if (!booksContainer) return;

    // Avtomatik flow — sig'masa keyingi qatorga
    const shelfEl = targetRow.closest('.wooden-bookshelf');
    book.remove();

    if (shelfEl) {
        const container = addBookToShelfWithFlow(shelfEl, book);
        if (container) {
            book.dataset.cell = `${container.dataset.shelf}-${container.dataset.row}`;
        }
    }

    saveMainShelf();
    showMoveNotification('Kitob ko\'chirildi');
    cleanupEmptyRows(document.querySelector('#libraryPanel .wooden-bookshelf'));
}

// ================================================
//  KARUSEL
// ================================================
function scrollCarousel(direction) {
    const container = document.getElementById('shelvesCarousel');
    if (!container) return;
    const w = container.querySelector('.bookshelf-unit')?.offsetWidth || window.innerWidth;
    container.scrollTo({ left: container.scrollLeft + (direction * w), behavior: 'smooth' });
    setTimeout(updateCarouselDots, 400);
}

function goToShelf(index) {
    const container = document.getElementById('shelvesCarousel');
    if (!container) return;
    const w = container.querySelector('.bookshelf-unit')?.offsetWidth || window.innerWidth;
    container.scrollTo({ left: index * w, behavior: 'smooth' });
    setTimeout(updateCarouselDots, 400);
}

function updateCarouselDots() {
    const container = document.getElementById('shelvesCarousel');
    if (!container) return;
    const w = container.querySelector('.bookshelf-unit')?.offsetWidth || window.innerWidth;
    const currentIndex = Math.round(container.scrollLeft / w);
    container.parentElement.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// ================================================
//  MOVE MODE
// ================================================
function selectBookForMove(book) {
    if (isMoveMode) { cancelMoveMode(); return; }
    isMoveMode = true;
    selectedBookForMove = book;

    book.style.outline = '3px solid #6fa86f';
    book.style.outlineOffset = '3px';
    book.style.animation = 'pulse 1s infinite';

    document.querySelectorAll('#libraryPanel .shelf-row').forEach(row => {
        row.style.border = '2px dashed rgba(111,168,111,0.6)';
        row.style.cursor = 'pointer';
        row.addEventListener('click', moveBookToRow);
    });

    showMoveNotification('Kitob tanlandi. Yangi joyni bosing');
}

function cancelMoveMode(skipNotification = false) {
    isMoveMode = false;
    if (selectedBookForMove) {
        selectedBookForMove.style.outline = '';
        selectedBookForMove.style.outlineOffset = '';
        selectedBookForMove.style.animation = '';
        selectedBookForMove.style.transform = '';
        selectedBookForMove = null;
    }
    document.querySelectorAll('#libraryPanel .shelf-row').forEach(row => {
        row.style.border = '';
        row.style.cursor = '';
        row.removeEventListener('click', moveBookToRow);
    });
    if (!skipNotification) showMoveNotification('Ko\'chirish bekor qilindi');
}

function moveBookToRow(e) {
    if (!isMoveMode || !selectedBookForMove) return;
    const targetRow = e.currentTarget;
    const shelfEl = targetRow.closest('.wooden-bookshelf');
    const movedBook = selectedBookForMove;
    cancelMoveMode(true);

    movedBook.remove();

    if (shelfEl) {
        const container = addBookToShelfWithFlow(shelfEl, movedBook);
        if (container) {
            movedBook.dataset.cell = `${container.dataset.shelf}-${container.dataset.row}`;
        }
    }

    movedBook.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    movedBook.style.transform = 'translateY(-8px) scale(1.05)';
    setTimeout(() => {
        movedBook.style.transform = '';
        setTimeout(() => { movedBook.style.transition = ''; }, 300);
    }, 300);

    saveMainShelf();
    showMoveNotification('Kitob ko\'chirildi');
}

// ================================================
//  SHARE
// ================================================
function openShareTargetModal() {
    if (!currentUser) return;
    const modal = document.getElementById('shareTargetModal');
    if (!modal) return;

    modal.classList.add('active');

    modal.querySelectorAll('.share-target-btn').forEach(btn => {
        btn.onclick = () => {
            const target = btn.dataset.target;
            modal.classList.remove('active');
            handleShareTarget(target);
        };
    });

    const cancelBtn = document.getElementById('shareTargetCancel');
    if (cancelBtn) cancelBtn.onclick = () => modal.classList.remove('active');

    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
}

function handleShareTarget(target) {
    if (target === 'all') shareLibrary('all');
    else if (target === 'stats') shareStats();
    else if (target.startsWith('shelf')) {
        const num = target.replace('shelf', '');
        shareLibrary(num);
    }
}

function createShareCard(title, subtitle, contentHTML, footerHTML = '') {
    const card = document.createElement('div');
    card.style.cssText = `
        position:fixed; left:-99999px; top:0;
        width:720px; padding:40px;
        background:linear-gradient(135deg, #f8faf5 0%, #e8f0e8 50%, #d4e6d4 100%);
        font-family:'Inter',-apple-system,sans-serif;
        color:#1a2b1a; box-sizing:border-box;
    `;
    card.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:18px;border-bottom:2px solid rgba(61,107,61,0.15);">
            <div style="display:flex;align-items:center;gap:12px;">
                <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
                    <rect x="2" y="2" width="96" height="96" rx="14" fill="white" stroke="#e0d5c0" stroke-width="2"/>
                    <rect x="14" y="28" width="16" height="52" rx="2" fill="#5d3a1a"/>
                    <rect x="34" y="22" width="32" height="58" rx="2" fill="#7a4e2d"/>
                    <rect x="70" y="28" width="16" height="52" rx="2" fill="#5d3a1a"/>
                </svg>
                <div>
                    <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#8b5a2b;line-height:1.1;">OnLibrary</div>
                    <div style="font-size:11px;color:#7a8a7a;">Raqamli kitob javoningiz</div>
                </div>
            </div>
            <div style="text-align:right;">
                <div style="font-size:13px;color:#3d6b3d;font-weight:600;">${escapeHtml(title)}</div>
                <div style="font-size:11px;color:#7a8a7a;">${escapeHtml(subtitle)}</div>
            </div>
        </div>
        ${contentHTML}
        ${footerHTML}
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(61,107,61,0.15);text-align:center;font-size:11px;color:#7a8a7a;">
            onlibrary.app · ${new Date().toLocaleDateString('uz')}
        </div>
    `;
    return card;
}

async function captureWithHtmlToImage(element) {
    try {
        return await htmlToImage.toPng(element, {
            backgroundColor: null,
            pixelRatio: 2,
            cacheBust: true,
            skipFonts: false,
            filter: (node) => {
                if (node.tagName === 'LINK' && node.getAttribute('rel') === 'stylesheet') {
                    const href = node.getAttribute('href') || '';
                    if (
                        href.includes('cdn.jsdelivr.net') ||
                        href.includes('unpkg.com') ||
                        href.includes('cdnjs.cloudflare.com')
                    ) {
                        return false;
                    }
                }
                return true;
            }
        });
    } catch (err) {
        console.error('capture xatosi:', err);
        throw err;
    }
}

async function captureShelf(shelfNum) {
    const source = shelfNum === 'all'
        ? Array.from(document.querySelectorAll('#libraryPanel .wooden-bookshelf'))
        : [document.querySelector(`#libraryPanel #shelfCapture${shelfNum}`)];

    if (!source[0]) return null;

    const isAll = shelfNum === 'all';
    let totalBooks = 0, readCount = 0, readingCount = 0, unreadCount = 0;
    source.forEach(shelfEl => {
        shelfEl.querySelectorAll('.book').forEach(b => {
            totalBooks++;
            const status = b.dataset.status || 'unread';
            if (status === 'read') readCount++;
            else if (status === 'reading') readingCount++;
            else unreadCount++;
        });
    });

    const shelfWidth = 380;
    const shelfHeight = 440;
    const gap = 20;
    const padding = 40;
    const wrapperWidth = isAll
        ? (shelfWidth * source.length) + (gap * (source.length - 1)) + (padding * 2)
        : shelfWidth + (padding * 2);

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position:fixed; left:-99999px; top:0;
        padding:${padding}px ${padding}px 30px;
        background:linear-gradient(135deg, #f8faf5 0%, #e8f0e8 50%, #d4e6d4 100%);
        font-family:'Inter',-apple-system,sans-serif;
        width:${wrapperWidth}px;
        box-sizing:border-box;
    `;

    const header = document.createElement('div');
    header.style.cssText = `display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:18px;border-bottom:2px solid rgba(61,107,61,0.15);`;
    header.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
            <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#8b5a2b;line-height:1.1;">OnLibrary</div>
        </div>
        <div style="text-align:right;">
            <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#3d6b3d;line-height:1;">${totalBooks}</div>
            <div style="font-size:11px;color:#7a8a7a;">ta kitob</div>
        </div>
    `;
    wrapper.appendChild(header);

    const shelvesBox = document.createElement('div');
    shelvesBox.style.cssText = `display:flex;flex-direction:row;gap:${gap}px;align-items:flex-end;justify-content:center;flex-wrap:nowrap;`;

    source.forEach(shelfEl => {
        const clone = shelfEl.cloneNode(true);
        clone.style.maxWidth = 'none';
        clone.style.minWidth = shelfWidth + 'px';
        clone.style.width = shelfWidth + 'px';
        clone.style.height = shelfHeight + 'px';
        clone.style.flex = '0 0 auto';
        clone.style.margin = '0';
        clone.style.boxShadow = '0 25px 50px -15px rgba(0,0,0,0.35)';
        clone.querySelectorAll('.book').forEach(b => {
            b.style.transform = 'none';
            b.style.opacity = '1';
            b.style.transition = 'none';
        });
        shelvesBox.appendChild(clone);
    });
    wrapper.appendChild(shelvesBox);

    const footer = document.createElement('div');
    footer.style.cssText = `display:flex;gap:10px;margin-top:24px;padding-top:18px;border-top:1px solid rgba(61,107,61,0.15);`;
    footer.innerHTML = `
        <div style="flex:1;text-align:center;padding:12px;background:rgba(255,255,255,0.6);border-radius:12px;">
            <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#22c55e;">${readCount}</div>
            <div style="font-size:10px;color:#7a8a7a;text-transform:uppercase;font-weight:600;">O'qilgan</div>
        </div>
        <div style="flex:1;text-align:center;padding:12px;background:rgba(255,255,255,0.6);border-radius:12px;">
            <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#f39c12;">${readingCount}</div>
            <div style="font-size:10px;color:#7a8a7a;text-transform:uppercase;font-weight:600;">O'qilayotgan</div>
        </div>
        <div style="flex:1;text-align:center;padding:12px;background:rgba(255,255,255,0.6);border-radius:12px;">
            <div style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#e74c3c;">${unreadCount}</div>
            <div style="font-size:10px;color:#7a8a7a;text-transform:uppercase;font-weight:600;">O'qilmagan</div>
        </div>
    `;
    wrapper.appendChild(footer);

    document.body.appendChild(wrapper);

    try {
        const dataUrl = await captureWithHtmlToImage(wrapper);
        document.body.removeChild(wrapper);
        return dataUrl;
    } catch (err) {
        document.body.removeChild(wrapper);
        throw err;
    }
}

async function captureStats() {
    const stats = getLibraryStats();
    const name = currentUser?.name || 'Foydalanuvchi';

    const card = createShareCard(
        name + 'ning statistikasi',
        new Date().toLocaleDateString('uz'),
        `
        <div style="text-align:center;padding:20px 0;">
            <div style="font-family:'Playfair Display',serif;font-size:72px;font-weight:700;color:#3d6b3d;line-height:1;">${stats.total}</div>
            <div style="font-size:14px;color:#7a8a7a;margin-top:8px;">Jami kitob</div>
        </div>
        <div style="display:flex;gap:12px;margin-top:8px;">
            <div style="flex:1;text-align:center;padding:20px;background:linear-gradient(135deg,#dcfce7,#bbf7d0);border-radius:14px;">
                <div style="font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#16a34a;">${stats.read}</div>
                <div style="font-size:11px;color:#166534;text-transform:uppercase;font-weight:600;">O'qilgan</div>
                <div style="font-size:12px;color:#16a34a;">${stats.readPercent}%</div>
            </div>
            <div style="flex:1;text-align:center;padding:20px;background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:14px;">
                <div style="font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#d97706;">${stats.reading}</div>
                <div style="font-size:11px;color:#92400e;text-transform:uppercase;font-weight:600;">O'qilayotgan</div>
                <div style="font-size:12px;color:#d97706;">${stats.readingPercent}%</div>
            </div>
            <div style="flex:1;text-align:center;padding:20px;background:linear-gradient(135deg,#fee2e2,#fecaca);border-radius:14px;">
                <div style="font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#dc2626;">${stats.unread}</div>
                <div style="font-size:11px;color:#991b1b;text-transform:uppercase;font-weight:600;">O'qilmagan</div>
                <div style="font-size:12px;color:#dc2626;">${stats.unreadPercent}%</div>
            </div>
        </div>`
    );

    document.body.appendChild(card);
    try {
        const dataUrl = await captureWithHtmlToImage(card);
        document.body.removeChild(card);
        return dataUrl;
    } catch (err) {
        document.body.removeChild(card);
        throw err;
    }
}

function getLibraryStats() {
    const books = document.querySelectorAll('#libraryPanel .book');
    const total = books.length;
    const read = document.querySelectorAll('#libraryPanel .book[data-status="read"]').length;
    const reading = document.querySelectorAll('#libraryPanel .book[data-status="reading"]').length;
    const unread = document.querySelectorAll('#libraryPanel .book[data-status="unread"]').length;
    return {
        total, read, reading, unread,
        readPercent: total ? Math.round((read / total) * 100) : 0,
        readingPercent: total ? Math.round((reading / total) * 100) : 0,
        unreadPercent: total ? Math.round((unread / total) * 100) : 0
    };
}

function getAppBaseUrl() {
    return window.location.origin + window.location.pathname;
}

function buildShareUrl(uid, bookId = null) {
    const base = getAppBaseUrl();
    let url = `${base}?user=${encodeURIComponent(uid)}`;
    if (bookId) url += `&book=${encodeURIComponent(bookId)}`;
    return url;
}

async function shareLibrary(shelfNum = 'all') {
    if (!currentUser) return;
    const modal = document.getElementById('shareModal');
    const imgEl = document.getElementById('sharePreviewImg');
    const loadingEl = document.getElementById('sharePreviewLoading');
    const titleEl = document.getElementById('shareModalTitle');
    if (!modal) return;

    titleEl.textContent = shelfNum === 'all' ? 'Butun kutubxonani ulashish' : `${shelfNum}-javonni ulashish`;
    imgEl.style.display = 'none';
    loadingEl.style.display = 'flex';
    modal.classList.add('active');

    try {
        const dataUrl = await captureShelf(shelfNum);
        if (!dataUrl) throw new Error('Rasm yaratilmadi');

        imgEl.src = dataUrl;
        imgEl.style.display = 'block';
        loadingEl.style.display = 'none';

        const link = buildShareUrl(currentUser.uid);
        const linkInput = document.getElementById('shareLinkInput');
        if (linkInput) linkInput.value = link;

        currentShareData = {
            type: 'library',
            dataUrl,
            filename: `${sanitizeFilename(currentUser.name)}_kutubxona.png`,
            title: `${currentUser.name}ning kutubxonasi`,
            text: `${currentUser.name}ning OnLibrary kutubxonasi!\n\nKo'rish uchun:`,
            url: link
        };
    } catch (err) {
        console.error('Capture xatosi:', err);
        modal.classList.remove('active');
        showAlert('Rasm yaratishda xatolik: ' + err.message, 'error');
    }
}

async function shareStats() {
    if (!currentUser) return;
    const modal = document.getElementById('shareModal');
    const imgEl = document.getElementById('sharePreviewImg');
    const loadingEl = document.getElementById('sharePreviewLoading');
    const titleEl = document.getElementById('shareModalTitle');
    if (!modal) return;

    titleEl.textContent = 'Statistikani ulashish';
    imgEl.style.display = 'none';
    loadingEl.style.display = 'flex';
    modal.classList.add('active');

    try {
        const dataUrl = await captureStats();
        imgEl.src = dataUrl;
        imgEl.style.display = 'block';
        loadingEl.style.display = 'none';

        const stats = getLibraryStats();
        const link = buildShareUrl(currentUser.uid);
        const linkInput = document.getElementById('shareLinkInput');
        if (linkInput) linkInput.value = link;

        currentShareData = {
            type: 'stats',
            dataUrl,
            filename: `${sanitizeFilename(currentUser.name)}_statistika.png`,
            title: `${currentUser.name}ning statistikasi`,
            text: `Mening OnLibrary statistikam:\n- Jami: ${stats.total}\n- O'qilgan: ${stats.read}\n- O'qilayotgan: ${stats.reading}\n- O'qilmagan: ${stats.unread}\n\n`,
            url: link
        };
    } catch (err) {
        console.error('Capture xatosi:', err);
        modal.classList.remove('active');
        showAlert('Rasm yaratishda xatolik: ' + err.message, 'error');
    }
}

function dataURLtoBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
}

function dataURLtoFile(dataUrl, filename) {
    const blob = dataURLtoBlob(dataUrl);
    return new File([blob], filename, { type: blob.type });
}

async function nativeShare() {
    if (!currentShareData) return;

    try {
        const file = dataURLtoFile(currentShareData.dataUrl, currentShareData.filename);
        const sharePayload = {
            title: currentShareData.title,
            text: currentShareData.text,
            url: currentShareData.url
        };

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            sharePayload.files = [file];
        }

        await navigator.share(sharePayload);
        showMoveNotification('Ulashildi');
    } catch (err) {
        if (err.name === 'AbortError') return;
        downloadShareImage();
        showAlert('Rasm yuklab olindi. Uni ilovaga qo\'lda yuboring.', 'info');
    }
}

function shareToTelegram() {
    if (!currentShareData) return;
    const text = encodeURIComponent(currentShareData.text);
    const url = encodeURIComponent(currentShareData.url);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

function shareToWhatsapp() {
    if (!currentShareData) return;
    const text = encodeURIComponent(currentShareData.text + ' ' + currentShareData.url);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

async function shareToInstagram() {
    if (!currentShareData) return;
    downloadShareImage();
    try {
        await navigator.clipboard.writeText(currentShareData.text + '\n' + currentShareData.url);
        showAlert('Rasm yuklab olindi va matn nusxalandi.', 'info', 'Instagram');
    } catch {
        showAlert('Rasm yuklab olindi.', 'info', 'Instagram');
    }
    setTimeout(() => {
        window.open('https://www.instagram.com/', '_blank');
    }, 800);
}

function downloadShareImage() {
    if (!currentShareData?.dataUrl) return;
    const a = document.createElement('a');
    a.href = currentShareData.dataUrl;
    a.download = currentShareData.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showMoveNotification('Rasm yuklab olindi');
}

async function copyShareLink() {
    if (!currentShareData) return;
    const link = currentShareData.url;
    try {
        await navigator.clipboard.writeText(link);
        showMoveNotification('Havola nusxalandi');
    } catch {
        const input = document.getElementById('shareLinkInput');
        if (input) {
            input.select();
            input.setSelectionRange(0, 99999);
            document.execCommand('copy');
            showMoveNotification('Havola nusxalandi');
        }
    }
}

function closeShareModal() {
    const modal = document.getElementById('shareModal');
    if (modal) modal.classList.remove('active');
    const imgEl = document.getElementById('sharePreviewImg');
    if (imgEl) { imgEl.src = ''; imgEl.style.display = 'none'; }
    currentShareData = null;
}

function initShareModal() {
    const closeBtn = document.getElementById('shareModalCloseBtn');
    if (closeBtn) closeBtn.onclick = closeShareModal;

    const modal = document.getElementById('shareModal');
    if (modal) modal.onclick = (e) => { if (e.target === modal) closeShareModal(); };

    document.getElementById('shareNativeBtn')?.addEventListener('click', nativeShare);
    document.getElementById('shareTelegramBtn')?.addEventListener('click', shareToTelegram);
    document.getElementById('shareInstagramBtn')?.addEventListener('click', shareToInstagram);
    document.getElementById('shareWhatsappBtn')?.addEventListener('click', shareToWhatsapp);
    document.getElementById('shareDownloadBtn')?.addEventListener('click', downloadShareImage);
    document.getElementById('shareCopyLinkBtn')?.addEventListener('click', copyShareLink);
    document.getElementById('shareLinkCopyInline')?.addEventListener('click', copyShareLink);
}

// ================================================
//  URL ROUTING
// ================================================
async function handleUrlRouting() {
    if (!currentUser) return;

    const params = new URLSearchParams(window.location.search);
    const userUid = params.get('user');
    const bookId = params.get('book');

    if (!userUid) return;

    if (userUid === currentUser.uid) {
        if (bookId) {
            setTimeout(() => {
                const book = document.querySelector(`#libraryPanel .book[data-book-id="${bookId}"]`);
                if (book) showBookModal(book);
            }, 800);
        }
        history.replaceState(null, '', getAppBaseUrl());
        return;
    }

    showAlert('Sizga ulashilgan kutubxona yuklanmoqda...', 'info', 'Ulashilgan');
    setTimeout(async () => {
        const userData = await findUserByUid(userUid);
        if (!userData) {
            showAlert('Foydalanuvchi topilmadi', 'error');
            history.replaceState(null, '', getAppBaseUrl());
            return;
        }

        if (bookId) {
            try {
                const snap = await db.ref(`mainShelf/${userUid}/books`).once('value');
                const books = snap.val() || [];
                const book = books.find(b => b.bookId === bookId);
                if (book) {
                    await viewOtherLibrary(userUid);
                    setTimeout(() => { showOtherBookModal(book, userUid); }, 600);
                } else {
                    await showUserProfile(userUid);
                }
            } catch (_) {
                await showUserProfile(userUid);
            }
        } else {
            await viewOtherLibrary(userUid);
        }

        history.replaceState(null, '', getAppBaseUrl());
    }, 400);
}

// ================================================
//  APP INIT
// ================================================
function initApp() {
    console.log('OnLibrary v9.0 ishga tushmoqda...');

    initCropModal();
    initShareModal();
    initPdfReader();
    initAudioPlayer();
    initUsersSearch();
    initBooksPanel();

    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.onclick = () => showAuthTab(tab.dataset.tab);
    });

    document.getElementById('loginBtn').onclick = login;
    document.getElementById('registerBtn').onclick = register;
    document.getElementById('googleSignInBtn').onclick = signInWithGoogle;

    document.getElementById('forgotPasswordBtn').onclick = openForgotModal;
    document.getElementById('sendResetCodeBtn').onclick = sendResetCode;
    document.getElementById('confirmResetBtn').onclick = confirmResetPassword;
    document.getElementById('backResetBtn').onclick = backToResetStep1;
    document.getElementById('cancelResetBtn').onclick = closeResetSection;

    document.getElementById('checkVerifyBtn').onclick = checkEmailVerified;
    document.getElementById('resendVerifyBtn').onclick = resendVerificationEmail;
    document.getElementById('cancelVerifyBtn').onclick = cancelVerification;

    document.getElementById('loginPassword')?.addEventListener('keydown', e => { if (e.key === 'Enter') login(); });
    document.getElementById('regPasswordConfirm')?.addEventListener('keydown', e => { if (e.key === 'Enter') register(); });
    document.getElementById('verifyCodeInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') checkEmailVerified(); });
    document.getElementById('resetEmail')?.addEventListener('keydown', e => { if (e.key === 'Enter') sendResetCode(); });
    document.getElementById('resetCodeInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('newPassword')?.focus(); });

    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            const panel = link.dataset.panel;
            if (viewingOtherUser && (panel === 'users' || panel === 'chats')) viewingOtherUser = null;
            showPanel(panel);
            if (window.innerWidth <= 768) closeSidebar();
        });
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const panel = item.dataset.panel;
            if (!panel) return;
            if (viewingOtherUser && (panel === 'users' || panel === 'chats')) viewingOtherUser = null;
            showPanel(panel);
        });
    });

    document.getElementById('searchInput')?.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        const searchType = e.target.dataset.searchType;

        if (searchType === 'users') {
            document.querySelectorAll('#globalUsersList .global-stats-item').forEach(item => {
                const name = item.querySelector('.global-stats-name')?.textContent.toLowerCase() || '';
                item.style.display = (!query || name.includes(query)) ? '' : 'none';
            });
        } else if (searchType === 'adminBooks') {
            document.querySelectorAll('#booksGrid .book-grid-item').forEach(item => {
                const title = item.querySelector('.book-grid-title')?.textContent.toLowerCase() || '';
                item.style.display = (!query || title.includes(query)) ? '' : 'none';
            });
        } else {
            document.querySelectorAll('#libraryPanel .book').forEach(book => {
                const match = book.dataset.title.toLowerCase().includes(query) ||
                              book.dataset.author.toLowerCase().includes(query);
                book.style.display = (!query || match) ? '' : 'none';
            });
        }
    });

    document.getElementById('menuToggle').onclick = toggleSidebar;
    document.getElementById('addBookToShelfBtn').onclick = openAddBookWizard;
    document.getElementById('logoutProfileBtn')?.addEventListener('click', logout);
    document.getElementById('shareProfileBtn')?.addEventListener('click', openShareTargetModal);

    document.getElementById('backToUsersBtn')?.addEventListener('click', () => { selectedUser = null; showPanel('users'); });
    document.getElementById('backToUserProfileBtn')?.addEventListener('click', () => {
        if (viewingOtherUser) showUserProfile(viewingOtherUser.uid);
        else showPanel('users');
    });
    document.getElementById('goToProfileBtn')?.addEventListener('click', () => {
        if (viewingOtherUser) showUserProfile(viewingOtherUser.uid);
    });

    document.getElementById('sendChatBtn')?.addEventListener('click', sendChat);
    document.getElementById('chatInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
    document.getElementById('closeChatBtn')?.addEventListener('click', () => {
        viewingOtherUser = null;
        showPanel('chats');
    });

    document.getElementById('changeAvatarBtn')?.addEventListener('click', () => {
        document.getElementById('profileAvatarInput').click();
    });

    document.getElementById('profileAvatarInput')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        openCropModal(file, 1, 'Avatar qirqish', async (croppedDataUrl) => {
            const avatar = document.getElementById('profileAvatar');
            if (avatar) {
                avatar.style.backgroundImage = `url(${croppedDataUrl})`;
                avatar.textContent = '';
            }
            currentUser.avatar = croppedDataUrl;
            updateSidebarInfo();
            await saveUser(currentUser);
            showMoveNotification('Avatar yangilandi');
        });
    });

    document.getElementById('editProfileBtn')?.addEventListener('click', toggleEditProfile);

    document.getElementById('notificationBtn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('notificationDropdown');
        if (dropdown) dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('clearNotifications')?.addEventListener('click', () => {
        db.ref(`notifications/${currentUser.uid}`).remove();
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('.modal-close')) {
            const modal = e.target.closest('.modal-custom');
            if (modal) modal.classList.remove('active');
            return;
        }
        if (e.target.classList.contains('modal-custom')) {
            e.target.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('notificationDropdown');
        const btn = document.getElementById('notificationBtn');
        if (dropdown && btn && !dropdown.contains(e.target) && !btn.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    window.addEventListener('resize', debounce(() => {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth > 768 && sidebar) {
            sidebar.classList.remove('open');
            sidebar.classList.remove('collapsed');
        }
        updateBottomNav();
    }, 200));

    const carousel = document.getElementById('shelvesCarousel');
    if (carousel) {
        carousel.addEventListener('scroll', debounce(updateCarouselDots, 100));
    }

    initDragAndDrop();
    initMobileAddBook();

    console.log('OnLibrary tayyor');
}

// ================================================
//  FIREBASE INIT
// ================================================
window.addEventListener('load', function() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase yuklanmadi!');
        return;
    }

    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        auth = firebase.auth();
        console.log('Firebase ulandi');

        initApp();

        auth.onAuthStateChanged(async (fbUser) => {
            if (!fbUser) return;
            if (!checkSession()) { await auth.signOut(); return; }

            const isGoogle = fbUser.providerData.some(p => p.providerId === 'google.com');
            if (fbUser.emailVerified || isGoogle) {
                const mainApp = document.getElementById('mainApp');
                if (mainApp && mainApp.style.display !== 'flex') {
                    await completeLogin(fbUser, false);
                }
            } else {
                const authSec = document.getElementById('authSection');
                if (authSec && authSec.style.display !== 'none') {
                    pendingUser = {
                        email: fbUser.email,
                        name: fbUser.displayName || fbUser.email.split('@')[0],
                        alreadyRegistered: true
                    };
                    showVerifyScreen(fbUser.email);
                }
            }
        });
    } catch (error) {
        console.error('Firebase xatosi:', error);
    }
});

// Global funksiyalar
window.scrollCarousel = scrollCarousel;
window.goToShelf = goToShelf;
window.scrollOtherCarousel = scrollOtherCarousel;
window.goToOtherShelf = goToOtherShelf;

console.log('OnLibrary — Versiya 9.0 (Admin Library + 4 Qator + 10 O\'lcham + Progress)');