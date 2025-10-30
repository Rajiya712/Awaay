const express = require("express");
const morgan = require("morgan");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

require("dotenv").config();

// routers
const authRoute = require("./routes/auth.route");
const busRoute = require("./routes/bus.route");
const ticketRoute = require("./routes/ticket.route");
const booking = require("./routes/booking.route");
const user = require("./routes/user.route");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

console.log("dev URI", process.env.DB_URI);

//middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", corsOptions.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cors(corsOptions));

app.use(morgan("combined"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// auth route
app.use("/api/auth", authRoute);
app.use("/api", busRoute);
app.use("/api", ticketRoute);
app.use("/api", booking);
app.use("/api", user);

app.get("/", (req, res) => {
  res.status(200).json({message: "home route"});
});

//404 route
app.use((req, res, next) => {
  res.status(404).json({message: "Route not found"});
});

module.exports = app;
