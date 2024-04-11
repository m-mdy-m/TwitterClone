import { UpSection } from "./tweet/create/UpSection.js";
export function CreateTweet() {
  return `<!-- up tweet section -->
    <div class="grid grid-cols-tweet py-2">
      ${UpSection()}
    </div>
    `;
}
