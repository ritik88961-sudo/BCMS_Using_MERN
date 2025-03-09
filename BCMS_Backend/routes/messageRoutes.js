const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/:username/:contactUsername", messageController.getChatHistory);
router.post("/send", messageController.sendMessage);

module.exports = router;
