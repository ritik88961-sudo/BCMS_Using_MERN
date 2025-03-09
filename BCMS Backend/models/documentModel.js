const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  uploaded_by: { type: Number, required: true },
  file_name: { type: String, required: true },
  file_path: { type: String, required: true },
  file_size: { type: Number, required: true },
  uploaded_at: { type: Date, default: Date.now },
  document_type: { type: String, enum: ["PDF", "Word", "Excel"], required: true },
  status: { type: String, enum: ["Active", "Archived"], default: "Active" }
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
