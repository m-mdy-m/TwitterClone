import Header from "./common/header.js";
import { mainContent } from "./mainContent.js";

export function BodyContent({ isAuth, profile, username,classMain,classMsgError }) {
  return `
  <!-- Context menu container -->
  <div id="contextMenu" class="context-menu">
  <div class="context-menu-item" onclick="window.history.back();">Back</div>
  <div class="context-menu-item" onclick="window.history.forward();">Forward</div>
  <div class="context-menu-item" onclick="window.location.reload();">Reload</div>
  <div class="context-menu-item" onclick="openDevTools();">Inspect</div>
</div>
  <div class="container mobile:m-0 tablet:px-4 h-full  grid mobile:grid-cols-1 tablet:grid-cols-container">
    <header class="flex flex-col items-center tablet:h-auto justify-start mobile:pl-2 mobile:py-1 tablet:m-4 mobile:absolute tablet:relative">
    ${Header({ isAuth, profile, username })}    
    </header>
    <main  class="${classMain} mt-4 mr-4 mb-4 bg-[#19191a] rounded-lg border border-[#28282a] relative">
    <div id="msgElm" class="${classMsgError} opacity-0 transform text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 pointer-events-none z-50"></div>
        ${mainContent()} 
    </main>
  </div>
`;
}