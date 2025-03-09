const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const { ObjectId } = mongoose.Types; // Import ObjectId from Mongoose



// ✅ MongoDB connection
const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, { bucketName: "uploads" });
});

// ✅ Multer Storage (Buffer ke through file upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Upload File Route
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  const bucket = new GridFSBucket(conn.db, { bucketName: "uploads" });
  const uploadStream = bucket.openUploadStream(req.file.originalname, {
    metadata: { uploadedBy: "Anonymous", uploadedAt: new Date() },
  });

  uploadStream.end(req.file.buffer);
  console.log(req.file)

  uploadStream.on("finish", () => {
    res.status(200).send({ message: "File uploaded successfully", filename: req.file.originalname });
  });

  uploadStream.on("error", () => {
    res.status(500).send("Error uploading file");
  });
});

router.get("/files", async (req, res) => {
    try {
      if (!gfs) {
        return res.status(500).json({ error: "GridFS not initialized" });
      }
  
      const cursor = gfs.find({});
      const files = await cursor.toArray();
  
      console.log("Files fetched from the database:", files); // Add this line to debug
  
      if (!files || files.length === 0) {
        return res.status(404).json({ message: "No files found" });
      }
  
      res.json({
        files: files.map((file) => ({
          _id: file._id,
          filename: file.filename,
          uploadedAt: file.uploadDate || new Date(),
        })),
      });
    } catch (error) {
      console.error("❌ Error fetching files:", error);
      res.status(500).json({ error: "Failed to fetch files" });
    }
  });
  
  router.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;

    // Find the file in GridFS
    gfs.find({ filename }).toArray((err, files) => {
        if (err || files.length === 0) {
            return res.status(404).send('File not found');
        }

        const file = files[0];
        // Set the content type of the file based on the file type
        res.set('Content-Type', file.contentType);
    });
});
router.get("/files/downloads/:fileId", (req, res)=>{
    let {fileId} = req.params

    let downloadStream = gfs.openDownloadStream( new mongoose.Types.ObjectId(fileId))

    downloadStream.on("file", (file)=>{
        res.set("Content-Type", file.contentType)
    })

    downloadStream.pipe(res)
})

module.exports = router;
