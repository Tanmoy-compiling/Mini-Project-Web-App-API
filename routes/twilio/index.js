const express = require('express');
const router = express.Router();
const twilio = require('../../config/twilio');

router.post('/',twilio.sendSMS);


module.exports = router;