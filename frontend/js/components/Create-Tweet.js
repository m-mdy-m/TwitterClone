import { TweetSection } from "./tweet/create/TwetSection.js";
import { UpSection } from "./tweet/create/UpSection.js";
export function CreateTweet({ username, profile }) {
  return `<!-- up tweet section -->
    <div class="grid grid-cols-tweet py-2">
      ${UpSection({ username, profile })}
    </div>
    <!-- tweet section -->
    ${TweetSection()}
    `;
}
