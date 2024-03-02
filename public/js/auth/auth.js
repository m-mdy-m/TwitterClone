const formGroup = document.querySelectorAll(".form-group");
const msgErrors = document.querySelectorAll(".msg-error");
const valid = "#90EE90";
const invalid = "#d04848";
let passwordFiled;

function handleErrorMessage(name, msg, input, i) {
  const isMsg = (msg, i) => {
    if (msg) {
      input.style.backgroundColor = invalid;
      i.innerHTML = msg;
    } else {
      input.style.backgroundColor = valid;
      i.innerHTML = null;
    }
  };
  switch (name) {
    case "username":
    case "email":
    case "password":
    case "passwordConf":
      isMsg(msg, i);
      break;
  }
}

formGroup.forEach((forms) => {
  const input = forms.querySelector("input");
  const i = forms.querySelector("i");
  input.addEventListener("input", () => {
    let name = input.name,
      isValid,
      msg;

    try {
      switch (name) {
        case "username":
          isValid = vfyjs.isUsername(input);
          break;
        case "email":
          isValid = vfyjs.isEmail(input);
          break;
        case "password":
          passwordFiled = input.value;
          isValid = vfyjs.isPassword(input);
          break;
        case "passwordConf":
          let Confirm = input.value;
          isValid = Confirm === passwordFiled;
          if (!msg) {
            msg = "password do not match";
          }
          if (isValid && msg) {
            msg = null;
          }
      }
    } catch (error) {
      msg = error.message;
    }
    handleErrorMessage(name, msg, input, i);
  });
});
