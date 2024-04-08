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
        datasets: [
          {
            label: "Views",
            data: this.views,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "rgba(75, 192, 192, 1)",
            pointBorderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 7,
            lineTension: 0.4,
          },
        ],
      },
      options: {
        animation: {
          duration: 2000,
          easing: "easeInOutQuad",
        },
        scales: {
          y: {
            display: false,
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(255, 255, 255, 0.7)",
              font: {
                size: 14,
              },
            },
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
