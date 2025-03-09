const express = require("express");
const multer = require("multer");
const path = require("path");
const Document = require("../models/documentModel");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/documents", upload.single("file"), async (req, res) => {
  try {
    const newDocument = new Document({
      document_id: req.body.document_id,
      uploaded_by: req.body.uploaded_by,
      file_name: req.file.filename,
      file_path: req.file.path,
      file_size: req.file.size,
      document_type: req.body.document_type,
      status: req.body.status || "Active"
    });

    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/documents", async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/documents/:id", async (req, res) => {
  try {
    const document = await Document.findOne({ document_id: req.params.id });
    if (!document) return res.status(404).json({ error: "Document not found" });
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/documents/:id", async (req, res) => {
  try {
    const updatedDocument = await Document.findOneAndUpdate(
      { document_id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDocument) return res.status(404).json({ error: "Document not found" });
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/documents/:id", async (req, res) => {
  try {
    const deletedDocument = await Document.findOneAndDelete({ document_id: req.params.id });
    if (!deletedDocument) return res.status(404).json({ error: "Document not found" });
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
