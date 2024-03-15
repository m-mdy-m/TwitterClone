export function Icon({ src, alt, className = "", id = "",styles="",display='hidden' }) {
  return `
    <div class="${className} flex justify-center icons mr-4 icon-container transform transition duration-150">
      <img src="/assets/icon/${src}" alt="${alt}" id="${id}" class="${styles}">
      <p class="${display} text-[#5c6065] rounded-full flex items-center justify-center text-xs h-4 w-4">20</p>
    </div>
    `;
}