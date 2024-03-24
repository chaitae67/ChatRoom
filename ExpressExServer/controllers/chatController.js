const asyncHandler = require('express-async-handler');
const chatLayout = "../views/layouts/chatLayout.ejs";

/**
 * 채팅방 페이지
 * GET /
 */
const chat = asyncHandler(async (req, res) => {
  res.render("chat", { layout: chatLayout });
});

module.exports = {
  chat
};