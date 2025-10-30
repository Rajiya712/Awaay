const http = require("http");
const config = require("config");
const app = require("./app");
const db = require("./db");

const server = http.createServer(app);

//server listen
server.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.HOST}${process.env.PORT}`);
});
