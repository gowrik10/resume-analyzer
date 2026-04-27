const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const aiService = require("../services/aiService");

const router = express.Router();
const upload = multer();

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    const text = data.text;

    const jobDescription = req.body.jobDescription || "";

    const result = await aiService(text, jobDescription);

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

module.exports = router;