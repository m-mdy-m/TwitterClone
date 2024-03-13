export function GenerateLink(links) {
  let template = "";
  links.forEach((href) => {
    template += `
    <!-- ${href} Link -->
  <a href="/${href}" class="header__navigation-link flex items-center space-x-4 mobile:space-x-2 smallTb:space-x-3 transition duration-300 transform hover:scale-105 hover:bg-[#232627]">
      <img src="/assets/icon/nav/${href}.svg" alt="${href}" class="tablet:images__icons-nav mobile:w-7 mobile:h-7 smallTb:w-8 smallTb:h-8">
      <h2 class="text-lg font-semibold text-white capitalize mobile:text-base smallTb:text-lg">${href}</h2>
  </a>`;
  });
  return template;
}
