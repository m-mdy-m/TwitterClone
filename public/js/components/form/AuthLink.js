export function AuthLink({ text,link, href }) {
  return `
    <p class="text-lg  mt-4 flex items-center justify-center text-gray-300">
      ${text} <a href="${href}" class="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">${link}</a>
    </p>
  `;
}
