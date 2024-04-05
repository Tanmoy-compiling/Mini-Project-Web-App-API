const express = require('express');
const router = express.Router();
const twilio = require('../../services/twilio');

router.post('/sendMessage',twilio.sendSMS);
router.post('/recvMessage',twilio.recvMessage);
router.post('/test',twilio.recvMessage);


module.exports = router;