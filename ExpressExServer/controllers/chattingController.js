// chattingController.js 또는 메시지를 처리하는 서버 측 코드 부분
const Chat = require("../models/chat");

const chattingController = {
  saveChat: async (message, user) => {
    // 클라이언트로부터 받은 메시지 객체에서 text 값을 추출
    const chatContent = message.text; // 메시지 객체가 { text: '메시지 내용', type: 'text' } 형태라고 가정

    // 새 Chat 인스턴스 생성, chat 필드에는 문자열 메시지 저장
    const newMessage = new Chat({
      chat: chatContent,
      user: {
        id: user._id,
        name: user.name,
      },
    });

    // 데이터베이스에 저장
    await newMessage.save();
    return newMessage;
  }
};

module.exports = chattingController;
