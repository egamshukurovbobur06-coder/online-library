const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Fayldan foydalanuvchilarni o'qish
function readUsers() {
    try {
        if (!fs.existsSync(USERS_FILE)) {
            fs.writeFileSync(USERS_FILE, '[]');
            return [];
        }
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Faylga foydalanuvchilarni yozish
function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Ro'yxatdan o'tish
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, email, password } = req.body;

        if (!firstName || !email || !password) {
            return res.status(400).json({ error: 'Barcha maydonlarni to\'ldiring' });
        }

        const users = readUsers();
        
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now().toString(),
            firstName,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        writeUsers(users);

        res.status(201).json({
            message: 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz',
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server xatoligi' });
    }
});

// Email va parol bilan kirish
app.post('/api/login/email', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email va parolni kiriting' });
        }

        const users = readUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Noto\'g\'ri email yoki parol' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Noto\'g\'ri email yoki parol' });
        }

        res.json({
            message: 'Muvaffaqiyatli kirdingiz',
            user: {
                id: user.id,
                firstName: user.firstName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server xatoligi' });
    }
});

// Ism bilan kirish
app.post('/api/login/name', async (req, res) => {
    try {
        const { firstName } = req.body;

        if (!firstName) {
            return res.status(400).json({ error: 'Ismni kiriting' });
        }

        const users = readUsers();
        const user = users.find(u => u.firstName.toLowerCase() === firstName.toLowerCase());

        if (!user) {
            return res.status(404).json({ error: 'Bu ism bilan foydalanuvchi topilmadi' });
        }

        res.json({
            message: 'Muvaffaqiyatli kirdingiz',
            user: {
                id: user.id,
                firstName: user.firstName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server xatoligi' });
    }
});

// Foydalanuvchi ma'lumotlarini olish
app.get('/api/user/profile', (req, res) => {
    const { id } = req.query;
    const users = readUsers();
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    }

    res.json({
        user: {
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            createdAt: user.createdAt
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} da ishlamoqda`);
});