import { UserProfileInformation } from "../common/UserProfile.js";

export function ProfileUserNav({profile,username,bio}) {
  return `<!-- Profile User Default -->
    <div class="userProfileWrapper  flex flex-col items-center tablet:mt-0 mobile:mt-1 hover:cursor-pointer hover:shadow-lg  hover:contrast-150 transition-all  ">
        <div class="flex justify-center items-center relative ">
            <img src="/assets/icon/profile-utils/welcome.png" alt="welcome" class="absolute top-0 hidden z-20 welcome-user">
            <img src="${profile}" alt="${username}" class="profilePic object-cover tablet:w-28 z-10 tablet:h-28 mobile:w-24 mobile:h-24 smallTb:w-20 smallTb:h-20 rounded-full border-4 mobile:border border-white">
        </div>
        ${UserProfileInformation({username,bio})}
    </div>`;
}
