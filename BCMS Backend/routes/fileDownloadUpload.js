const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const ensureUserFolder = (username) => {
  const userFolder = path.join(__dirname, "../uploads", username);
  if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder, { recursive: true });
  }
  return userFolder;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.body.username;
    if (!username) return cb(new Error("Username is required"), false);

    const userFolder = ensureUserFolder(username);
    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = `/uploads/${req.body.username}/${req.file.filename}`;
  res.json({ message: "File uploaded successfully", filePath });
});

router.get("/files", (req, res) => {
  const uploadsDir = path.join(__dirname, "../uploads");

  fs.readdir(uploadsDir, (err, users) => {
    if (err) return res.status(500).json({ error: "Unable to fetch files" });

    let files = [];
    users.forEach((user) => {
      const userPath = path.join(uploadsDir, user);
      if (fs.statSync(userPath).isDirectory()) {
        fs.readdirSync(userPath).forEach((file) => {
          files.push({ username: user, filename: file, path: `/uploads/${user}/${file}` });
        });
      }
    });

    res.json(files);
  });
});

router.get("/download/:username/:filename", (req, res) => {
  const { username, filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", username, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

module.exports = router;
