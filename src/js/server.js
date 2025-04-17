require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 5000;

// Підключення до SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});

// Оголошення моделі для користувача
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

// Синхронізація з базою даних
sequelize.sync()
    .then(() => {
        console.log("Таблиця користувачів створена або вже існує.");
    })
    .catch(error => {
        console.error("Не вдалося синхронізувати з базою даних:", error);
    });

// Middleware
app.use(cors());
app.use(express.json());

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
        console.log("Новий користувач:", newUser);

        res.status(200).json({ message: "Реєстрація успішна!" });
    } catch (error) {
        console.error("Помилка реєстрації:", error);
        res.status(500).json({ error: "Помилка сервера" });
    }
});

// Логін користувача
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Перевірка на заповнення полів
    if (!email || !password) {
        return res.status(400).json({ error: "Всі поля обов'язкові!" });
    }

    try {
        // Знаходимо користувача по email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "Користувача з таким email не знайдено." });
        }

        // Перевірка пароля (для цього треба буде використовувати хешування паролів, згодом додамо bcrypt)
        if (user.password !== password) {
            return res.status(400).json({ error: "Невірний пароль." });
        }

        // Успішний логін
        res.status(200).json({ message: "Успішний логін!" });
    } catch (error) {
        console.error("Помилка логіну:", error);
        res.status(500).json({ error: "Помилка сервера" });
    }
});

// Отримання всіх користувачів
app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Помилка при отриманні користувачів:", error);
        res.status(500).json({ error: "Помилка сервера" });
    }
});

// Видалення користувача за ID
app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "Користувача не знайдено" });
        }

        await user.destroy();
        res.status(200).json({ message: "Користувача успішно видалено" });
    } catch (error) {
        console.error("Помилка при видаленні користувача:", error);
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
        res.status(500).json({ error: "Помилка сервера: " + error.message });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
