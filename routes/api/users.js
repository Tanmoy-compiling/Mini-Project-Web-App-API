const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users_controller');

//to create a new user at sign up
router.post('/create-user', usersController.createUser);
//to create a new session at log in
router.post('/create-session', usersController.createSession)

module.exports = router;