// Function to handle form submission
import { getCSRFHeader, upHeader} from "../common/handlers.js";
import { handleNotSuccess, handleServerError, handleSuccess } from "../utils/helper.js";
import { handleFormValidation, validationCount } from "./utils.js";
const form = document.getElementById("registerForm");
handleFormValidation();
export async function handleSubmit(e, submitUrl) {
  e.preventDefault();
  // Ensure that form validation count meets the required threshold
  if (validationCount >= 3) {
    try {
      const headers  = await getCSRFHeader()
      // Collect form data
      const formData = new FormData(form);
      // Convert form data to object
      const requestData = Object.fromEntries(formData.entries());
      // Send form data to the server via POST request
      const response = await axios.post(submitUrl, requestData, headers);
      // Handle server response based on success or failure
      if (response.data.success) {
        const user = response.data.data
        // If the server indicates success, handle accordingly
        handleSuccess(form,response.data.message);
        // Set the 'showWelcomePhoto' flag to 'true' in localStorage
        localStorage.setItem("showWelcomePhoto", response.data.success);
        localStorage.setItem("logged", response.data.success);
        upHeader(user)
      } else {
        // If the server indicates failure, handle accordingly
        handleNotSuccess(response.data);
      }
    } catch (error) {
      // Handle any errors that occur during the form submission process
      handleServerError(form,error);
    }
  }else{
     // If validation count is less than 3, display error message
     handleNotSuccess({ message: "Please complete the form correctly." });
  }
}

