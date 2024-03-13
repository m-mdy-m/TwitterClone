import { ContentSection } from "../home/Content.js";

export function HOME({ username, profilePic, profileStory }) {
  return `
    <div class="grid grid-rows-home ">
        ${ContentSection({ profilePic, username, profileStory })}
    </div>
    <!-- Wrapper Directs -->
    <div class="border-l border-[#28282a]"></div>
    `;
}
