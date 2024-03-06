const logout = document.querySelector(".logout");
logout.addEventListener("click", async () => {
  try {
    const response = await axios.post("/auth/logout");
    console.log("response =>", response);
  } catch (error) {
    console.log("error =>", error);
  }
});
