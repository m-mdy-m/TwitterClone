export class ChartDataManager {
  constructor() {
    this.ctx = document.getElementById("chart__all-post");
    this.weakLabels = [];
    this.monthLabels = [];
    this.yearLabels = [];
    this.follow = [2, 4, 15, 5, 72, 5, 6];
    this.views = [];
    this.likes = [0, 0, 5, 0, 0, 0, 1];
    this.data = ({ views, follow, likes }) => {
      if (views !== undefined) {
        this.views.push(views);
      }
      if (follow !== undefined) {
        this.follow.push(follow);
      }
      if (likes !== undefined) {
        this.likes.push(likes);
      }
    };

    this.Chart();
  }
  set setData({ views, follow, likes }) {
    this.data({ views, follow, likes });
  }

  Chart() {
    this.createDate();
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
    // Get current date
    const currentDate = new Date();
    const weekDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Generate labels for weak, month, and year intervals

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i - 1);
      const formattedDate = `${weekDay[date.getDay()]}`;
      this.weakLabels.unshift(formattedDate);
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
