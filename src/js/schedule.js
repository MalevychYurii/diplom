document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("learningChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["A1", "A2", "B1", "B2", "C1"],
            datasets: [{
                label: "Години навчання",
                data: [100, 200, 350, 500, 700],
                backgroundColor: ["#6c5ce7", "#a29bfe", "#74b9ff", "#55efc4", "#fdcb6e"],
                borderColor: "#2d3436",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Години навчання"
                    }
                }
            }
        }
    });
});
