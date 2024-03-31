const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));
router.use('/dialogflow', require('./dialogflow'));
router.use('/twilio', require('./twilio'));

module.exports = router;