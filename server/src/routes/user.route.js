const express = require("express");
const {getAllUsers} = require("../controllers/user.controller");
const router = express.Router();

router.get("/getAll-user", getAllUsers);

// router.get("/my-ticket/:id", myTicket);
module.exports = router;
