export function Icon({ src, alt, className =  "mr-4 flex justify-center items-center", id = "",styleIcon="",display='hidden',content='',sizeText='text-[10px]',classNameContent="absolute -bottom-1 -right-1"}) {
  return `
    <div class="${className} relative icons icon-container transform transition duration-150 hover:scale-105">
      <img src="/assets/icon/${src}" alt="${alt}" id="${id}" class="${styleIcon}">
      <p class="${display} ${classNameContent} text-[#5c6065] rounded-full flex items-center justify-center ${sizeText}">${content}</p>
    </div>
    `;
}