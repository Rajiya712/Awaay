const User = require("../models/auth.models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(400).json({message: "something wrong!"});
    }
    // console.log("users", users);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {getAllUsers};
