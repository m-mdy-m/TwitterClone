// Importing handlers from a separate file
import { onDocumentLoad } from "./nav/navigation-handler.js";
document.addEventListener("DOMContentLoaded", async ()=>{
    onDocumentLoad()
});
