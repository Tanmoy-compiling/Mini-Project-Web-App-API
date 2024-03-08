const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users_controller');

router.post('/create-user', usersController.createUser);
router.post('/create-session', usersController.createSession)

module.exports = router;