export function Form({ title, action, method, children }) {
  return `
    <form id="registerForm" action="${action}" method="${method}" class="flex-col flex justify-center items-center bg-gray-800 py-7 px-12 rounded-lg">
      <h1 class="text-3xl text-center mb-4 text-gray-300">${title}</h1>
      ${children}
    </form>
    `;
}
