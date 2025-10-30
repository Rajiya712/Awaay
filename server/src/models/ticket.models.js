const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  seatNumber: {
    type: [Number],
    required: true,
  },
  busId: {
    type: String,
    required: true,
  },
  userDetails: {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
});
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
