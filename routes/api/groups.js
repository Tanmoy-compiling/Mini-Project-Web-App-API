const express = require("express");
const router = express.Router();
const groupsController = require("../../controllers/api/groups_controller");

router.post("/create-group", groupsController.createGroup);
router.delete("/delete-group/:groupid", groupsController.deleteGroup);
router.post("/edit-group/:groupid", groupsController.editGroup);

module.exports = router;
