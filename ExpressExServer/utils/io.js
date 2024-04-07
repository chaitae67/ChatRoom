// io.js
const chattingController = require("../controllers/chattingController");
const userController = require("../controllers/userController");

module.exports = function (io) {
  io.on("connection", async(socket) => {
    console.log("Client connected:", socket.id);

    socket.on("login", async(userName, cb) => {
      // 유저정보 저장
      try {
        const user = await userController.saveUser(userName, socket.id);
        cb({ok:true, data:user});
      } catch (err) {
        cb({ok:false, error: err.message});
      }
    });
    socket.on("sendmessage", async (messageToSend, cb) => {
      // 메세지 전송 및 DB 저장
      try {
        const user = await userController.checkUser(socket.id);
        const newMessage = await chattingController.saveChat(messageToSend, user);
        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
