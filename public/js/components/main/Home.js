import { ContentSection } from "../home/Content.js";
import { template_direct } from "../home/direct/wrapper__direct.js";

export function HOME() {
  return `
    <div class="flex flex-col justify-start items-stretch">
        ${ContentSection()}
    </div>
    <!-- Wrapper Directs -->
    <div class="border-l border-[#28282a] flex justify-start flex-col wrapper_directs">
    </div>
    `;
}
