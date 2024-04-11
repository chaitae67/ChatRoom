// models/chat.js

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  sender: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'text'
  },
  file: String, // 이미지 파일의 URL 또는 경로를 저장할 수 있도록 문자열 필드 추가
  fileType: String // 파일의 종류를 저장할 수 있도록 파일 유형을 나타내는 필드 추가 (예: 'image/jpeg', 'image/png' 등)
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
