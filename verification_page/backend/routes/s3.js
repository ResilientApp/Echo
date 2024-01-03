const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/s3Controller");

// Route for file upload
router.post("/", uploadFile);

module.exports = router;
