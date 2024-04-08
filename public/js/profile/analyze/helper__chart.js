export class ChartDataManager {
  constructor() {
    this.ctx = document.getElementById("chart__all-post");
    this.weakLabels = [];
    this.monthLabels = [];
    this.yearLabels = [];
    this.follow = Array(7).fill(0);
    this.views = Array(7).fill(0);
    this.likes = Array(7).fill(0);
  }
  set setData({ views, follow, likes }) {
    this.updateData({ views, follow, likes });
  }

  updateData({ views, follow, likes }) {
    const currentDate = new Date();
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDayIndex = currentDate.getDay(); 
    const day = weekDay[currentDayIndex]; 
    if (views !== undefined) {
      this.views[currentDayIndex] += views;
    }
    if (follow !== undefined) {
      this.follow[currentDayIndex] += follow;
    }
    if (likes !== undefined) {
      this.likes[currentDayIndex] += likes;
    }
  }

  Chart() {
    this.createDate();
    console.log('this.views :',this.views )
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
    const currentDate = new Date();
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = 0; i < 7; i++) {
      const dayIndex = (currentDate.getDay() + 5 - i ) % 7;
      const formattedDate = weekDay[dayIndex];
      console.log('formattedDate:',formattedDate)
      this.weakLabels.unshift(formattedDate);
    }
  }
}
