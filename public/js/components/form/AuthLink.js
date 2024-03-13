export function AuthLink({ text, href, className }) {
  return `
    <p class="text-xl mt-4">
      ${text} <a href="${href}" class="${className}">${text.toLowerCase()} here</a>
    </p>
  `;
}
