// Define a function to validate authentication input
function validateAuth(req, validationFailed) {
  // Define validation rules
  const rules = {
    username: "username",
    email: "email",
    password: "password",
    passwordConf: "same:password",
  };

  // Verify user input against defined rules
  const errors = req.verifyBody(rules);

  // If there are validation errors, respond with failure
  if (Object.keys(errors).length > 0) {
    validationFailed({ errors });
    return false; // Return false to indicate validation failure
  }

  return true; // Return true to indicate validation success
}

// Export the validateAuth function for reuse in other modules
module.exports = { validateAuth };
