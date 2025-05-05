import React, { useState } from "react";
import axios from "axios";
import config from '../../config'


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

 const handleSend = async () => {
  if (!input.trim()) return;

  const newMessage = { role: "user", content: input };
  setMessages([...messages, newMessage]);

  try {
    const response = await axios.post(`${config.API_BASE_URL}/api/chatbot-symptom-checker/`, { message: input });
    setMessages([...messages, newMessage, { role: "assistant", content: response.data.reply }]);
  } catch (error) {
    console.error("Error:", error.response?.data?.error || error.message);
    setMessages([...messages, { role: "assistant", content: "Sorry, something went wrong." }]);
  }

  setInput("");
};

  
  

  return (
    <div>
      <div style={{ height: "300px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <strong>{msg.role === "user" ? "You" : "Chatbot"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your symptoms..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
