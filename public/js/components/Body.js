import Header from "./common/header.js";
import { mainContent } from "./mainContent.js";
export function BodyContent({classMain='flex justify-center items-center',classMsgError='absolute top-4 left-[50%]',height='screen'}={}) {
  return `
  <div id="loader">
      <img src="/assets/loading/bouncing-ball.svg" alt="loader">
  </div>
  <div class="container mobile:m-0 tablet:px-4 h-${height}  grid mobile:grid-cols-1 tablet:grid-cols-container">
    <header class="flex flex-col items-center tablet:h-auto justify-start mobile:pl-2 mobile:py-1 tablet:m-4 mobile:absolute tablet:relative">
    ${Header()}    
    </header>
    <main  class="${classMain} mt-4 mr-4 mb-4 bg-[#19191a] rounded-lg border border-[#28282a] relative">
    <div id="msgElm" class="${classMsgError} opacity-0 transform text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 pointer-events-none z-50"></div>
        ${mainContent()} 
    </main>
  </div>
`;
}