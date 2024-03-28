import { CreateTweet } from "../Create-Tweet.js";
import { WrapperStory } from "./WrapperStory.js";

export function ContentSection({ username, profileStory,profilePic }) {
  return `
           <!-- Wrapper All box story -->
            <div class="w-full flex justify-start pt-5 px-12 bg-gradient-story">
                ${WrapperStory({ username, profilePic:profileStory })}
            </div>
            <!-- Wrapper Posts -->
        <div class="pt-5 px-12 relative overflow-auto">
          <!-- Post Box -->
          <div class="flex flex-col min-h-32 rounded-2xl px-4 py-2 bg-transparent">
            ${CreateTweet({ username, profile: profilePic })}
          </div>
          <!-- Wrapper Tweets -->
          <div class="flex flex-col justify-center " id="wrapperTweet">
            <!-- Reading Posts -->
          </div>
        </div>`;
}
