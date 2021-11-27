const chatController = require('../controllers/chatController');

var express = require('express');
var router = express.Router();

router.post('/addChatMessage', chatController.addChatMessage);
router.get('/getChatMessage', chatController.getChatMessage);

module.exports = router;