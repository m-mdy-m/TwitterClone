const formGroup = document.querySelectorAll(".form-group");
const form = document.getElementById("registerForm");
const msgErrors = document.querySelectorAll(".msg-error");
const valid = "#90EE90";
const invalid = "#d04848";
let passwordFiled;
let count = 0;
function isValidations(isValue) {
  return isValue ? count++ : count--;
}
function handleErrorMessage(name, msg, input, i) {
  const isMsg = (msg, i) => {
    if (msg) {
      input.style.backgroundColor = invalid;
      i.innerHTML = msg;
    } else {
      input.style.backgroundColor = valid;
      i.innerHTML = null;
      i.style.background = "transparent";
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
  i.style.background = "transparent";
  input.addEventListener("input", () => {
    let name = input.name,
      isValid,
      msg = null;

    try {
      i.style.background = "#ff004ca1";
      switch (name) {
        case "username":
          isValid = vfyjs.isUsername(input);
          isValidations(isValid);
          break;
        case "email":
          isValid = vfyjs.isEmail(input);
          isValidations(isValid);
          break;
        case "password":
          passwordFiled = input.value;
          isValid = vfyjs.isPassword(input);
          isValidations(isValid);
          break;
        case "passwordConf":
          let Confirm = input.value;
          isValid = Confirm === passwordFiled;
          if (!msg) {
            msg = "password do not match";
          }
          if (isValid && msg) {
            msg = null;
            count++;
          }
      }
    } catch (error) {
      msg = error.message;
    }
    handleErrorMessage(name, msg, input, i);
  });
  console.log(count);
});
