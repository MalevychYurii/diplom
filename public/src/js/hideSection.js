document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.hidden-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);  // Вимикаємо спостереження після появи
            }
        });
    }, { threshold: 0.15 });  // Відстеження при 20% видимості секції

    sections.forEach(section => observer.observe(section));
});
