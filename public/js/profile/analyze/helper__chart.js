export class handlerChart {
  constructor() {
    this.ctx = document.getElementById("chart__all-post");
    this.weakLabels = [];
    this.monthLabels = [];
    this.yearLabels = [];
    this.data = [];
  }
  static setData(data) {
    this.data.push(data);
  }

  Chart() {
    new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.weakLabels,
        datasets: [
          {
            label: "Buy",
            data: [5, 8, 10, 15, 12, 10], // follow
            borderColor: "blue",
            borderWidth: 1,
            tension: 0.5,
          },
          {
            label: "Sell",
            data: [7, 10, 6, 8, 9, 11], // views all post
            borderColor: "green",
            borderWidth: 1,
            tension: 0.5,
          },
          {
            label: "Total",
            data: [12, 18, 16, 23, 21, 21], // view
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
  createDate() {
    // Get current date
    const currentDate = new Date();

    // Generate labels for weak, month, and year intervals

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      this.weakLabels.unshift(date.toLocaleDateString());
    }

    for (let i = 0; i < 30; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      this.monthLabels.unshift(date.toLocaleDateString());
    }

    for (let i = 0; i < 365; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      this.yearLabels.unshift(date.toLocaleDateString());
    }
  }
}
