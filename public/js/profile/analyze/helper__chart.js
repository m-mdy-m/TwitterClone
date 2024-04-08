export class ChartDataManager {
  constructor() {
    this.ctx = document.getElementById("chart__all-post");
    this.weakLabels = [];
    this.monthLabels = [];
    this.yearLabels = [];
    this.follow = [0,0,0,0,0,0,0];
    this.views = [0,0,0,0,0,0,0];
    this.likes = [0,0,0,0,0,0,0];
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
  }
  set setData({ views, follow, likes }) {
    this.data({ views, follow, likes });
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

  setTimestamp(timestamp){
   this._date = timestamp;
   this.createDate = this.createDate.bind(this)
  }

  createDate() {
    // Get current date
    const viewDate = new Date(this._date);
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayOfWeek = viewDate.getDay(); 
    const day = weekDay[dayOfWeek]
    for (let i = 0; i < 7; i++) {
      // Calculate the index of the day in the week
      const dayIndex = (viewDate.getDay() + 6 - i) % 7;
    
      // Get the weekday name based on the index
      const formattedDate = weekDay[dayIndex];
      console.log('formattedDate:',formattedDate)
      // Add the formatted date to the beginning of the array
      this.weakLabels.unshift(formattedDate);
    }
  }
}
