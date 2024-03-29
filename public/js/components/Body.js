import Header from "./common/header.js";
import { mainContent } from "./mainContent.js";
export function BodyContent({
  style_main = "flex justify-end  bg-[#080202]",
  style_error = "absolute top-4 left-[50%]",
  height = "screen",
} = {}) {
  return `
  <div id="loader">
      <img src="/assets/loading/bouncing-ball.svg" alt="loader">
  </div>
    <!-- Create Tweet Box -->
  <div class="absolute w-full h-screen flex items-center justify-center backdrop-blur-sm z-40">
    <div class="bg-[#111010] w-3/6 h-5/6 z-50 absolute rounded-lg shadow-lg shadow-[#31363F]">
      
    </div>
  </div>
  <div class="container mobile:m-0 tablet:px-4 h-${height} min-h-screen  grid mobile:grid-cols-1 tablet:grid-cols-container">
    <header class="flex flex-col items-center tablet:h-auto justify-start mobile:pl-2 mobile:py-1 tablet:m-4 mobile:absolute tablet:relative">
    ${Header()}    
    </header>
    <main  class="${style_main} relative">
    <div id="msgElm" class="${style_error} opacity-0 transform text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 pointer-events-none z-50"></div>
        ${mainContent()} 
    </main>
  </div>
`;
}
