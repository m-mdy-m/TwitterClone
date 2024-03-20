function validateAuth(req, validationFailed) {
  // Define validation rules
  const rules = {
    username: "username",
    email: "email",
    password: "password",
    passwordConf: "same:password",
  };
  const errors = req.verifyBody(rules);
  // If there are validation errors, respond with failure
  if (Object.keys(errors).length > 0) {
    validationFailed({ errors });
    return false; // Return false to indicate validation failure
  }

  return true; // Return true to indicate validation success
}
module.exports = {validateAuth}
