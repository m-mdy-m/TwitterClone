export function page_analyze() {
  return `
    <div class="absolute top-3 right-5 p-2 px-3 rounded-md bg-red-700">
        <div class="flex justify-center items-center flex-col">
            <button data-chart class="opacity-0 absolute show_list_chart">Week</button>
            <button data-chart class="opacity-0 absolute">Month</button>
            <button data-chart class="opacity-0 absolute">Year</button>
        </div>
     </div>
    <div class="flex justify-center items-center">
      <canvas id="chart__all-post"></canvas>
    </div>
      `;
}
