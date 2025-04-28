document.addEventListener("DOMContentLoaded", () => {
    const registerButtons = document.querySelectorAll(".school__button, .header__link--registration");
    const loginBtn = document.querySelector(".header__button--login");

    const registerModal = document.getElementById("registerModal");
    const loginModal = document.getElementById("loginModal");
    const submitModal = document.getElementById("submitModal");

    const closeButtons = document.querySelectorAll(".modal__close, .close");

    const loginStatus = document.getElementById("loginStatus");
    const userEmailDisplay = document.getElementById("user-email-display");
    const userEmailContainer = document.getElementById("user-email");

    const registrationLink = document.querySelector(".header__link--registration");
    const logoutBtn = document.getElementById("logoutBtn");
    const courseLink = document.querySelector(".header__link--course"); // 🆕 додано

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

    // Логін
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
                const res = await fetch("/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();

                if (res.ok) {
                    localStorage.setItem("userEmail", email);

                    if (userEmailDisplay && userEmailContainer) {
                        userEmailDisplay.textContent = email;
                        userEmailContainer.style.display = "flex";
                    }

                    if (registrationLink) registrationLink.style.display = "none";
                    if (loginBtn) loginBtn.style.display = "none";
                    if (logoutBtn) logoutBtn.style.display = "inline-block";

                    // показуємо кнопку курсу
                    if (courseLink) courseLink.style.display = "inline-block";

                    openModal(submitModal);

                    setTimeout(() => {
                        loginForm.reset();
                        closeModal(loginModal);
                        window.location.href = "course.html";
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
                const res = await fetch("/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await res.json();

                if (res.ok) {
                    alert(data.message || "Реєстрація успішна!");
                    setTimeout(() => {
                        registerForm.reset();
                        closeModal(registerModal);
                        openModal(submitModal);
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

    // Вихід
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("userEmail");

            if (userEmailContainer) userEmailContainer.style.display = "none";
            if (registrationLink) registrationLink.style.display = "inline-block";
            if (loginBtn) loginBtn.style.display = "inline-block";
            if (logoutBtn) logoutBtn.style.display = "none";

            // 🆕 ховаємо кнопку курсу
            if (courseLink) courseLink.style.display = "none";

            window.location.href = "index.html";
        });
    }

    // Показуємо email при завантаженні, якщо збережено
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail && userEmailDisplay && userEmailContainer) {
        userEmailDisplay.textContent = storedEmail;
        userEmailContainer.style.display = "flex";
        if (registrationLink) registrationLink.style.display = "none";
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "inline-block";

        // показуємо кнопку курсу
        if (courseLink) courseLink.style.display = "inline-block";
    }
});
