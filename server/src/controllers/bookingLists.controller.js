const Ticket = require("../models/ticket.models");
const User = require("../models/auth.models");

const getAllBookingTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.find({});

    if (!ticket) {
      return res.status(404).json({msg: "bus not found something wrong!"});
    }
    let lists = [];

    ticket?.forEach(
      ({
        _id,
        userDetails,
        busId,
        origin,
        destination,
        departureDate,
        purchaseDate,
        departureTime,
        seatNumber,
        ticketPrice,
      }) => {
        lists.push({
          _id,
          userDetails,
          busId,
          origin,
          destination,
          departureDate,
          purchaseDate,
          departureTime,
          seatNumber,
          ticketPrice,
        });
      }
    );

    res.status(200).json(lists);
  } catch (error) {
    console.log(error);
  }
};

const getBookingTicket = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const ticket = await Ticket.find({
      user: ticketId,
    });
    if (!ticket) {
      return res.status(400).json({message: "something wrong!"});
    }
    return res.status(200).json({message: "your ticket", ticket});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteBookingTicket = async (req, res, next) => {
  try {
    const {id} = req.params;
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      return res.status(400).json({msg: "bus not found something wrong!"});
    }
    res.status(200).json({msg: "bus deleted successfully"});
  } catch (error) {
    console.log(error);
  }
};

const bookingTicket = async (req, res, next) => {
  const {
    userId,
    email,
    name,
    busId,
    seatNumber,
    origin,
    destination,
    departureDate,
    departureTime,
    ticketPrice,
  } = req.body;

  if (
    !userId ||
    !email ||
    !name ||
    !busId ||
    !origin ||
    !destination ||
    !departureDate ||
    !departureTime ||
    !ticketPrice ||
    seatNumber?.length === 0
  ) {
    return res.status(400).json({message: "something you miss try again!"});
  }
  console.log("departureDate", departureDate);
  try {
    const newTicketData = {
      userDetails: {userId, email, name},
      busId,
      origin,
      destination,
      departureDate,
      purchaseDate: new Date(),
      // isPayment: false,
      departureTime,
      seatNumber,
      ticketPrice,
    };

    const newTicket = new Ticket(newTicketData);

    const ticket = await newTicket.save();
    console.log("ticket", ticket);
    if (!ticket) {
      return res.status(400).json({message: "something wrong! try again!"});
    }
    return res
      .status(200)
      .json({message: "successfully buy ticket", ticketId: ticket._id});
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

module.exports = {
  getAllBookingTicket,
  deleteBookingTicket,
  bookingTicket,
  getBookingTicket,
};
