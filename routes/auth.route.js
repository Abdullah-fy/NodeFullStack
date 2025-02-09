const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup',authController.signup);
router.post('/login',authController.login);

router.post('/forgetPassword',authController.forgotPassword);
router.patch('/resetPassword/:token',authController.resetPassword);
// update the password
router.patch('/updataMyPassword', authController.protect, authController.updatePassword);


module.exports = router;


// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/register', authController.registerUserController);
// router.post('/login', authController.loginUserController);

// module.exports = router;

