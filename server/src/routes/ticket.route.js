const express = require("express");
const router = express.Router();
const {
  myTicket,
  getAllTickets,
  ticketById,
} = require("../controllers/my.ticket.controller");

router.get("/getAll-ticket", getAllTickets);
router.get("/my-ticket/:id", myTicket);
router.get("/ticket/:id", ticketById);

module.exports = router;
