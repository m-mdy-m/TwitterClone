export function PostContent({ content }) {
  return `
    <div class="flex justify-start items-center py-3 w-full break-words">
        <div class="flex justify-start items-center w-full h-full text-white text-base font-Aktiv__regular ">
          <textarea id="editContent" class="pr-7 h-auto w-full bg-transparent  rounded-l-xl px-1 py-2 border-r-transparent border-l-transparent text-white outline-none transition-all resize-none overflow-y-hidden">${content}</textarea>
        </div>
    </div>
  `;
}


// export function PostContent({ content }) {
//   return `
//     <div class="flex justify-start items-center py-3 max-w-full break-words">
//         <div class="flex justify-start items-center w-full h-full text-white text-base font-Aktiv__regular ">
//             <p class="w-full">${content}</p>
//         </div>
//     </div>
//   `;
// }
