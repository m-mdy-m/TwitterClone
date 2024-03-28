/**
 * <!-- Post Box -->
    <div class="flex flex-col min-h-32 rounded-2xl px-4 py-2 bg-[#111010]">
      ${CreateTweet({ username, profile: profilePic })}
    </div>
 */

/** create -tweet
 * 
 *  
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

 * 
 * 
 * 
 * 
 */