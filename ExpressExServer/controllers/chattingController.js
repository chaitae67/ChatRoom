// chattingController.js

const Chat = require("../models/chat");

const chattingController = {
  saveChat: async (message, user) => {
    const { text, timestamp, sender, type, file } = message;

    // 새 Chat 인스턴스 생성
    const newMessage = new Chat({
      text: text,
      timestamp: timestamp,
      sender: sender,
      type: type,
      file: file
    });

    // 사용자 정보 추가
    newMessage.user = {
      id: user._id,
      name: user.name
    };

    // 데이터베이스에 저장
    await newMessage.save();
    return newMessage;
  }
};

module.exports = chattingController;
