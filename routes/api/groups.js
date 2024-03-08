const express = require('express');
const router = express.Router();
const groupsController = require('../../controllers/api/groups_controller');

router.post('/create-group', groupsController.createGroup);
router.delete('/delete-group/:id', groupsController.deleteGroup);
router.get('/edit-group/:id', groupsController.editGroup);

module.exports = router;