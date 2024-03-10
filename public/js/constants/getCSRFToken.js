// Fetch CSRF token from backend
export default async function getCSRFToken() {
  try {
    const response = await axios.get("/get-csrf-token");
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
}
