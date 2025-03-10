require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Маршрут для обробки форми
app.post("/send-message", async (req, res) => {
    const { name, email, phone, topic, message } = req.body;

    if (!name || !email || !phone || !topic || !message) {
        return res.status(400).json({ error: "Всі поля обов'язкові!" });
    }

    try {
        // Налаштування Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "testfordiplom2025@gmail.com", // Вкажи свою пошту
            subject: `Нове повідомлення від ${name}`,
            text: `Ім'я: ${name}\nEmail: ${email}\nТелефон: ${phone}\nТема: ${topic}\nПовідомлення: ${message}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Повідомлення надіслано успішно!" });
    } catch (error) {
        res.status(500).json({ error: "Помилка сервера: " + error.message });
    }
});

// Запускаємо сервер
app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}`);
});
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
