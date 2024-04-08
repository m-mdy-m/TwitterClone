export class ChartDataManager {
  constructor() {
    this.ctx = document.getElementById("chart__all-post");
    this.weakLabels = [];
    this.monthLabels = [];
    this.yearLabels = [];
    this.follow = Array(7).fill(0);
    this.views = Array(7).fill(0);
    this.likes = Array(7).fill(0);
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
  set setData({ views, follow, likes }) {
    this.updateData({ views, follow, likes });
  }

  updateData({ views, follow, likes }) {
    this.createDate();
    const currentDayIndex = this.currentDate.getDay();
    const day = this.weekDay[currentDayIndex];
    // Find the index of the current day in weakLabels
    const index = this.weakLabels.indexOf(day);
    console.log('index:',index)
    if (index !== -1) { // Check if the day exists in the weakLabels array
        if (views !== undefined) {
          this.views[index] += views;
        }
        if (follow !== undefined) {
          this.follow[index] += follow;
        }
        if (likes !== undefined) {
          this.likes[index] += likes;
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
            label: "following",
            data: this.follow, // follow
            borderColor: "blue",
            borderWidth: 1,
            tension: 0.5,
          },
          {
            label: "views",
            data: this.views, // views all post
            borderColor: "green",
            borderWidth: 1,
            tension: 0.5,
          },
          {
            label: "likes",
            data: this.likes, // like
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
    for (let i = 6; i >= 0; i--) {
      const pastDate = new Date(this.currentDate);
      pastDate.setDate(this.currentDate.getDate() - i);
      const dayIndex = pastDate.getDay();
      const formattedDate = this.weekDay[dayIndex];
      this.weakLabels.push(formattedDate);
    }
  }
}
