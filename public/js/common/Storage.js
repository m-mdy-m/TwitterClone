export const isAuth = () => localStorage.getItem("logged");
export const clearAuth = () => localStorage.removeItem("logged");
export const clearWelcomeMsg = ()=> localStorage.removeItem('showWelcomePhoto')