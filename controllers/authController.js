const authService = require('../services/auth.service');


async function registerUserController(req, res) {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const { user, token } = await authService.registerUser(firstName, lastName, email, password, role);
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error in registerUserController:', error.message);
        res.status(400).json({ message: error.message });
    }
}

//log in
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser(email, password);
        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Error in loginUserController:', error.message);
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    registerUserController,
    loginUserController
};