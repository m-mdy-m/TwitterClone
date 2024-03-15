export function Icon({ src, alt, className = "", id = "" }) {
  return `
    <div class="${className} relative icons mr-4 icon-container transform transition duration-150 hover:scale-110">
      <img src="/assets/icon/${src}" alt="${alt}" id="${id}">
      <p class="absolute top-0 right-0 h-4 w-4 text-white rounded-full flex items-center justify-center text-[8px]">20</p>
    </div>
    `;
}
