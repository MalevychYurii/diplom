document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("submitModal");
    const closeModal = document.querySelector(".close");
    const closeModalBtn = document.getElementById("closeModalBtn");

    // Приховуємо модальне вікно при завантаженні сторінки
    modal.style.display = "none";

    // Якщо повідомлення вже було відправлено, не показуємо вікно
    if (sessionStorage.getItem("formSubmitted")) {
        sessionStorage.removeItem("formSubmitted");
    }

    const submitButton = document.querySelector(".school__button--send");
    submitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const name = document.querySelector('input[placeholder="ПІБ"]').value.trim();
        const email = document.querySelector('input[placeholder="Email"]').value.trim();
        const phone = document.querySelector('input[placeholder="Номер тел. (Формат +380)"]').value.trim();
        const topic = document.querySelector('input[placeholder="Тема"]').value.trim();
        const message = document.querySelector('textarea[placeholder="Напишіть повідомлення"]').value.trim();

        if (!name || !email || !phone || !topic || !message) {
            alert("Будь ласка, заповніть всі поля!");
            return;
        }

        const formData = { name, email, phone, topic, message };

        try {
            const response = await fetch("https://diplom-0101.onrender.com/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                // Очищаємо поля форми після відправки
                document.querySelector('input[placeholder="ПІБ"]').value = "";
                document.querySelector('input[placeholder="Email"]').value = "";
                document.querySelector('input[placeholder="Номер тел. (Формат +380)"]').value = "";
                document.querySelector('input[placeholder="Тема"]').value = "";
                document.querySelector('textarea[placeholder="Напишіть повідомлення"]').value = "";

                // Встановлюємо прапорець у sessionStorage
                sessionStorage.setItem("formSubmitted", "true");

                // Відкриваємо модальне вікно
                modal.style.display = "flex";
            } else {
                alert("Помилка при відправці: " + result.error);
            }
        } catch (error) {
            alert("Сталася помилка: " + error.message);
        }
    });

    // Закриття модального вікна
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        sessionStorage.removeItem("formSubmitted");
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        sessionStorage.removeItem("formSubmitted");
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            sessionStorage.removeItem("formSubmitted");
        }
    });
});
