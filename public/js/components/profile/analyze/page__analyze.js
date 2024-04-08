export function page_analyze() {
  return `
    <div data-chart  class="absolute transition-all delay-1000 top-3  right-5 flex justify-center items-center px-3 rounded-lg border border-gray-700 ">
        <div class="flex justify-start  min-w-10 min-h-6 [&>*]:w-full [&>*]:hover:contrast-200 h-auto text-base relative items-start flex-col text-white font-mavis__light">
            <button data-chart-week  class="transition-all delay-200 absolute top-0">Week</button>
            <button data-chart-month class="transition-all delay-200 absolute top-0 opacity-0">Month</button>
            <button data-chart-year  class="transition-all delay-200 absolute top-0 opacity-0">Year</button>
        </div>
        <svg class="absolute cursor-pointer right-1 top-1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path fill-rule="evenodd" clip-rule="evenodd" d="M6.41438 9.53151C6.67313 9.20806 7.1451 9.15562 7.46855 9.41438L12 13.0396L16.5315 9.41438C16.855 9.15562 17.3269 9.20806 17.5857 9.53151C17.8444 9.85495 17.792 10.3269 17.4685 10.5857L12.4685 14.5857C12.1946 14.8048 11.8054 14.8048 11.5315 14.5857L6.53151 10.5857C6.20806 10.3269 6.15562 9.85495 6.41438 9.53151Z" fill="#28303F"/>
        </svg>
     </div>
    <div class="flex justify-center items-center">
      <canvas id="chart__all-post"></canvas>
    </div>
      `;
}