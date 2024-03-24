import { io } from "socket.io-client";

const socket = io("http://220.69.241.101:3001");

socket.on("connect", () => {
  console.log("socket connected");
});

export default socket;
