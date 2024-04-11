import { ContentSection } from "../home/Content.js";

export function HOME() {
  return `
    <div class="flex flex-col justify-start items-stretch">
        ${ContentSection()}
    </div>
    <!-- Wrapper Directs -->
    <div class="border-l border-[#28282a]"></div>
    `;
}
