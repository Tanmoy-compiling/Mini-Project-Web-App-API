const express = require('express');
const router = express.Router();
const twilio = require('../../services/twilio');

router.post('/',twilio.sendSMS);


module.exports = router;