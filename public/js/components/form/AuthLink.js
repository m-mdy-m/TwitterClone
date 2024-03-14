export function AuthLink({ text,link, href, className }) {
  return `
    <p class="text-xl mt-4">
      ${text} <a href="${href}" class="${className}">${link}</a>
    </p>
  `;
}
