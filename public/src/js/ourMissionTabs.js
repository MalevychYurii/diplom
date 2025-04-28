document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq__item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq__question");
        const answer = item.querySelector(".faq__answer");

        question.addEventListener("click", () => {
            const isActive = question.classList.contains("active");

            document.querySelectorAll(".faq__question").forEach((q) => {
                q.classList.remove("active");
            });
            document.querySelectorAll(".faq__answer").forEach((a) => {
                a.style.maxHeight = null;
                a.style.padding = "0 15px";
            });

            if (!isActive) {
                question.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.padding = "10px 15px";
            }
        });
    });
});
