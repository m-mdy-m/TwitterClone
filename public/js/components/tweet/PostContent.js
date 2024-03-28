export function PostContent({ content }) {
  return `
    <div class="flex justify-start items-center py-3 max-w-full break-words">
        <div class="flex justify-start items-center w-full h-full text-white text-base font-Aktiv__regular ">
            <p class="w-full">${content}</p>
        </div>
    </div>
  `;
}
