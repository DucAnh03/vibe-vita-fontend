import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "ai", text: "Xin chào!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Lỗi gọi API");
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply || "Không có phản hồi" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            err.message ===
            "Bạn đã vượt quá giới hạn 6 tin/giờ. Vui lòng thử lại sau."
              ? err.message
              : "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="chatbox_float_btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="chatbox_container">
          <div className="chatbox_header">
            <div className="chatbox_header_icon">●</div>
            <h3 className="chatbox_header_title">AI CHATBOX</h3>
          </div>

          <div className="chatbox_messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbox_message ${
                  msg.role === "user" ? "user" : "ai"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chatbox_message ai">
                <div className="chatbox_typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbox_input_wrapper">
            <input
              type="text"
              className="chatbox_input"
              placeholder="Nhắn"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              maxLength={100}
              disabled={loading}
            />
            <button
              className="chatbox_send_btn"
              onClick={handleSend}
              disabled={!input.trim() || loading}
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBox;
