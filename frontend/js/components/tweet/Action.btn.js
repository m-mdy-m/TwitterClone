export function ActionButtons() {
  return `
      <div class="flex w-full justify-start items-center pt-3 px-2 text-white [&>*]:cursor-pointer">
          <div class="flex items-center mr-4 icon-container transform transition duration-150 hover:scale-110">
              <img src="/assets/icon/nav/chat-comment.svg" alt="comment">
          </div>
          <div class="flex items-center mr-4 icon-container transform transition duration-150 hover:scale-110">
              <img src="/assets/icon/nav/heart-null.svg" alt="comment">
          </div>
          <div class="flex items-center mr-4 icon-container transform transition duration-150 hover:scale-110">
              <img src="/assets/icon/nav/ReTweet.svg" alt="comment">
          </div>
          <div class="flex items-center icon-container transform transition duration-150 hover:scale-110">
              <img src="/assets/icon/nav/share.svg" alt="comment">
          </div>
      </div>
    `;
}
