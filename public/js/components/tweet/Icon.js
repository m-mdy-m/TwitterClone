export function Icon({ src, alt, className = "", id = "",styles="",display='hidden' }) {
  return `
    <div class="${className} flex justify-center icons mr-4 icon-container transform transition duration-150 hover:scale-110">
      <img src="/assets/icon/${src}" alt="${alt}" id="${id}" class="${styles}">
      <p class="${display} h-5 w-5 text-white rounded-full flex items-center justify-center text-[8px]">20</p>
    </div>
    `;
}