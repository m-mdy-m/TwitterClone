export function Icon({ src, alt, className = "",id="" }) {
  return `
<div id="${id}" class="${className} mr-4 icon-container transform transition duration-150 hover:scale-110">
    <img src="/assets/icon/${src}" alt="${alt}">
  </div>`;
}
