export function page_analyze() {
    return `
    <div class="absolute top-3 right-5 p-2 px-3 rounded-md bg-red-700">
        <div class="flex justify-center items-center flex-col">
          <button class="first:opacity-100 first:relative opacity-0 absolute">Month</button>
          <button class="first:relative first:opacity-100 opacity-0 absolute">Week</button>
          <button class="first:relative first:opacity-100 opacity-0 absolute">Year</button>
        </div>
     </div>
    <div class="flex justify-center items-center">
      <canvas id="chart__all-post"></canvas>
    </div>
      `;
  }
  