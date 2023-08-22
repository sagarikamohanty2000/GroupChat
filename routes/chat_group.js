const express = require('express');
const router  = express.Router();

const groupController = require('../controllers/chat_group');
const authMiddleware = require('../middleware/auth');

router.post('/createGroup',authMiddleware.authenticateUser,groupController.postCreateGroup);

router.get('/allgroups',authMiddleware.authenticateUser,groupController.getAllGroup);

router.get('/openChat/:groupId',authMiddleware.authenticateUser,groupController.getAllGroup)

module.exports = router;