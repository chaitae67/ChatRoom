const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/chatController');

/**
 * 채팅방 페이지
 * GET /
 */
router.route('/').get(chat);



module.exports = router;