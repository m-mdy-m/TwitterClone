export function  template_direct({bio,username,profile}){
    return `
    <div data-username="${username}" class="directs_users w-full my-2 p-2 px-4  delay-75 bg-[#11101076] hover:ml-2 hover:scale-105  hover:bg-[#262525a1] cursor-pointer transition-all rounded-r-lg flex justify-start items-center border-b border-[#252424]">
        <div class="w-12 h-12 border border-[#403e42] rounded-full p-0.5">
            <img src="${profile}" alt="" class=" rounded-full w-full h-full object-cover">
        </div>
        <div class="flex justify-center flex-col text-[#ffffffee] pl-2">
            <h1 class="text-sm font-Aktiv__medium">${username}</h1>
            <p class="text-xs font-mavis__bold">${bio}</p>
        </div>
    </div>`
}