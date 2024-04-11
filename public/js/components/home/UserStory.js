export function UserStory({img="/assets/images/profilePic.png",username="m__mdy__m"}={}){
    return `
    <div class="px-2 h-full flex justify-evenly items-center flex-col box_pages-following" >
      <div class="bg-gradient-to-tr from-[#222224] to-[#262629] rounded-full w-16 h-16 flex justify-center items-center border-2 border-[#403e42] shadow-lg  cursor-pointer duration-100 transition-all hover:scale-105 ">
          <img src='${img}' alt="${username}" class="object-cover text-[#C4C4C4] w-full h-full rounded-full">
      </div>
      <h1 class="mt-1 text-sm font-mavis__bold text-white">${username}</h1>
    </div>`
}