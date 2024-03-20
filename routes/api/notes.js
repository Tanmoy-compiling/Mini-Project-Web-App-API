const express = require("express");
const router = express.Router();
const notesController = require("../../controllers/api/notes_controller");
const { uploadFile, uploadToS3 } = require('../../middlewares/uploadMiddleware');

router.post("/insert-note", [uploadFile, uploadToS3], notesController.insertNote);
router.delete("/delete-note", notesController.deleteNote);
router.post("/fetch-notes", notesController.fetchNotes);

module.exports = router;
