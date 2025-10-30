const mongoose = require("mongoose");

const avatar =
  "https://cdn-icons-png.flaticon.com/256/666/666201.png?fbclid=IwAR06ZJi_ZgM-pSidKU4DL0_VxgaW9FNLCqQmyURoX_1bUzEVWShlCP0eYD4";

const authSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required!"],
    },
    lastName: {
      type: String,
      
    },
    email: {
      type: String,
      required: [true, "email is required!"],
    },
    password: {
      type: String,
      required: [true, "password is required!"],
      min: [6, "please! chose password more then 6 charactar"],
      max: [12, "please! chose password lessthan 12 charactar"],
    },

    img: {
      type: String,
      default: avatar,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", authSchema);
module.exports = User;
// npm i
