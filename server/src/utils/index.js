const User = require("../models/auth.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.loginUser = async function (email, userPassword) {
  try {
    const checkUser = await User.findOne({ email: email });

    if (!checkUser) {
      return { token: null, info: null, error: "User not found." };
    }

    const passwordCheck = await bcrypt.compare(
      userPassword,
      checkUser.password
    );

    if (!passwordCheck) {
      return { token: null, info: null, error: "Incorrect password." };
    }

    const { password, ...rest } = checkUser;

    let token = jwt.sign(
      {
        data: rest, // Assign the relevant user data here
      },
      process.env.E_TICKET_SECRET_KEY || "default_secret_key",
      { expiresIn: "1h" }
    );

    return { token, info: rest, error: null };
  } catch (error) {
    console.log(error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
};
