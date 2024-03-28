export function Form({ title, action, method, children }) {
  return `
  <div class="flex justify-center items-center h-screen bg-red-7000">
      <form id="registerForm" action="${action}" method="${method}" class="bg-gray-800 w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl text-center mb-6 text-gray-300">${title}</h1>
        ${children}
      </form>
    </div>
    `;
}
