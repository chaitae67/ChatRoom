const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chat: {
    type: String,
    required: false, // 텍스트 메시지가 없는 경우를 대비해 필수는 아님
  },
  image: {
    type: String,
    required: false, // 이미지가 없는 경우를 대비해 필수는 아님
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId 타입 정확히 명시
      ref: "User",
    },
    name: String,
  },
},
  { timestamps: true } // 'timestamp'에서 'timestamps'로 수정하여 생성 시간과 수정 시간을 자동으로 관리
);

module.exports = mongoose.model("Chat", chatSchema);