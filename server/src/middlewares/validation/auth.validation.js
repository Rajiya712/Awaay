const {check, body} = require("express-validator");
const createUserValidate = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("name is required! please provide name Field "),
    body("lastName")
      .optional(),
    
    body("email")
      .notEmpty()
      .withMessage("email is required! please provide name Field"),
    body("password")
      .notEmpty()
      .withMessage("password is required! please provide name Field"),
  ];
};
const loginUserValidate = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required! please provide name Field"),
    body("password")
      .notEmpty()
      .withMessage("password is required! please provide name Field"),
  ];
};
module.exports = {
  createUserValidate,
  loginUserValidate,
};
