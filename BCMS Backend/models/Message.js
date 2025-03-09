const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    senderUsername: { type: String, required: true },
    receiverUsername: { type: String, required: true }, 
    message: { type: String, required: true },
    delivered: { type: Boolean, default: false }, 
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);
