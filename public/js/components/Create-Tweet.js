import { UpSection } from "./tweet/create/UpSection.js";
import { ButtonCreate } from "./tweet/create/button.js";
export function CreateTweet({ username, profile }) {
  return `<!-- up tweet section -->
    <div class="grid grid-cols-tweet py-2">
      ${UpSection({ username, profile })}
    </div>
    <!-- Wrapper Button Tweet -->
    ${ButtonCreate()}
    `;
}
