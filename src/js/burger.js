document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelector(".header__menu");

    burger.addEventListener("click", () => {
        menu.classList.toggle("header__menu--active");
        burger.classList.toggle("header__burger--open");
    });
});
