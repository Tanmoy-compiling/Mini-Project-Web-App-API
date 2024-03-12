const express = require("express");
const router = express.Router();
const notesController = require("../../controllers/api/notes_controller");

router.post("/insert-note", notesController.insertNote);
router.delete("/delete-note", notesController.deleteNote);

module.exports = router;
