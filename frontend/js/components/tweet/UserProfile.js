export function UserProfile({ username, profile ,width,height}) {
  return `
<div class="bg-gradient-to-tr from-[#222224] to-[#262629] rounded-full flex justify-center items-center border border-[#403e42] shadow-lg cursor-pointer duration-100 transition-all hover:scale-105">
    <img src="${profile}" alt="${username}" class="profilePic w-${width} h-${height}">
</div>`;
}
