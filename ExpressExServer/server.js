const express = require('express');
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");
const cors = require("cors");
const methodOverride = require('method-override');
const expressLayouts = require("express-ejs-layouts");
const io = socketIO(server);
require('dotenv').config();

const port = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(cors());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes/upload"));
app.use("/chat", require("./routes/chat"));

io.on("connection", (socket)=>{
  console.log("New client connected")
  socket.on("chatting", (data)=>{
    const { name, msg } = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(new Date()).format("h:mm A")
    });
  });
});

server.listen(port, () => {
  console.log(`Express server listening ${port}`);
});