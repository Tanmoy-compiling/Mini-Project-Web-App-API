const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/api/users_controller');

router.post('/create-user', usersController.create_user);


module.exports = router;