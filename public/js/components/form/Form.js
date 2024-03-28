export function Form({ title, action, method, children }) {
  return `
    <div class="flex bg-gray-800 w-full blur-bg-login h-full ">
      <form id="registerForm" action="${action}" method="${method}" class=" ">
        <h1 class="text-3xl text-center mb-6 text-gray-300">${title}</h1>
        ${children}
      </form>
    </div>
    <div class="bg-green-700">
    </div>
    `;
}
