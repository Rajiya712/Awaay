const User = require("../models/auth.models");
var jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const {loginUser} = require("../utils/index");

const register = async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    const checkUser = await User.findOne({email: email});
    if (!checkUser) {
      const hashPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      if (user) {
        const {token, info} = await loginUser(user.email, user.password);
        res.cookie("authcookie", token, {maxAge: 3600, httpOnly: true});
        return res.status(200).json({message: "success", user: user});
      }
    }
    return res.status(200).json({message: "user all ready exist"});
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const errors = validationResult(req);
  const {email, password: pass} = req.body;
  // console.log("email", email);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    // const { token, info, error } = await loginUser(email, password);
    const checkUser = await User.findOne({email: email});

    if (!checkUser) {
      return res.status(400).json({message: "User not found."});
    }

    const passwordCheck = await bcrypt.compare(pass, checkUser.password);

    if (!passwordCheck) {
      return res.status(400).json({message: "Incorrect password."});
    }

    const {password, ...rest} = checkUser;

    let token = jwt.sign(
      {
        data: rest, // Assign the relevant user data here
      },
      process.env.E_TICKET_SECRET_KEY || "default_secret_key",
      {expiresIn: "1h"}
    );
    // if (error) {
    //   return res.status(400).json({ message: "something wrong" });
    // }
    return res
      .status(200)
      .json({message: "successfully login.", token, user: checkUser});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const makeAdmin = async (req, res, next) => {
  try {
    const {isAdmin, _id} = req.body;

    const filter = {_id: _id};

    const options = {upsert: true};
    const updateDoc = {
      $set: {
        isAdmin,
      },
    };

    const response = await User.updateOne(filter, updateDoc, options);

    if (!response) {
      return res.status(400).json({message: "something wrong!"});
    }
    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({message: error.message});
  }
};

module.exports = {register, login, makeAdmin};
