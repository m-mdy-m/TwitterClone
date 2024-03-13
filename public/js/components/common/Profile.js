export function Profile({ profile, username, className }) {
  return `
    <img src="${profile}" alt="${username}" class="profilePic ${className}">
    `;
}
