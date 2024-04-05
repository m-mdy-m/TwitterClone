export function UserProfileInformation({ username, bio }) {
  return `        
    <!-- User Name -->
    <h2 class="username font-Aktiv__regular tablet:text-xl mobile:text-base mt-4 mobile:mt-2 smallTb:text-lg smallTb:mt-3 text-white">${username}</h2>
    <!-- Bio -->
    <p id="bio" class="text-center mt-2 text-gray-400 mobile:text-sm smallTb:text-base overflow-hidden whitespace-nowrap overflow-ellipsis">${bio}</p>`;
}
