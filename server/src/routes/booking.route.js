const express = require("express");
const router = express.Router();
const {
  getAllBookingTicket,
  deleteBookingTicket,
  bookingTicket,
  getBookingTicket,
} = require("../controllers/bookingLists.controller");

router.get("/booking-lists", getAllBookingTicket);
router.get("/booking-lists/:id", getBookingTicket);
router.post("/booking-ticket", bookingTicket);
router.delete("/booking-lists/:id", deleteBookingTicket);

module.exports = router;
