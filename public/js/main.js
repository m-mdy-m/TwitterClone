// Importing handlers from a separate file
import { onDocumentLoad } from "./nav/navigation-handler.js";
import { iconsHandler } from "./tweets/tweetHandlers.js";
document.addEventListener("DOMContentLoaded", async ()=>{
    onDocumentLoad()
    iconsHandler()
});
