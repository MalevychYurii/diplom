document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".timeline__step");

    const revealSteps = () => {
        steps.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                step.style.opacity = "1";
                step.style.transform = "translateX(0)";
                step.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    };

    window.addEventListener("scroll", revealSteps);
    revealSteps();
});
