const chatController = require('../controllers/chatController');
const { checkAuth } = require("../Utils/passport");

var express = require('express');
var router = express.Router();

router.post('/addChatMessage', checkAuth, chatController.addChatMessage);
router.get('/getChatMessage', checkAuth, chatController.getChatMessage);

module.exports = router;