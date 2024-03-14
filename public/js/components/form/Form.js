export function Form({ title, action, method, children }) {
  return `
  <div class="flex justify-center items-center">
    <form id="registerForm" action="${action}" method="${method}" class="flex-col flex justify-center items-center bg-gray-800 p-4 rounded-lg">
      <h1 class="text-3xl text-center mb-4">${title}</h1>
      ${children}
    </form>
  </div>
    `;
}
