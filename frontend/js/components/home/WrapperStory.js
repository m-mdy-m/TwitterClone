import { StoryBox } from "./StoryBox";
import { UserStory } from "./UserStory";

export function WrapperStory({ username, profilePic }) {
  return `
    <!-- Your Add Story -->
    <div class="flex justify-start items-center w-auto mr-2">
      ${StoryBox()}
    </div>
    <!-- Wrapper Story -->
    <div class="flex justify-start items-center w-auto mr-2">
        ${UserStory({ username, profilePic })}
    </div>
    `;
}
