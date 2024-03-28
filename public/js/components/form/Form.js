export function Form({ title, action, method, children }) {
  return `
    <div class="flex bg-gradient-form w-full blur-bg-login h-full justify-center items-center ">
      <form id="registerForm" action="${action}" method="${method}" class="p-4 w-3/5 h-full flex flex-col items-center justify-center  [&>*]:my-3">
        <h1 class="text-3xl text-center mb-6 text-gray-300">${title}</h1>
        ${children}
      </form>
    </div>
    `;
}
