const express = require("express");
const router = express.Router();
const {
  getAllBus,
  deleteBus,
  updateBus,
  createBus,
} = require("../controllers/bus.controller");

router.get("/bus", getAllBus);
router.post("/bus", createBus);
router.delete("/bus/:id", deleteBus);
router.put("/bus", updateBus);

module.exports = router;
