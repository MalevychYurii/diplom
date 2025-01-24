document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.why-us__slider', {
        slidesPerView: 1,  // За замовчуванням 1 слайд на мобільних пристроях
        spaceBetween: 35,  // Відстань між слайдами
        loop: true,        // Безкінечний цикл
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2, // 2 слайди на планшетах
            },
            1200: {
                slidesPerView: 2, // 2 слайди на широких екранах
            },
        },
    });
});
