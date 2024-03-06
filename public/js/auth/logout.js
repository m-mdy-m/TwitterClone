const logoutButton = document.querySelector(".logout");
async function logout() {
  try {
    const response = await axios.post("/auth/logout");
    console.log("Logout response:", response);
    // Optionally, perform additional actions after logout
  } catch (error) {
    console.error("Logout error:", error);
  }
}
logoutButton.addEventListener("click", logout);
export default logout;
