import { showErrorMessage } from "../utils/helper.js";

export function edit_page() {
  document.querySelectorAll(".hidden-edit").forEach((elm) => {
    elm.style.display = "none";
  });
  document.querySelectorAll(".show-edit").forEach((elm) => {
    elm.style.display = "flex";
  });
  const btn = document.querySelector(".btn-change-password ");
  btn.addEventListener("mouseenter", () => {
    setTimeout(() => {
      btn.querySelector("span").style.opacity = "1";
    }, 650);
    btn.style.cssText = "width:9rem;transition: all .6s ease;";
  });
  btn.addEventListener("mouseleave", () => {
    btn.querySelector("span").style.cssText = "opacity:0;";
    btn.style.cssText = "width:2.5rem;transition: all .5s ease;";
  });
  const inputs = document.querySelectorAll(".change-info_user");
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const dataset = e.target.dataset;
      const value = e.target.value;
      for (const key in dataset) {
        if (Object.prototype.hasOwnProperty.call(dataset, key)) {
            try {
                switch (key) {
                  case "inputEmail":
                    const valid = vfyjs.isEmail(value);
                    console.log("valid:", valid);
                    break;
      
                  case "inputUsername":
                    break;
      
                  case "inputBio":
                    break;
                }
            } catch (error) {
                showErrorMessage(error,error,true)
            }
        }
      }
    });
  });
}
