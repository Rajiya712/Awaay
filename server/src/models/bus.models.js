const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: String,
    required: true,
    default: 52,
  },
  origin: {
    type: String,
    required: true,
    default: "",
  },
  destination: {
    type: String,
    required: true,
    default: "",
  },
  busType: {
    type: String,
    required: true,
    default: "Non-AC",
  },
  seatPrice: {
    type: String,
    required: true,
    default: "00",
  },
  departureTime: {
    type: String,
    required: true,
    default: "00:00",
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
