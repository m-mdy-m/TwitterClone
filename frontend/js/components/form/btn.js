export function SubmitButton({ text, width, height }) {
  return `
    <button type="submit" class="w-${width} h-${height} bg-blue-500 hover:bg-blue-600 rounded-md">${text}</button>
  `;
}
