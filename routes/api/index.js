const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/groups', require('./groups'));
router.use('/members', require('./members'));
router.use('/notes', require('./notes'));

module.exports = router;