import { InfoUser } from "./InfoUser.js";

export function MobileNavigation({ isAuth }) {
  const authTemplateMobile = `
    <!-- Profile User Section -->
    <div class="flex flex-col items-center rounded-lg mobile:p-0 tablet:p-2 tablet:pt-0">
        <!-- Profile User Default -->
        <div class="flex flex-col items-center tablet:mt-0 mobile:mt-1">
            <div class="flex justify-center items-center relative ">
                <img src="/assets/icon/profile-utils/welcome.png" alt="welcome" class="absolute top-0 hidden z-20 welcome-user">
                <img src="/assets/images/profilePic.png" alt="Profile Picture" class="profilePic tablet:w-28 z-10 tablet:h-28 mobile:w-24 mobile:h-24 smallTb:w-20 smallTb:h-20 rounded-full border-4 mobile:border border-white">
            </div>
            <!-- User Name -->
            <h2 class="username font-Aktiv__regular tablet:text-xl mobile:text-base mt-4 mobile:mt-2 smallTb:text-lg smallTb:mt-3 text-white">m__mdy__m</h2>
            <!-- Bio -->
            <p id="bio" class="text-center mt-2 text-gray-400 mobile:text-sm smallTb:text-base overflow-hidden whitespace-nowrap overflow-ellipsis">'Greatness، of small steps'!</p>
        </div>
        ${InfoUser()}
    </div>
`;

  const defaultTemplateMobile = `
    <!-- Signup Button -->
 <div class="bg-gradient-to-br w-full from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center tablet:p-8 mobile:p-2 transform transition duration-300 hover:scale-105 mb-4">
     <a href="/auth/signup" class="flex flex-col items-center justify-center text-white">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4 text-gray-300 hover:text-gray-100" viewBox="0 0 20 20" fill="currentColor">
             <path fill-rule="evenodd" d="M10 1a9 9 0 0 0-6.364 15.364L10 19.243l6.364-2.879A9 9 0 0 0 10 1zm0 3a5.95 5.95 0 0 0-4.243 1.757A5.953 5.953 0 0 0 4 10c0 1.41.49 2.702 1.317 3.707L10 17.079l4.683-3.372A5.953 5.953 0 0 0 16 10c0-1.567-.61-3.034-1.732-4.243A5.95 5.95 0 0 0 10 4z" clip-rule="evenodd" />
         </svg>
         <h2 class="font-semibold text-xl hover:text-gray-100">Sign Up</h2>
         <p class="text-gray-300 mobile:text-[10px] mt-2 tablet:text-sm font-Aktiv__medium">Create an account to unlock more features</p>
     </a>
    </div>
`;
  const template = isAuth ? authTemplateMobile : defaultTemplateMobile;
  return template;
}
