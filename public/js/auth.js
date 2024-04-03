import { formHandler } from "./auth/formHandler.js";
import { getPath } from "./utils/utils.js";
export function authPage() {
  const path = getPath();
  const form = document.getElementById("registerForm");
  formHandler(form, path);
}
