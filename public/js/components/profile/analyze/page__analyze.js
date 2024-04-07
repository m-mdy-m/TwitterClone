export function page_analyze() {
    return `
      <div class="absolute top-3 right-5 p-2 px-4 rounded-md  bg-red-700">
        <div class="flex justify-center items-center flex-col first:!z-30  [&>*]:text-white first:!relative [&>*]:opacity-0 [&>*]:absolute">
          <button>Month</button>
          <button>Week</button>
          <button>Year</button>
        </div>
      </div>
    <div class="flex justify-center items-center">
      <canvas id="chart__all-post"></canvas>
    </div>
      `;
  }
  