export function Profile({ profile, username, width, height, className = "" }) {
  return `
    <img src="${profile}" alt="${username}" class="profilePic w-${width} h-${height} ${className}">
    `;
}
