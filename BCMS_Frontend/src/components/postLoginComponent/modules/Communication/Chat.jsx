import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "../../../styles/post_login_styles/modules/message.css"; // Import External CSS

const socket = io("http://localhost:5000"); // Backend ka URL

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [username, setUsername] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (!storedUsername) {
            const newUser = prompt("Enter your username:");
            localStorage.setItem("username", newUser);
            setUsername(newUser);
            socket.emit("join", newUser);
        } else {
            setUsername(storedUsername);
            socket.emit("join", storedUsername);
        }

        socket.on("userList", (userList) => setUsers(userList));
        socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));

        return () => socket.disconnect();
    }, []);

    const sendMessage = () => {
        if (message.trim() !== "" && selectedUser) {
            socket.emit("sendMessage", { sender: username, receiver: selectedUser, message });
            setMessages([...messages, { sender: username, message }]);
            setMessage("");
        }
    };

    return (
        <div className="chat-container">
            {/* Users List */}
            <div className="userList">
                <h4 style={{ textAlign: "center" }}>Active Users</h4>
                {users.map((user) =>
                    user !== username ? (
                        <p
                            key={user}
                            onClick={() => setSelectedUser(user)}
                            className="user"
                            style={{ backgroundColor: user === selectedUser ? "#075E54" : "transparent" }}
                        >
                            {user}
                        </p>
                    ) : null
                )}
            </div>

            {/* Chat Box */}
            <div className="chatBox">
                <h3 className="chatHeader">
                    {selectedUser ? `Chat with ${selectedUser}` : "Select a user"}
                </h3>
                <div className="chatArea">
                    {messages
                        .filter((msg) => msg.sender === selectedUser || msg.sender === username)
                        .map((msg, index) => (
                            <p
                                key={index}
                                className={`message ${msg.sender === username ? "sender" : "receiver"}`}
                            >
                                <strong>{msg.sender !== username ? msg.sender : ""}</strong> {msg.message}
                            </p>
                        ))}
                    <div ref={chatEndRef} />
                </div>
                <div className="inputArea">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="input"
                    />
                    <button onClick={sendMessage} disabled={!selectedUser} className="sendButton">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
