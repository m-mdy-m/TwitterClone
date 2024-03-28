export function Form({ title, action, method, children }) {
  return `
    <div class="flex bg-[#27374D] w-full blur-bg-login h-full justify-center items-center ">
      <form id="registerForm" action="${action}" method="${method}" class="p-4 w-3/5 h-5/6 flex flex-col items-center justify-center  [&>*]:my-3 ">
        <h1 class="text-3xl text-center mb-6 text-gray-300">${title}</h1>
        ${children}
      </form>
    </div>
    <div class="bg-green-700">
    </div>
    `;
}
