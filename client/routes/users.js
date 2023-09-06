
const express = require('express');
const router  = express.Router();

const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.post('/user/signup',userController.postUserSignup);

router.post('/user/login',userController.postUserLogin);

router.get('/user/:groupId',authMiddleware.authenticateUser,userController.getAllUsersGroups);

router.put('/user/admin/',authMiddleware.authenticateUser,userController.updateAdmin);

router.delete('/user/remove/:groupId/:userId',authMiddleware.authenticateUser,userController.removeUser);

router.get('/user/',authMiddleware.authenticateUser,userController.getAllUsers);

module.exports = router;