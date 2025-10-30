const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connection succesfull");
});

module.exports = db;
