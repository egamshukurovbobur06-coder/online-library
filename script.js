const API_URL = 'http://localhost:3000/api';

let currentUser = null;

// Tab almashtirish
function showTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(btn => btn.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabs[0].classList.add('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabs[1].classList.add('active');
    }
    
    hideMessage();
}

// Login metodini almashtirish
function showLoginMethod(method) {
    const emailLogin = document.getElementById('emailLogin');
    const nameLogin = document.getElementById('nameLogin');
    
    if (method === 'email') {
        emailLogin.style.display = 'block';
        nameLogin.style.display = 'none';
    } else {
        emailLogin.style.display = 'none';
        nameLogin.style.display = 'block';
    }
    
    hideMessage();
}

// Email bilan kirish
async function loginWithEmail() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showMessage('Iltimos, email va parolni kiriting', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/login/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            loginSuccess(data.user);
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('Serverga ulanishda xatolik', 'error');
    }
}

// Ism bilan kirish
async function loginWithName() {
    const firstName = document.getElementById('loginName').value;
    
    if (!firstName) {
        showMessage('Iltimos, ismingizni kiriting', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/login/name`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            loginSuccess(data.user);
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('Serverga ulanishda xatolik', 'error');
    }
}

// Ro'yxatdan o'tish
async function register() {
    const firstName = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    
    if (!firstName || !email || !password) {
        showMessage('Barcha maydonlarni to\'ldiring', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showMessage('Parollar mos kelmadi', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Parol kamida 6 ta belgidan iborat bo\'lishi kerak', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Ro\'yxatdan o\'tish muvaffaqiyatli! Endi kiring', 'success');
            setTimeout(() => showTab('login'), 1500);
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('Serverga ulanishda xatolik', 'error');
    }
}

// Muvaffaqiyatli kirish
function loginSuccess(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('mainSection').style.display = 'block';
    
    document.getElementById('userName').textContent = user.firstName;
    
    // Javonlarni yuklash
    loadShelves();
}

// Chiqish
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('mainSection').style.display = 'none';
    
    document.querySelectorAll('.input').forEach(input => input.value = '');
    showTab('login');
    showLoginMethod('email');
}

// Xabar ko'rsatish
function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = 'message ' + type;
}

// Xabarni yashirish
function hideMessage() {
    const message = document.getElementById('message');
    message.className = 'message';
}

// Sahifa yuklanganda
window.onload = function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        loginSuccess(JSON.parse(savedUser));
    }
};

// ============ JAVON VA KITOB FUNKSIYALARI ============
let shelfCount = 0;
const MAX_SHELVES = 3;
const bookColors = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', 
    '#1abc9c', '#e67e22', '#2c3e50', '#c0392b', '#16a085',
    '#8e44ad', '#d35400', '#27ae60', '#2980b9', '#f1c40f',
    '#7f8c8d', '#e91e63', '#ff5722', '#009688', '#795548'
];

// Modal yaratish
function createModal(title, content, onSave) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <h4>${title}</h4>
            ${content}
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeModal()">Bekor qilish</button>
                <button class="btn-save" id="modalSaveBtn">Saqlash</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('modalSaveBtn').addEventListener('click', () => {
        onSave();
        closeModal();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

// Javon qo'shish
function addShelf() {
    if (shelfCount >= MAX_SHELVES) {
        alert(`Maksimum ${MAX_SHELVES} ta javon qo'sha olasiz!`);
        return;
    }
    
    createModal(
        'Yangi javon qo\'shish',
        '<input type="text" id="shelfNameInput" class="input" placeholder="Javon nomini kiriting" value="Yangi javon">',
        () => {
            const name = document.getElementById('shelfNameInput').value || 'Yangi javon';
            createShelf(name);
        }
    );
}

// Javon yaratish
function createShelf(name) {
    shelfCount++;
    const shelfId = Date.now();
    
    const shelvesContainer = document.getElementById('shelvesContainer');
    
    const emptyState = shelvesContainer.querySelector('.empty-shelves');
    if (emptyState) emptyState.remove();
    
    const shelfDiv = document.createElement('div');
    shelfDiv.className = 'shelf';
    shelfDiv.id = `shelf-${shelfId}`;
    shelfDiv.innerHTML = `
        <div class="shelf-label-container">
            <div class="shelf-label" id="shelfName-${shelfId}">${name}</div>
            <div class="shelf-actions">
                <button class="btn-add-book" onclick="addBook(${shelfId})">+ Kitob</button>
                <button class="btn-rename-shelf" onclick="renameShelf(${shelfId})">✏️</button>
                <button class="btn-delete-shelf" onclick="deleteShelf(${shelfId})">🗑️</button>
            </div>
        </div>
        <div class="books-row" id="books-${shelfId}"></div>
        <div class="shelf-board"></div>
    `;
    
    shelvesContainer.appendChild(shelfDiv);
    updateAddShelfButton();
    saveShelves();
}

// Javon nomini o'zgartirish
function renameShelf(shelfId) {
    const currentName = document.getElementById(`shelfName-${shelfId}`).textContent;
    
    createModal(
        'Javon nomini o\'zgartirish',
        '<input type="text" id="renameInput" class="input" placeholder="Yangi nom" value="' + currentName + '">',
        () => {
            const newName = document.getElementById('renameInput').value;
            if (newName) {
                document.getElementById(`shelfName-${shelfId}`).textContent = newName;
                saveShelves();
            }
        }
    );
}

// Javon o'chirish
function deleteShelf(shelfId) {
    if (confirm('Bu javonni o\'chirmoqchimisiz?')) {
        const shelf = document.getElementById(`shelf-${shelfId}`);
        shelf.remove();
        shelfCount--;
        saveShelves();
        updateAddShelfButton();
        
        const shelvesContainer = document.getElementById('shelvesContainer');
        if (shelvesContainer.children.length === 0) {
            shelvesContainer.innerHTML = '<div class="empty-shelves">Hali javonlar yo\'q. "+ Javon qo\'shish" tugmasini bosing.</div>';
        }
    }
}

// Kitob qo'shish
function addBook(shelfId) {
    let selectedColor = bookColors[Math.floor(Math.random() * bookColors.length)];
    
    const colorOptions = bookColors.map(color => 
        `<div class="color-option" style="background: ${color};" onclick="selectColor(this, '${color}')" data-color="${color}"></div>`
    ).join('');
    
    createModal(
        'Yangi kitob qo\'shish',
        `
        <input type="text" id="bookTitleInput" class="input" placeholder="Kitob nomi *">
        <input type="text" id="bookAuthorInput" class="input" placeholder="Yozuvchi" style="margin-top: 10px;">
        <textarea id="bookDescInput" class="input" placeholder="Kitob haqida qisqacha..." style="height: 80px; resize: vertical; margin-top: 10px;"></textarea>
        <label style="display: block; margin-top: 10px; font-weight: 600;">Kitob rangi:</label>
        <div class="book-colors">${colorOptions}</div>
        <input type="hidden" id="selectedColor" value="${selectedColor}">
        `,
        () => {
            const title = document.getElementById('bookTitleInput').value;
            if (!title) {
                alert('Iltimos, kitob nomini kiriting!');
                return;
            }
            const author = document.getElementById('bookAuthorInput').value || 'Noma\'lum';
            const description = document.getElementById('bookDescInput').value || '';
            const color = document.getElementById('selectedColor').value;
            createBook(shelfId, title, author, description, color);
        }
    );
    
    setTimeout(() => {
        const firstColor = document.querySelector('.color-option');
        if (firstColor) firstColor.classList.add('selected');
    }, 100);
}

// Rang tanlash
function selectColor(element, color) {
    document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById('selectedColor').value = color;
}

// Rang yorqinligini hisoblash
function getTextColor(hexColor) {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'dark' : 'white';
}

// Kitob yaratish
function createBook(shelfId, title, author, description, color) {
    const booksRow = document.getElementById(`books-${shelfId}`);
    const height = Math.floor(Math.random() * 40) + 150;
    
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.style.height = height + 'px';
    bookDiv.style.background = color;
    bookDiv.title = title;
    
    // Nom uzunligiga qarab shrift o'lchamini hisoblash
    const fontSize = calculateFontSize(title);
    bookDiv.style.setProperty('--book-font-size', fontSize + 'px');
    
    const textColor = getTextColor(color);
    bookDiv.dataset.textColor = textColor;
    bookDiv.dataset.title = title;
    bookDiv.dataset.author = author;
    bookDiv.dataset.description = description;
    bookDiv.dataset.color = color;
    bookDiv.dataset.fontSize = fontSize;
    
    bookDiv.onclick = function() { viewBook(this); };
    
    const bookCount = booksRow.children.length;
    if (bookCount > 0 && bookCount % 5 === 0) {
        bookDiv.classList.add('tilted');
    }
    
    booksRow.appendChild(bookDiv);
    saveShelves();
}

// Shrift o'lchamini hisoblash
function calculateFontSize(title) {
    const len = title.length;
    if (len <= 5) return 14;
    if (len <= 10) return 12;
    if (len <= 15) return 10;
    if (len <= 20) return 9;
    if (len <= 30) return 8;
    return 7;
}

// Kitobni ko'rish
function viewBook(bookElement) {
    const title = bookElement.dataset.title;
    const author = bookElement.dataset.author;
    const description = bookElement.dataset.description;
    const color = bookElement.dataset.color;
    
    const existingModal = document.querySelector('.book-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'book-modal show';
    
    modal.innerHTML = `
        <div class="book-modal-content" style="border-left: 8px solid ${color}">
            <button class="book-modal-close" onclick="closeBookModal()">✕</button>
            <div class="book-cover" style="background: ${color};">
                <div class="book-cover-icon">📖</div>
                <div class="book-cover-title">${title}</div>
            </div>
            <div class="book-details">
                <h2 class="book-title">${title}</h2>
                <div class="book-info-item">
                    <span class="book-info-label">✍️ Yozuvchi:</span>
                    <span class="book-info-value">${author}</span>
                </div>
                <div class="book-info-item">
                    <span class="book-info-label">🎨 Rangi:</span>
                    <span class="book-color-badge" style="background: ${color};"></span>
                </div>
                ${description ? `
                <div class="book-description">
                    <h4>📝 Kitob haqida:</h4>
                    <p>${description}</p>
                </div>
                ` : '<p style="color: #999; font-style: italic;">Qo\'shimcha ma\'lumot yo\'q</p>'}
                <div class="book-modal-actions">
                    <button class="btn-edit-book" onclick="editBook(this)" data-title="${title}" data-author="${author}" data-desc="${description}" data-color="${color}">✏️ Tahrirlash</button>
                    <button class="btn-delete-book" onclick="deleteBook(this)">🗑️ O'chirish</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeBookModal();
    });
}

// Kitob modalini yopish
function closeBookModal() {
    const modal = document.querySelector('.book-modal');
    if (modal) modal.remove();
}

// Kitobni tahrirlash
function editBook(button) {
    const title = button.dataset.title;
    const author = button.dataset.author;
    const description = button.dataset.desc;
    const color = button.dataset.color;
    
    closeBookModal();
    
    const colorOptions = bookColors.map(c => 
        `<div class="color-option ${c === color ? 'selected' : ''}" style="background: ${c};" onclick="selectColor(this, '${c}')" data-color="${c}"></div>`
    ).join('');
    
    createModal(
        'Kitobni tahrirlash',
        `
        <input type="text" id="editTitle" class="input" placeholder="Kitob nomi" value="${title}">
        <input type="text" id="editAuthor" class="input" placeholder="Yozuvchi" value="${author}" style="margin-top: 10px;">
        <textarea id="editDesc" class="input" placeholder="Kitob haqida..." style="height: 80px; resize: vertical; margin-top: 10px;">${description}</textarea>
        <label style="display: block; margin-top: 10px; font-weight: 600;">Kitob rangi:</label>
        <div class="book-colors">${colorOptions}</div>
        <input type="hidden" id="editColor" value="${color}">
        `,
        () => {
            const newTitle = document.getElementById('editTitle').value;
            const newAuthor = document.getElementById('editAuthor').value;
            const newDesc = document.getElementById('editDesc').value;
            const newColor = document.getElementById('editColor').value;
            
            const books = document.querySelectorAll('.book');
            let targetBook = null;
            books.forEach(book => {
                if (book.dataset.title === title && book.dataset.author === author) {
                    targetBook = book;
                }
            });
            
            if (targetBook) {
                targetBook.dataset.title = newTitle;
                targetBook.dataset.author = newAuthor;
                targetBook.dataset.description = newDesc;
                targetBook.dataset.color = newColor;
                targetBook.style.background = newColor;
                targetBook.title = newTitle;
                
                const textColor = getTextColor(newColor);
                targetBook.dataset.textColor = textColor;
                saveShelves();
            }
        }
    );
    
    setTimeout(() => {
        const selected = document.querySelector('.color-option.selected');
        if (!selected) {
            const first = document.querySelector('.color-option');
            if (first) first.classList.add('selected');
        }
    }, 100);
}

// Kitobni o'chirish
function deleteBook(button) {
    if (confirm('Bu kitobni o\'chirmoqchimisiz?')) {
        const title = button.dataset.title;
        const author = button.dataset.author;
        
        const books = document.querySelectorAll('.book');
        books.forEach(book => {
            if (book.dataset.title === title && book.dataset.author === author) {
                book.remove();
            }
        });
        
        saveShelves();
        closeBookModal();
    }
}

// Javon qo'shish tugmasini yangilash
function updateAddShelfButton() {
    const btn = document.getElementById('addShelfBtn');
    if (shelfCount >= MAX_SHELVES) {
        btn.disabled = true;
        btn.textContent = '✅ Maksimum';
    } else {
        btn.disabled = false;
        btn.textContent = '+ Javon qo\'shish';
    }
}

// ============ MA'LUMOTLARNI SAQLASH ============

// Javonlarni saqlash
function saveShelves() {
    const shelves = [];
    const shelfElements = document.querySelectorAll('.shelf');
    
    shelfElements.forEach(shelfEl => {
        const shelfId = shelfEl.id.replace('shelf-', '');
        const name = shelfEl.querySelector('.shelf-label').textContent;
        const books = [];
        
        const bookElements = shelfEl.querySelectorAll('.book');
        bookElements.forEach(bookEl => {
            books.push({
                title: bookEl.dataset.title,
                author: bookEl.dataset.author,
                description: bookEl.dataset.description,
                color: bookEl.dataset.color,
                textColor: bookEl.dataset.textColor,
                height: bookEl.style.height,
                tilted: bookEl.classList.contains('tilted')
            });
        });
        
        shelves.push({ id: shelfId, name, books });
    });
    
    localStorage.setItem('libraryShelves', JSON.stringify(shelves));
    localStorage.setItem('shelfCount', shelfCount);
}

// Javonlarni yuklash
function loadShelves() {
    setTimeout(() => {
        const savedShelves = localStorage.getItem('libraryShelves');
        const savedCount = localStorage.getItem('shelfCount');
        
        const shelvesContainer = document.getElementById('shelvesContainer');
        
        // Agar shelvesContainer topilmasa, qaytish
        if (!shelvesContainer) {
            console.error('Xatolik: shelvesContainer elementi topilmadi!');
            return;
        }
        
        if (savedShelves && savedShelves.length > 2) {
            const shelves = JSON.parse(savedShelves);
            shelfCount = parseInt(savedCount) || 0;
            
            shelvesContainer.innerHTML = '';
            
            if (shelves.length === 0) {
                shelvesContainer.innerHTML = '<div class="empty-shelves">Hali javonlar yo\'q. "+ Javon qo\'shish" tugmasini bosing.</div>';
            } else {
                shelves.forEach(shelfData => {
                    restoreShelf(shelfData);
                });
            }
            
            updateAddShelfButton();
        } else {
            // Birinchi marta yuklanganda bo'sh holat
            shelvesContainer.innerHTML = '<div class="empty-shelves">Hali javonlar yo\'q. "+ Javon qo\'shish" tugmasini bosing.</div>';
        }
    }, 500);
}

// Javonni qayta yaratish
function restoreShelf(shelfData) {
    const shelvesContainer = document.getElementById('shelvesContainer');
    
    const emptyState = shelvesContainer.querySelector('.empty-shelves');
    if (emptyState) emptyState.remove();
    
    const shelfDiv = document.createElement('div');
    shelfDiv.className = 'shelf';
    shelfDiv.id = `shelf-${shelfData.id}`;
    shelfDiv.innerHTML = `
        <div class="shelf-label-container">
            <div class="shelf-label" id="shelfName-${shelfData.id}">${shelfData.name}</div>
            <div class="shelf-actions">
                <button class="btn-add-book" onclick="addBook(${shelfData.id})">+ Kitob</button>
                <button class="btn-rename-shelf" onclick="renameShelf(${shelfData.id})">✏️</button>
                <button class="btn-delete-shelf" onclick="deleteShelf(${shelfData.id})">🗑️</button>
            </div>
        </div>
        <div class="books-row" id="books-${shelfData.id}"></div>
        <div class="shelf-board"></div>
    `;
    
    shelvesContainer.appendChild(shelfDiv);
    
    // Kitoblarni qo'shish
    const booksRow = document.getElementById(`books-${shelfData.id}`);
    shelfData.books.forEach(bookData => {
        restoreBook(booksRow, bookData);
    });
}

// Kitobni qayta yaratish
function restoreBook(booksRow, bookData) {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    if (bookData.tilted) bookDiv.classList.add('tilted');
    bookDiv.style.height = bookData.height;
    bookDiv.style.background = bookData.color;
    bookDiv.title = bookData.title;
    bookDiv.dataset.title = bookData.title;
    bookDiv.dataset.author = bookData.author;
    bookDiv.dataset.description = bookData.description;
    bookDiv.dataset.color = bookData.color;
    bookDiv.dataset.textColor = bookData.textColor;
    
    // Shrift o'lchamini tiklash
    const fontSize = bookData.fontSize || calculateFontSize(bookData.title);
    bookDiv.dataset.fontSize = fontSize;
    bookDiv.style.setProperty('--book-font-size', fontSize + 'px');
    
    bookDiv.onclick = function() { viewBook(this); };
    
    booksRow.appendChild(bookDiv);
}

// Muvaffaqiyatli kirish
function loginSuccess(user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('mainSection').style.display = 'block';
    
    document.getElementById('headerLibraryName').textContent = user.firstName + 'ning kutubxonasi';
    
    loadTheme();
    loadShelves();
}
// ============ MAVZU TANLASH ============
const themes = {
    classic: {
        name: 'Klassik',
        leftWall: 'linear-gradient(180deg, #d4c4a8 0%, #c4b494 100%)',
        rightWall: 'linear-gradient(180deg, #d4c4a8 0%, #c4b494 100%)',
        headerBg: 'linear-gradient(135deg, #5D3A1A 0%, #8B6914 100%)',
        bodyBg: '#f0e6d3',
        shelfBoard: 'linear-gradient(180deg, #8B6914 0%, #5D3A1A 100%)',
        shelfBoardAfter: '#3E2723',
        shelfBg: 'rgba(139, 105, 20, 0.1)',
        booksRowBg: 'rgba(139, 105, 20, 0.05)',
        label: 'Klassik'
    },
    dark: {
        name: 'Dark',
        leftWall: 'linear-gradient(180deg, #34495e 0%, #2c3e50 100%)',
        rightWall: 'linear-gradient(180deg, #34495e 0%, #2c3e50 100%)',
        headerBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        bodyBg: '#1a1a2e',
        shelfBoard: 'linear-gradient(180deg, #555 0%, #333 100%)',
        shelfBoardAfter: '#222',
        shelfBg: 'rgba(255,255,255,0.05)',
        booksRowBg: 'rgba(255,255,255,0.03)',
        label: 'Dark'
    },
    warm: {
        name: 'Issiq',
        leftWall: 'linear-gradient(180deg, #f5cba7 0%, #e8b591 100%)',
        rightWall: 'linear-gradient(180deg, #f5cba7 0%, #e8b591 100%)',
        headerBg: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)',
        bodyBg: '#fdebd0',
        shelfBoard: 'linear-gradient(180deg, #a0522d 0%, #6b3a2a 100%)',
        shelfBoardAfter: '#4a2518',
        shelfBg: 'rgba(160, 82, 45, 0.1)',
        booksRowBg: 'rgba(160, 82, 45, 0.05)',
        label: 'Issiq'
    },
    ocean: {
        name: 'Okean',
        leftWall: 'linear-gradient(180deg, #a9cce3 0%, #7fb3d8 100%)',
        rightWall: 'linear-gradient(180deg, #a9cce3 0%, #7fb3d8 100%)',
        headerBg: 'linear-gradient(135deg, #1a5276 0%, #2980b9 100%)',
        bodyBg: '#d6eaf8',
        shelfBoard: 'linear-gradient(180deg, #5d8aa8 0%, #3a5f7a 100%)',
        shelfBoardAfter: '#2c4659',
        shelfBg: 'rgba(93, 138, 168, 0.1)',
        booksRowBg: 'rgba(93, 138, 168, 0.05)',
        label: 'Okean'
    },
        dove: {
        name: '🕊️ ',
        leftWall: 'linear-gradient(180deg, #f5f0ff 0%, #e8d5f5 100%)',
        rightWall: 'linear-gradient(180deg, #f5f0ff 0%, #e8d5f5 100%)',
        headerBg: 'linear-gradient(135deg, #9b59b6 0%, #e91e90 100%)',
        bodyBg: '#fdf2f8',
        shelfBoard: 'linear-gradient(180deg, #c39bd3 0%, #9b59b6 100%)',
        shelfBoardAfter: '#7d3c98',
        shelfBg: 'rgba(155, 89, 182, 0.1)',
        booksRowBg: 'rgba(233, 30, 144, 0.05)',
        label: '🕊️'
    }
};

function showThemeModal() {
    const currentTheme = localStorage.getItem('libraryTheme') || 'classic';
    
    let optionsHTML = '';
    for (const [key, theme] of Object.entries(themes)) {
        optionsHTML += `
            <div class="theme-option theme-${key} ${currentTheme === key ? 'active' : ''}" 
                 onclick="applyTheme('${key}')">
                ${theme.name}
            </div>
        `;
    }
    
    createModal(
        '🎨 Xona mavzusini tanlang',
        `<div class="theme-options">${optionsHTML}</div>`,
        () => {} // Saqlash tugmasi kerak emas
    );
    
    // Saqlash tugmasini yashirish
    document.querySelector('.modal-actions').style.display = 'none';
}

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    // CSS o'zgaruvchilar orqali qo'llash
    const root = document.documentElement;
    
    document.querySelector('.left-wall').style.background = theme.leftWall;
    document.querySelector('.right-wall').style.background = theme.rightWall;
    document.querySelector('.header').style.background = theme.headerBg;
    document.body.style.background = theme.bodyBg;
    
     // Icon o'zgartirish
    const headerIcon = document.getElementById('headerIcon');
    if (headerIcon) {
        if (themeName === 'dove') {
            headerIcon.textContent = '🕊️';
        } else {
            headerIcon.textContent = '📚';
        }
    }
    
    
    // Javon taxtalari
    document.querySelectorAll('.shelf-board').forEach(board => {
        board.style.background = theme.shelfBoard;
    });
    
    // Saqlash
    localStorage.setItem('libraryTheme', themeName);
    
    // Modalni yopish
    closeModal();
    
    // Yangi theme-option active qilish
    document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
    const activeOption = document.querySelector(`.theme-${themeName}`);
    if (activeOption) activeOption.classList.add('active');
}

// Sahifa yuklanganda mavzuni qo'llash
function loadTheme() {
    const savedTheme = localStorage.getItem('libraryTheme') || 'classic';
    applyThemeStyles(savedTheme);
}

function applyThemeStyles(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    document.querySelector('.left-wall').style.background = theme.leftWall;
    document.querySelector('.right-wall').style.background = theme.rightWall;
    document.querySelector('.header').style.background = theme.headerBg;
    document.body.style.background = theme.bodyBg;
    
    document.querySelectorAll('.shelf-board').forEach(board => {
        board.style.background = theme.shelfBoard;
    });
}
