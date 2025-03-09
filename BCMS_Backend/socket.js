const socketIo = require("socket.io");
const message = require("./models/Message")
const User = require("./models/user")
module.exports = (server) => {
    const io = socketIo(server, { cors: { origin: "*" } });

    let users = {}; // Store user socket IDs
    let allUsers = []

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("join", (username) => {
            users[username] = socket.id; // Store username with socket ID
            io.emit("userList", Object.keys(users)); // Send updated user list
        });

        socket.on("sendMessage", ({ sender, receiver, message }) => {
            const receiverSocketId = users[receiver]; // Get receiver's socket ID
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receiveMessage", { sender, message });
            }
        });

        socket.on("disconnect", () => {
            let disconnectedUser = Object.keys(users).find(key => users[key] === socket.id);
            if (disconnectedUser) {
                delete users[disconnectedUser]; // Remove from list
                io.emit("userList", Object.keys(users)); // Send updated user list
            }
            console.log("Client disconnected:", socket.id);
        });
    });
};
