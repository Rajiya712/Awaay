const Ticket = require("../models/ticket.models");

const myTicket = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const ticket = await Ticket.find({
      "userDetails.userId": ticketId,
    });
    if (!ticket) {
      return res.status(400).json({message: "something wrong!"});
    }
    return res.status(200).json({message: "your ticket", ticket});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    if (!tickets) {
      return res.status(400).json({message: "something wrong!"});
    }
    // console.log("tickets", tickets);
    return res
      .status(200)
      .json({message: "sucessfully reterive ticket from db", tickets});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const ticketById = async (req, res) => {
  try {
    const {id} = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(400).json({message: "ticket not found"});
    }
    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {myTicket, getAllTickets, ticketById};
