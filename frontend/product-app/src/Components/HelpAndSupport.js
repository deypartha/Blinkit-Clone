import React, { useState } from "react";
import axios from "axios";

export default function HelpAndSupport() {
  const faqs = [
    { q: "How can I track my order?", a: "You can track your order from the Orders page in your profile." },
    { q: "What is the return policy?", a: "You can return products within 7 days of delivery." },
    { q: "How do I contact customer care?", a: "You can email us at support@pbshop.com or call 1800-123-456." },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleFaqClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
    setShowChat(false);
  };

  // ✅ make only this async
  const handleSend = async () => {
    if (!chatMessage.trim()) return;
    if (chatMessage.length > 400) {
      alert("Message cannot exceed 400 characters.");
      return;
    }

    setChatHistory([...chatHistory, { from: "user", text: chatMessage }]);

    try {
      // Save to backend (MongoDB)
      await axios.post("http://localhost:5000/api/questions", {
        message: chatMessage,
      });
    } catch (err) {
      console.error("Error saving message:", err);
    }

    setChatMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* FAQ Section */}
      <div>
        <div style={{textAlign: "center", padding: "20px"}}><h3>Frequently Asked Questions</h3></div>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <button
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px",
                background: "#eee",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={() => handleFaqClick(index)}
            >
              {faq.q}
            </button>
            {activeIndex === index && (
              <div style={{ padding: "10px", border: "1px solid #ccc", borderTop: "none", borderRadius: "0 0 5px 5px" }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}

        {/* Other Section */}
        <div style={{ marginTop: "20px" }}>
          <button
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "10px",
              background: "#eee",
              border: "1px solid #ccc",
                borderRadius: "5px",
            }}
            onClick={() => {
              setShowChat(true);
              setActiveIndex(null);
            }}
          >
            Other (Chat with us)
          </button>
        </div>

        {/* Chatbot Section */}
        {showChat && (
          <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccccccff", borderRadius: "4px" }}>
            <div style={{ maxHeight: "150px", overflowY: "auto", marginBottom: "10px" }}>
              {chatHistory.map((msg, idx) => (
                <p key={idx} style={{ textAlign: msg.from === "user" ? "right" : "left" }}>
                  <b>{msg.from === "user" ? "You: " : "Bot: "}</b> {msg.text}
                </p>
              ))}
            </div>
            <textarea
              rows="3"
              placeholder="Type your message (max 400 chars)..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", border: "1px solid #ccc", padding: "5px", borderRadius: "4px" }}
            />
            <button onClick={handleSend} style={{ background: "#007bff", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "4px" }}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}
