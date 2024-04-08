export class handlerChart {
  constructor() {
    this.ctx = document.getElementById("chart__all-post");
    this.weakLabels = [];
    this.monthLabels = [];
    this.yearLabels = [];
    this.data = [];
    this.Chart()
  }
  set setData(data) {
    this.data.push(data);
  }

  Chart() {
    this.createDate()
    new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.weakLabels,
        datasets: [
          {
            label: "Buy",
            data: this.data, // follow
            borderColor: "blue",
            borderWidth: 1,
            tension: 0.5,
          },
          {
            label: "Sell",
            data: this.data, // views all post
            borderColor: "green",
            borderWidth: 1,
            tension: 0.5,
          },
          {
            label: "Total",
            data: this.data, // like
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
