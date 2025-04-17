document.addEventListener("DOMContentLoaded", () => {
    const registerButtons = document.querySelectorAll(".school__button, .header__link--registration");
    const loginBtn = document.querySelector(".header__button--login");

    const registerModal = document.getElementById("registerModal");
    const loginModal = document.getElementById("loginModal");
    const submitModal = document.getElementById("submitModal");

    const closeButtons = document.querySelectorAll(".modal__close, .close");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const loginStatus = document.getElementById("loginStatus"); // елемент, де буде показуватись email
    const userEmailDisplay = document.getElementById("user-email-display"); // елемент для email
    const userEmailContainer = document.getElementById("user-email"); // контейнер для email

    // Відкриття модалки
    function openModal(modal) {
        if (!modal) return;
        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add("modal--active");
            document.body.style.overflow = "hidden";
        }, 10);
    }

    // Закриття модалки
    function closeModal(modal) {
        if (!modal || !modal.classList.contains("modal--active")) return;
        modal.classList.add("modal--closing");

        setTimeout(() => {
            modal.classList.remove("modal--active", "modal--closing");
            modal.style.display = "none";
            document.body.style.overflow = "";
        }, 400);
    }

    // Реєстрація
    registerButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(registerModal);
        });
    });

    // Логін
    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(loginModal);
        });
    }

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal, .submitModal");
            closeModal(modal);
        });
    });

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal") || e.target.classList.contains("submitModal")) {
            closeModal(e.target);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (registerModal.classList.contains("modal--active")) closeModal(registerModal);
            if (loginModal.classList.contains("modal--active")) closeModal(loginModal);
            if (submitModal.classList.contains("modal--active")) closeModal(submitModal);
        }
    });

    // Логіка входу
    const loginForm = document.querySelector("#loginModal .modal__form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inputs = loginForm.querySelectorAll(".modal__input");
            const email = inputs[0].value.trim();
            const password = inputs[1].value.trim();

            if (!email || !password) {
                alert("Будь ласка, заповніть всі поля.");
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();

                if (res.ok) {
                    // Перевіряємо, чи є елемент для email
                    if (userEmailDisplay && userEmailContainer) {
                        userEmailDisplay.textContent = email; // Показуємо email
                        userEmailContainer.style.display = "block"; // Показуємо контейнер з email і кнопкою вийти
                    }

                    openModal(submitModal);

                    setTimeout(() => {
                        loginForm.reset();
                        closeModal(loginModal);
                    }, 5000);
                } else {
                    alert("Помилка: " + data.error);
                }
            } catch (err) {
                console.error("Помилка запиту:", err);
                alert("Сталася помилка при відправці запиту.");
            }
        });
    }

    // Реєстрація
    const registerForm = document.querySelector("#registerModal .modal__form");

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const inputs = registerForm.querySelectorAll(".modal__input");
            const username = inputs[0].value.trim();
            const email = inputs[1].value.trim();
            const password = inputs[2].value.trim();

            if (!username || !email || !password) {
                alert("Будь ласка, заповніть всі поля.");
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await res.json();

                if (res.ok) {
                    // Показуємо повідомлення про успіх
                    alert(data.message || "Реєстрація успішна!");

                    // Закриваємо модалку реєстрації після успішної реєстрації
                    setTimeout(() => {
                        registerForm.reset();
                        closeModal(registerModal);
                        openModal(submitModal); // Можна відкрити іншу модалку, якщо потрібно
                    }, 1000);
                } else {
                    alert("Помилка: " + data.error);
                }
            } catch (err) {
                console.error("Помилка запиту:", err);
                alert("Сталася помилка при відправці запиту.");
            }
        });
    }

    // Кнопка "вийти"
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            userEmailContainer.style.display = "none"; // Ховаємо email і кнопку "Вийти"
            window.location.reload(); // Перезавантажуємо сторінку
        });
    }
});
