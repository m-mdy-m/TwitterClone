export const getPath = () => window.location.pathname;
export const getMsgElement  = () => document.getElementById("msgElm");
export const isAuth = () => localStorage.getItem("logged");
export const showWelcome = ()=> localStorage.getItem("showWelcomePhoto");
export const clearAuth = () => localStorage.removeItem("logged");
export const clearWelcomePhotoFlag = ()=> localStorage.removeItem('showWelcomePhoto')