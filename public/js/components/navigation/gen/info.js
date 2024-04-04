export function statusUser(userStats) {
  let template = "";
  userStats.forEach(({ id, value, unit, label }) => {
    template += `
    <!-- ${label} -->
    <div id="${id}" class="text-center text-white rounded-lg tablet:p-4 mobile:p-1 smallTb:p-2">
        <span class="header__navigation-info-user">${value}<i>${unit}</i></span>
        <p class="header__navigation-info-user-text">${label}</p>
    </div>
    `;
  });
  return template;
}
