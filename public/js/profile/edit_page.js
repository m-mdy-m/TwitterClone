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
    }, 700);
    btn.style.cssText = "width:9rem;transition: all 1s ease;";
  });
  btn.addEventListener("mouseleave", () => {
    btn.querySelector("span").style.cssText = "opacity:0;";
    btn.style.cssText = "width:2.5rem;transition: all .5s ease;";
  });
  const inputs = document.querySelectorAll(".change-info_user");
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const dataset = e.target.dataset;
      for (const key in dataset) {
        if (Object.prototype.hasOwnProperty.call(dataset, key)) {
          switch (key) {
            case "inputEmail":
                console.log('hi')
              break;

            case "inputUsername":
              break;

            case "inputBio":
              break;
          }
        }
      }
    });
  });
}
