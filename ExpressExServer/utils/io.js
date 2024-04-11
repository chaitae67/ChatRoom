const chattingController = require("../controllers/chattingController");
const userController = require("../controllers/userController");
const Chat = require("../models/chat"); // Chat 모델 import

module.exports = function (io) {
  io.on("connection", async(socket) => {
    console.log("Client connected:", socket.id);

    socket.on("login", async(userName, cb) => {
      try {
        const user = await userController.saveUser(userName, socket.id);
        cb({ ok: true, data: user });
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });

    socket.on('sendmessage', async (messageToSend, cb) => {
      try {
        const user = await userController.checkUser(socket.id);
        if (!user) {
          cb({ ok: false, error: 'User not found.' });
          return;
        }
    
        if (messageToSend.type === 'text' || messageToSend.type === 'img') {
          const newMessage = {
            text: messageToSend.text,
            timestamp: messageToSend.timestamp || Date.now(),
            sender: messageToSend.sender,
            type: messageToSend.type,
            file: messageToSend.file,
            fileType: messageToSend.file ? 'image' : undefined
          };
    
          // 이미지를 보내는 경우에도 receive 이벤트를 발생시키도록 수정
          socket.broadcast.emit('receive', newMessage);
          cb({ ok: true, message: newMessage });
        } else {
          cb({ ok: false, error: 'Unsupported message type' });
        }
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });
    

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
