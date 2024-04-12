export function sender({content}){
    return `
<div class="flex justify-end">
    <div class="message-sender bg-blue-500 text-white max-w-96">
        <p>${content}</p>
    </div>
</div>`
}

export function recipient({content}){
    return `
    <div class="flex justify-start">
        <div class="message-recipient bg-gray-200 text-black max-w-96">
            <p>${content}</p>
        </div>
    </div>`
}