const express = require('express');
const router = express.Router();
const dialogflow = require('../../config/dialogflow');

router.get('/', dialogflow.runsample);


module.exports = router;