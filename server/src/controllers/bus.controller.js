const Bus = require("../models/bus.models");

const getAllBus = async (req, res, next) => {
  try {
    const buses = await Bus.find({});
    if (!buses) {
      return res.status(404).json({message: "bus not foun something wrong!"});
    }
    res.status(200).json(buses);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteBus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bus = await Bus.findByIdAndDelete(id);
    if (!bus) {
      return res.status(404).json({message: "bus not found"});
    }
    res.status(200).json({message: "bus deleted"});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const updateBus = async (req, res, next) => {
  try {
    const newData = req.body;
    const filter = {_id: newData._id};

    const options = {upsert: true};
    const updateDoc = {
      $set: newData,
    };

    const response = await Bus.updateOne(filter, updateDoc, options);

    if (!response) {
      return res.status(404).json({message: "bus not found"});
    }
    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({message: error.message});
  }
};

const createBus = async (req, res, next) => {
  try {
    const busData = req.body;
    if (
      !busData.busId ||
      !busData.totalSeats ||
      !busData.origin ||
      !busData.destination ||
      !busData.busType ||
      !busData.seatPrice ||
      !busData.departureTime
    ) {
      return res.status(400).json({message: "something you miss try again!"});
    }

    const newBus = new Bus(busData);
    const result = await newBus.save();

    if (!result) {
      return res.status(404).json({message: "something wrong!", result});
    }
    res.status(200).json(result);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({message: error.message});
  }
};

module.exports = {
  getAllBus,
  deleteBus,
  updateBus,
  createBus,
};
