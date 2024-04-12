import { getUserProfile } from "./profile/menuProfile.js";
export async function initPage() {
  await getUserProfile();
 
}
