document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.why-us__slider', {
        slidesPerView: 1, // За замовчуванням один слайд (до 1024px)
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 2, // 2 слайди на екранах від 1024px і більше
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 1, // 1 слайд на планшетах (до 1024px)
                spaceBetween: 10,
            },
            428: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        },
    });
});
