import { loadInfo } from "./profile/loadInfo.js";
import { getUserProfile } from "./profile/menuProfile.js";

export async  function initPage() {
    getUserProfile()
}
