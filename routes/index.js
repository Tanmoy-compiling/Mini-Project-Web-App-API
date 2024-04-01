const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));
router.use('/chatbot', require('./chatbot'));

module.exports = router;