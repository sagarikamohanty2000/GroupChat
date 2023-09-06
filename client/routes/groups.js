const express = require('express');
const router  = express.Router();

const groupController = require('../controllers/groups');
const authMiddleware = require('../middleware/auth');

router.post('/createGroup',authMiddleware.authenticateUser,groupController.postCreateGroup);

router.get('/allgroups',authMiddleware.authenticateUser,groupController.getAllGroup);

router.get('/openChat/:groupId',authMiddleware.authenticateUser,groupController.getAllGroup);

router.post('/addUser',authMiddleware.authenticateUser,groupController.adduserGroup);

module.exports = router;