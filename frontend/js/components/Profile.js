export function Profile({ profile, username, width, height }) {
  return `
    <img src="${profile}" alt="${username}" class="profilePic w-${width} h-${height}">
    `;
}
