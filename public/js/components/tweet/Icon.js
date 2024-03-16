export function Icon({ src, alt, className =  "", id = "",styleIcon="",display='hidden',count='' }) {
  return `
    <div class="${className} relative flex justify-center icons mr-4 icon-container transform transition duration-150 hover:scale-105">
      <img src="/assets/icon/${src}" alt="${alt}" id="${id}" class="${styleIcon}">
      <p class="${display} absolute -bottom-1 -right-2 text-[#5c6065] rounded-full flex items-center justify-center text-[8px]">${count}</p>
    </div>
    `;
}