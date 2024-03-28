export function PostContent({ content }) {
    return `
      <div class="border-b border-[#252424] py-3 w-full h-full">
          <div class="flex justify-start items-center text-white text-base font-Aktiv__regular break-words">
              <p>${content}</p>
          </div>
      </div>
    `;
  }
  