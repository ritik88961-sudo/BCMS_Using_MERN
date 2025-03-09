const Message = require("../models/Message");

/**
 * Save message if receiver is offline
 */
const saveMessage = async (senderId, receiverId, message) => {
    return await Message.create({ sender: senderId, receiver: receiverId, message });
};

/**
 * Get all undelivered messages for a user
 */
const getPendingMessages = async (receiverId) => {
    return await Message.find({ receiver: receiverId, delivered: false }).populate("sender", "username");
};

/**
 * Mark messages as delivered when user comes online
 */
const markMessagesAsDelivered = async (receiverId) => {
    return await Message.updateMany({ receiver: receiverId, delivered: true });
};

module.exports = {
    saveMessage,
    getPendingMessages,
    markMessagesAsDelivered,
};
