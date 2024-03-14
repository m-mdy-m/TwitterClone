export function Icon({ src, alt, className = "", id = "" }) {
  return `
  <div class="${className} icons mr-4 icon-container transform transition duration-150 hover:scale-110">
      <img src="/assets/icon/${src}" alt="${alt}" id="${id}">
    </div>`;
}
