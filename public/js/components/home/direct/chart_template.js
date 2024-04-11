export function chat_template({img}){
    return `
    <div class="pr-4 h-full w-full">
        <div class="grid grid-rows-box_tweet h-full w-full bg-[#1110109a] border-[#111010] rounded-xl">
            <div class="p-2">
                <div class="w-full h-full origin-bottom ">
                    <img src="${img}" class="object-cover w-full h-full rounded-md origin-bottom ">
                </div>
            </div>
            <div class="h-full w-full flex flex-col justify-center items-center">

            <div>
            <input type="text" placeholder="Type your message...">
            <button class="bg-red-700 p-2 ">Send</button>
            
            </div>
            </div>
        </div>
    </div>
    `
}