document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".history__tabs-item");
    const content = document.querySelectorAll(".history__content-item");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const tabId = tab.getAttribute("data-tab");

            tabs.forEach((t) => t.classList.remove("history__tabs-item--active"));
            tab.classList.add("history__tabs-item--active");

            content.forEach((content) => {
                content.classList.remove("history__content-item--visible");
                if (content.getAttribute("data-content") === tabId) {
                    content.classList.add("history__content-item--visible");
                }
            });
        });
    });
});
