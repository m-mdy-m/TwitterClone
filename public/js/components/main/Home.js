import { ContentSection } from "../home/Content.js";

export function HOME({ username, profilePic, profileStory }) {
  return `
    <div class="flex flex-col justify-start items-stretch">
        ${ContentSection({ profilePic, username, profileStory })}
    </div>
    <!-- Wrapper Directs -->
    <div class="border-l border-[#28282a]"></div>
    `;
}
