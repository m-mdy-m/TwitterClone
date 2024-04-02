export function ProfileUserNav({profile,username}) {
  return `<!-- Profile User Default -->
    <div class="userProfileWrapper  flex flex-col items-center tablet:mt-0 mobile:mt-1 hover:cursor-pointer hover:shadow-lg  hover:contrast-150 transition-all  ">
        <div class="flex justify-center items-center relative ">
            <img src="/assets/icon/profile-utils/welcome.png" alt="welcome" class="absolute top-0 hidden z-20 welcome-user">
            <img src="${profile}" alt="${username}" class="profilePic tablet:w-28 z-10 tablet:h-28 mobile:w-24 mobile:h-24 smallTb:w-20 smallTb:h-20 rounded-full border-4 mobile:border border-white">
        </div>
        <!-- User Name -->
        <h2 class="username font-Aktiv__regular tablet:text-xl mobile:text-base mt-4 mobile:mt-2 smallTb:text-lg smallTb:mt-3 text-white">${username}</h2>
        <!-- Bio -->
        <p id="bio" class="text-center mt-2 text-gray-400 mobile:text-sm smallTb:text-base overflow-hidden whitespace-nowrap overflow-ellipsis">'Greatness، of small steps'!</p>
    </div>`;
}
