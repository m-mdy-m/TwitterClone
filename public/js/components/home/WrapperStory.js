import { StoryBox } from "./StoryBox.js";
export function WrapperStory() {
  return `
    <!-- Your Add Story -->
    <div class="flex justify-start items-center w-auto mr-2">
      ${StoryBox()}
    </div>
    <!-- Wrapper Story -->
    <div class="flex justify-start items-center w-auto mr-2" id="wrapper__story-box">
    </div>
    `;
}
