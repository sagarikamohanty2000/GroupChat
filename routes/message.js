const express = require('express');
const router  = express.Router();

const messageController = require('../controllers/message');
const authMiddleware = require('../middleware/auth');

router.post('/message/',authMiddleware.authenticateUser,messageController.postSentMessage);

module.exports = router;