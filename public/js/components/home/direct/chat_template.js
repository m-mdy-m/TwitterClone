export function chat_template({img}){
    return `
    <div class="pr-4 h-full w-full">
        <div class="grid grid-rows-box_tweet h-full w-full bg-[#1110109a] border-[#111010] rounded-xl">
            <div class="w-full h-full p-2 origin-bottom ">
                <img src="${img}" class="object-cover w-full h-full rounded-md origin-bottom ">
            </div>
            <div class="grid grid-rows-chat_box">
                <div class="border-4 border-[#3a3c3d] bg-red-600 rounded-xl relative">
                    <div class="bg-green-300 w-44 h-8 font-Aktiv__regular p-1 rounded-md block absolute bottom-2 right-2">
                        <p> hi mahdi are you okay? </p>
                    </div>

                </div>
                <div class="flex justify-center items-center relative ">
                    <button class="bg-sky-400 hover:bg-sky-900 absolute transition-all duration-150 px-2 py-1 left-1 h-3/4 rounded-md capitalize">send</button>
                    <textarea placeholder="What's happening?" class="absolute bg-transparent right-0 px-2 ml-4 rounded-md w-11/12 border-r-transparent border-l-transparent border-b border-[#161617] text-gray-300 outline-none transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none overflow-y-hidden"></textarea>
                </div>
            </div>
        </div>
    </div>
    `
}