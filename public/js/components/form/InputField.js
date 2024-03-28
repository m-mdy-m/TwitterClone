export function InputField({ type, name, placeholder, id }) {
  return `
    <div class="form-group flex justify-center flex-col items-center w-full [&>input]:p-2">
      <input type="${type}" name="${name}" placeholder="${placeholder}" class="input-form w-3/4  h-full bg-gray-700 text-white" id="${id}" value=""/>
      <i class="msg-error"></i>
    </div>
  `;
}
