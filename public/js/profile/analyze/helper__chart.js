export async function handlerChart() {
  const ctx = document.getElementById("chart__all-post");

  // Get current date
  const currentDate = new Date();

  // Generate labels for weak, month, and year intervals
  const weakLabels = [];
  const monthLabels = [];
  const yearLabels = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    weakLabels.unshift(date.toLocaleDateString());
  }

  for (let i = 0; i < 30; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    monthLabels.unshift(date.toLocaleDateString());
  }

  for (let i = 0; i < 365; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    yearLabels.unshift(date.toLocaleDateString());
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels: weakLabels,
      datasets: [
        {
          label: "Buy",
          data: [5, 8, 10, 15, 12, 10], 
          borderColor: "blue", 
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: "Sell",
          data: [7, 10, 6, 8, 9, 11],
          borderColor: "green", 
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: "Total",
          data: [12, 18, 16, 23, 21, 21],
          borderColor: "purple", 
          borderWidth: 1,
          tension: 0.5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
