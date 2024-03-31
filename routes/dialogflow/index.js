const express = require('express');
const router = express.Router();
const dialogflow = require('../../controllers/chatbot/dialogflow_controller');

router.post('/process-query', dialogflow.processQuery);


module.exports = router; 