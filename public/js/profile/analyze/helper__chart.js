export class ChartDataManager {
  constructor() {
    this.ctx = document.getElementById("chart__all-post");
    this.weakLabels = [];
    this.monthLabels = [];
    this.yearLabels = [];
    this.views = Array(7).fill(0);
    this.weekDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.currentDate = new Date();
  }
  set setData({ views }) {
    this.updateData({ views });
  }

  updateData({ views }) {
    this.createDate();
    const currentDayIndex = this.currentDate.getDay();
    const day = this.weekDay[currentDayIndex];
    // Find the index of the current day in weakLabels
    const index = this.weakLabels.indexOf(day);
    if (index !== -1) {
      // Check if the day exists in the weakLabels array
      if (views !== undefined) {
        this.views[index] += views;
      }
    }
  }

  Chart() {
    new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.weakLabels,
        datasets: [{
          label: "views",
          data: this.views, // views all post
          borderColor: "green",
          borderWidth: 1,
          tension: 0.5,
        }],
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
    for (let i = 6; i >= 0; i--) {
      const pastDate = new Date(this.currentDate);
      pastDate.setDate(this.currentDate.getDate() - i);
      const dayIndex = pastDate.getDay();
      const formattedDate = this.weekDay[dayIndex];
      this.weakLabels.push(formattedDate);
    }
  }
}
