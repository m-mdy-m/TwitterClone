export function Icon({ src, alt, className =  "flex justify-center items-center", id = "",styleIcon="",display='hidden',content=''}) {
  return `
    <div class="${className} relative  icons mr-4 icon-container transform transition duration-150 hover:scale-105">
      <img src="/assets/icon/${src}" alt="${alt}" id="${id}" class="${styleIcon}">
      <p class="${display} absolute -bottom-1 -right-1 text-[#5c6065] rounded-full flex items-center justify-center text-[10px]">${content}</p>
    </div>
    `;
}