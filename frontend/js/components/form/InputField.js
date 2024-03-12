export function InputField({ type, name, placeholder, id }) {
  return `
    <div class="form-group flex justify-center flex-col items-center">
      <input type="${type}" name="${name}" placeholder="${placeholder}" class="input-form bg-gray-700 text-white" id="${id}" value=""/>
      <i class="msg-error"></i>
    </div>
  `;
}
