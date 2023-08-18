
const express = require('express');
const router  = express.Router();

const userController = require('../controllers/user');

router.post('/user/signup',userController.postUserSignup);

router.post('/user/login',userController.postUserLogin);

module.exports = router;