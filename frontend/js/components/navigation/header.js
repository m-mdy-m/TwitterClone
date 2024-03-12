export function HeaderNavigation({ isAuth }) {
  const authTemplateMenu = `
    <!-- Notifications Link -->
    <a href="/notifications" class="header__navigation-link flex items-center space-x-4 mobile:space-x-2 smallTb:space-x-3 transition duration-300 transform hover:scale-105 hover:bg-[#232627]">
        <img src="../assets/icon/nav/notifications.svg" alt="notifications" class="tablet:images__icons-nav mobile:w-7 mobile:h-7 smallTb:w-8 smallTb:h-8">
        <h2 class="text-lg font-semibold text-white capitalize mobile:text-base smallTb:text-lg">notifications</h2>
    </a>
    <!-- Messages Link -->
    <a href="/messages" class="header__navigation-link flex items-center space-x-4 mobile:space-x-2 smallTb:space-x-3 transition duration-300 transform hover:scale-105 hover:bg-[#232627]">
        <img src="../assets/icon/nav/messages.svg" alt="messages" class="tablet:images__icons-nav mobile:w-7 mobile:h-7 smallTb:w-8 smallTb:h-8">
        <h2 class="text-lg font-semibold text-white capitalize mobile:text-base smallTb:text-lg">messages</h2>
    </a>
    <!-- Setting Link -->
    <a href="/setting" class="header__navigation-link flex items-center space-x-4 mobile:space-x-2 smallTb:space-x-3 transition duration-300 transform hover:scale-105 hover:bg-[#232627]">
        <img src="../assets/icon/nav/setting.svg" alt="setting" class="tablet:images__icons-nav mobile:w-7 mobile:h-7 smallTb:w-8 smallTb:h-8">
        <h2 class="text-lg font-semibold text-white capitalize mobile:text-base smallTb:text-lg">setting</h2>
    </a>
    <!-- Logout Link -->
    <a href="/auth/logout" class="header__navigation-link flex items-center logout space-x-4 mobile:space-x-2 smallTb:space-x-3 transition duration-300 transform hover:scale-105 hover:bg-[#232627]">
        <button type="submit" class="flex items-center space-x-4 mobile:space-x-2 smallTb:space-x-3 transition duration-300 transform hover:scale-105">
            <img src="/assets/icon/utils/logout.svg" alt="LOGOUT" class="tablet:images__icons-nav mobile:w-7 mobile:h-7 smallTb:w-8 smallTb:h-8">
            <h2 class="text-lg font-semibold text-white capitalize mobile:text-base smallTb:text-lg">Logout</h2>
        </button>
    </a>`;

  const defaultTemplateMenu = `
    <!-- Signup Link -->
    <a href="/auth/signup" class="header__navigation-link flex items-center space-x-4 mobile:space-x-2 smallTb:space-x-3 transition duration-300 transform hover:scale-105 hover:bg-[#232627]">
        <img src="../assets/icon/utils/login.svg" alt="Signup" class="tablet:images__icons-nav mobile:w-7 mobile:h-7 smallTb:w-8 smallTb:h-8 ">
        <h2 class="text-lg font-semibold text-white capitalize mobile:text-base smallTb:text-lg">Signup</h2>
    </a>
    `;
  const template = isAuth ? authTemplateMenu : defaultTemplateMenu;
  return template;
}
