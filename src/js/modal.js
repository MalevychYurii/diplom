document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.querySelector(".header__link--registration");
    const loginBtn = document.querySelector(".header__button--login");
    const registerModal = document.getElementById("registerModal");
    const loginModal = document.getElementById("loginModal");
    const closeButtons = document.querySelectorAll(".modal__close");

    function openModal(modal) {
        modal.style.display = "flex"; // Відновлюємо перед анімацією
        setTimeout(() => {
            modal.classList.add("modal--active");
            document.body.style.overflow = "hidden";
        }, 10);
    }

    function closeModal(modal) {
        if (!modal.classList.contains("modal--active")) return; // Якщо вже закрито - виходимо

        modal.classList.add("modal--closing"); // Додаємо анімацію закриття

        setTimeout(() => {
            modal.classList.remove("modal--active", "modal--closing");
            modal.style.display = "none";
            document.body.style.overflow = "";
        }, 400); // Чекаємо завершення анімації (збігається з `transition: 0.4s`)
    }

    registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(registerModal);
    });

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(loginModal);
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            closeModal(button.closest(".modal"));
        });
    });

    // Закриття модального вікна при натисканні на сіру зону
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal")) {
            closeModal(event.target);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (registerModal.classList.contains("modal--active")) closeModal(registerModal);
            if (loginModal.classList.contains("modal--active")) closeModal(loginModal);
        }
    });
});
