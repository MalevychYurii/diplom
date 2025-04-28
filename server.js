require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const nodemailer = require("nodemailer");
const { Sequelize, DataTypes } = require("sequelize");

const PORT = process.env.PORT || 3000;

// Налаштування CORS
const corsOptions = {
    origin: 'https://diplom-0101.onrender.com',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
};

// Підключення до бази PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// ===== Middleware =====
app.use(cors({
    origin: true,            // дозволяє будь-який фронтенд, що звертається
    credentials: true,       // якщо ви відправляєте куки або авторизацію
}));
app.options('*', cors());  // аналогічно для preflight-запитів
app.use(express.json());

// ===== Модель користувача =====
const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// ====== API ======

// Реєстрація користувача
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Всі поля обов'язкові!" });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Користувач з таким email вже існує." });
        }

        const newUser = await User.create({ username, email, password });
        res.status(200).json({ message: "Реєстрація успішна!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Помилка сервера" });
    }
});

// Логін користувача
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Всі поля обов'язкові!" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(400).json({ error: "Невірний email або пароль." });
        }

        res.status(200).json({ message: "Успішний логін!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Помилка сервера" });
    }
});

// Отримання всіх користувачів
app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Помилка сервера" });
    }
});

// Видалення користувача
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Користувача не знайдено" });
        }

        await user.destroy();
        res.status(200).json({ message: "Користувача успішно видалено" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Помилка сервера" });
    }
});

// Відправка повідомлення з форми
app.post("/send-message", async (req, res) => {
    const { name, email, phone, topic, message } = req.body;
    if (!name || !email || !phone || !topic || !message) {
        return res.status(400).json({ error: "Всі поля обов'язкові!" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "testfordiplom2025@gmail.com",
            subject: `Нове повідомлення від ${name}`,
            text: `Ім'я: ${name}\nEmail: ${email}\nТелефон: ${phone}\nТема: ${topic}\nПовідомлення: ${message}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Повідомлення надіслано успішно!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Помилка сервера" });
    }
});

// ====== Статичні файли (після всіх API) ======
app.use(express.static(path.join(__dirname, 'public')));

// ====== Фронтенд для всіх інших маршрутів ======
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ====== Запуск сервера ======
sequelize.sync()
    .then(() => {
        console.log("Таблиця користувачів створена або вже існує.");
        app.listen(PORT, () => {
            console.log(`Сервер працює на порту ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Не вдалося синхронізувати з базою даних:", error);
    });
