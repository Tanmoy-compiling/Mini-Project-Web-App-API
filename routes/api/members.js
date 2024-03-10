const express = require("express");
const router = express.Router();
const membersController = require("../../controllers/api/members_controller");

router.get('/add-member', membersController.addMember);
router.get('/remove-member', membersController.removeMember);

module.exports = router;
