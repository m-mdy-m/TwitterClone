export function chat_template({img}){
    return `
    <div class="pr-4 h-full w-full">
        <div class="grid grid-rows-box_tweet h-full w-full bg-[#1110109a] border-[#111010] rounded-xl">
            <div class="w-full h-full p-2 origin-bottom ">
                <img src="${img}" class="object-cover w-full h-full rounded-md origin-bottom ">
            </div>
            <div class="grid grid-rows-chat_box">
                <div class="border-4 border-white bg-red-600">


                </div>
                <div class="flex justify-center items-center relative p-2">
                 <textarea placeholder="What's happening?" class=" bg-green-400 right-0 h-auto w-11/12 absolute bg-transparent border-r-transparent border-l-transparent border-b border-[#161617] text-gray-300 outline-none transition-all focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none overflow-y-hidden"></textarea>
                  <button class="absolute bg-blue-600 px-2 py-1 left-1 rounded-md capitalize">send</button>
                </div>
            </div>
        </div>
    </div>
    `
}