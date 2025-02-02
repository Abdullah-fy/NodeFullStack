const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.createUserController);
router.get('/', userController.getAllUsersController);
router.get('/:email', userController.getUserByEmailController);
router.put('/:id', userController.updateUserController);
router.delete('/:id', userController.deleteUserController);

module.exports = router;
