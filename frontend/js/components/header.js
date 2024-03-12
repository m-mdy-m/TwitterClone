export default function Header() {
  return `
            <!-- Icon Navigation -->
            <div id="iconNavigation" class="mobile:absolute top-4 left-4 tablet:hidden">
                <svg class="w-12 h-12  text-white cursor-pointer transform transition duration-300 hover:scale-110 hover:bg-gray-800 p-1 rounded-full" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 8C6.25 7.58579 6.58579 7.25 7 7.25H17C17.4142 7.25 17.75 7.58579 17.75 8C17.75 8.41421 17.4142 8.75 17 8.75H7C6.58579 8.75 6.25 8.41421 6.25 8ZM6.25 12C6.25 11.5858 6.58579 11.25 7 11.25H17C17.4142 11.25 17.75 11.5858 17.75 12C17.75 12.4142 17.4142 12.75 17 12.75H7C6.58579 12.75 6.25 12.4142 6.25 12ZM7 15.25C6.58579 15.25 6.25 15.5858 6.25 16C6.25 16.4142 6.58579 16.75 7 16.75H17C17.4142 16.75 17.75 16.4142 17.75 16C17.75 15.5858 17.4142 15.25 17 15.25H7Z" fill="#fff"/>
                </svg>
            </div>
            <!-- Navigation Mobile -->
            <div id="nav-mobile" class="mobile:header__navigation-bg tablet:header__navigation-bg-transparent  mobile:fixed tablet:flex tablet:flex-col tablet:relative tablet:h-full tablet:left-0 mobile:top-0 mobile:-left-[100rem] mobile:p-5 tablet:p-0">
                <img src="/assets/icon/profile-utils/clip-342.png" alt="clip-342" class="absolute bottom-0 hidden left-0 opacity-30 welcome-user">
                <div id="cancelIcon" class="mobile:absolute tablet:hidden top-6 right-4 z-50 p-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 cursor-pointer hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:rotate-45">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white">
                        <path d="M6.34311 14.8284C5.56206 15.6094 5.56206 16.8758 6.34311 17.6568C7.12416 18.4379 8.39049 18.4379 9.17154 17.6568L12 14.8284L14.8284 17.6568C15.6094 18.4379 16.8758 18.4379 17.6568 17.6568C18.4379 16.8758 18.4379 15.6094 17.6568 14.8284L14.8284 12L17.6568 9.17154C18.4379 8.39049 18.4379 7.12416 17.6568 6.34311C16.8758 5.56206 15.6094 5.56206 14.8284 6.34311L12 9.17154L9.17154 6.34311C8.39049 5.56206 7.12416 5.56206 6.34311 6.34311C5.56206 7.12416 5.56206 8.39049 6.34311 9.17154L9.17154 12L6.34311 14.8284Z" fill="#fff"/>
                    </svg>
                </div>
                <div id="nav-mobile-template"></div>
                <!-- Navigation Menu -->
                <nav id="nav-menu" class="flex w-full mt-4 h-full flex-col tablet:space-y-4 mobile:space-y-6 smallTb:space-y-3 tablet:p-0 smallTb:p-2 mobile:p-0 mobile:rounded-lg tablet:rounded-none mobile:shadow-lg tablet:shadow-none mobile:justify-start mobile:items-start">
                    <!-- Home Link -->
                    <a href="/home" class="header__navigation-link flex items-center space-x-4 mobile:space-x-2 smallTb:space-x-3 transition duration-300 transform hover:scale-105 hover:bg-[#232627]">
                        <img src="/assets/icon/nav/home.svg" alt="home" class="tablet:images__icons-nav mobile:w-7 mobile:h-7 smallTb:w-8 smallTb:h-8">
                        <h2 class="text-lg font-semibold text-white capitalize mobile:text-base smallTb:text-lg">home</h2>
                    </a>
                    <div id="nav-menu-template" class="w-full flex flex-col justify-center">

                    </div>
                </nav>
            </div>
    `;
}
