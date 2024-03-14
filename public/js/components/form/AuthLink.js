export function AuthLink({ text,link, href }) {
  return `
    <p class="text-xl mt-4 text-gray-80">
      ${text} <a href="${href}" class="text-blue-400">${link}</a>
    </p>
  `;
}
