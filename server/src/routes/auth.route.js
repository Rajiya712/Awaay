const express = require("express");
const {register, login, makeAdmin} = require("../controllers/auth.controllers");
const {createUserValidate, loginUserValidate} = require("../middlewares/index");
const router = express.Router();

//register route
router.post("/register", createUserValidate(), register);

//login route
router.post("/login", loginUserValidate(), login);

router.put("/make-admin", makeAdmin);
module.exports = router;
