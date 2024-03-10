// Fetch CSRF token from backend
export async function getCSRFToken() {
  try {
    const response = await axios.get("/get-csrf-token");
    console.log("response csrf token =>", response);
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
}
