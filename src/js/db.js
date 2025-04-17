const { Sequelize, DataTypes } = require("sequelize");

// Створюємо або підключаємо базу даних SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite", // Файл бази даних
});

// Описуємо модель для користувача
const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Ініціалізація бази даних
(async () => {
    try {
        await sequelize.sync(); // Створення таблиць
        console.log("База даних підключена і таблиця користувачів створена");
    } catch (error) {
        console.error("Помилка підключення до бази даних:", error);
    }
})();

module.exports = { sequelize, User };
