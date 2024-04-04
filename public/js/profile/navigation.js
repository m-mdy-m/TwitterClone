import { randomColor } from "../utils/utils.js";

export function menuProfile() {
  const navProfile = document.querySelector(".nav__profile-user");

  navProfile.querySelectorAll(".icons").forEach((icon)=>{
    icon.addEventListener('mouseenter',()=>{
        icon.style.cssText = `background: ${randomColor()}; transition: all 0.5s ease;`;
        const tagP = icon.querySelector('p');
        tagP.style.cssText = 'display: block; transition: all 0.3s ease;';
    })
  });
  navProfile.querySelectorAll(".icons").forEach((icon)=>{
    icon.addEventListener('mouseleave',()=>{
        icon.style.cssText = `background: auto;transition: all 0.3s ease;`;
        const tagP = icon.querySelector('p');
        tagP.style.cssText = 'display: none; transition: all 0.3s ease;';
    })
  });
}
