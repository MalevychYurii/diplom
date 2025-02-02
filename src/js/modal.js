document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.querySelector(".header__link--registration");
    const loginBtn = document.querySelector(".header__button--login");
    const registerModal = document.getElementById("registerModal");
    const loginModal = document.getElementById("loginModal");
    const closeButtons = document.querySelectorAll(".modal__close");

    function openModal(modal) {
        modal.style.display = "flex";
        requestAnimationFrame(() => {
            modal.classList.add("modal--active");
            document.body.style.overflow = "hidden";
        });
    }

    function closeModal(modal) {
        modal.classList.add("modal--closing");

        // Чекаємо завершення анімації перед видаленням класу
        modal.addEventListener("transitionend", function handler() {
            modal.classList.remove("modal--active", "modal--closing");
            modal.style.display = "none";
            modal.removeEventListener("transitionend", handler);
        });

        document.body.style.overflow = "";
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
            closeModal(registerModal);
            closeModal(loginModal);
        });
    });

    window.addEventListener("click", (event) => {
        if (event.target === registerModal) closeModal(registerModal);
        if (event.target === loginModal) closeModal(loginModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (registerModal.classList.contains("modal--active")) closeModal(registerModal);
            if (loginModal.classList.contains("modal--active")) closeModal(loginModal);
        }
    });
});
