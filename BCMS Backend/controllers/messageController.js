const Message = require("../models/Message");

/**
 * Get chat history between two users
 */
exports.getChatHistory = async (req, res) => {
    try {
        const { username, contactUsername } = req.params;
        const messages = await Message.find({
            $or: [
                { senderUsername: username, receiverUsername: contactUsername },
                { senderUsername: contactUsername, receiverUsername: username }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

/**
 * Send a message via HTTP (for testing)
 */
exports.sendMessage = async (req, res) => {
    try {
        const { senderUsername, receiverUsername, message } = req.body;
        const newMessage = new Message({ senderUsername, receiverUsername, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Failed to send message", error });
    }
};
