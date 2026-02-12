"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function AITutor({ lessonTitle, lessonType, lessonContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAsk = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    const userMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          lessonTitle,
          lessonType,
          context: lessonContent
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const aiMessage = { role: "assistant", content: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Tutor Error:", error);
      toast.error(error.message || "Failed to get AI response");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text) => {
    if (!speechSynthesis) {
      toast.error("Text-to-speech is not supported in your browser");
      return;
    }

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast.error("Failed to play audio");
    };

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          zIndex: 1000,
          transition: "transform 0.2s, box-shadow 0.2s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 30px rgba(102, 126, 234, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(102, 126, 234, 0.4)";
        }}
        title="AI Tutor"
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {/* AI Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 24,
            width: 380,
            maxWidth: "calc(100vw - 48px)",
            height: 500,
            background: "white",
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
            overflow: "hidden"
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}
          >
            <span style={{ fontSize: 24 }}>🤖</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>AI Math Tutor</h3>
              <p style={{ margin: 0, fontSize: 12, opacity: 0.9 }}>Ask me anything about this lesson!</p>
            </div>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 12px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: 12
                }}
              >
                🔇 Stop
              </button>
            )}
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: "#f8fafc"
            }}
          >
            {messages.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}>
                <p style={{ fontSize: 14, marginBottom: 12 }}>👋 Hi! I'm your AI tutor.</p>
                <p style={{ fontSize: 13 }}>Ask me questions about <strong>{lessonTitle}</strong> and I'll help you understand!</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: 12,
                    borderRadius: 12,
                    background: msg.role === "user" ? "#667eea" : "white",
                    color: msg.role === "user" ? "white" : "#0f172a",
                    fontSize: 14,
                    lineHeight: 1.5,
                    boxShadow: msg.role === "assistant" ? "0 2px 8px rgba(0,0,0,0.05)" : "none"
                  }}
                >
                  {msg.content}
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      style={{
                        marginTop: 8,
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: 6,
                        padding: "4px 8px",
                        fontSize: 12,
                        cursor: "pointer",
                        color: "#475569",
                        display: "flex",
                        alignItems: "center",
                        gap: 4
                      }}
                      title="Read aloud"
                    >
                      🔊 Listen
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    background: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                >
                  <div style={{ display: "flex", gap: 4 }}>
                    <div className="dot-flashing" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 16, borderTop: "1px solid #e2e8f0", background: "white" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleAsk()}
                placeholder="Ask a question..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 14,
                  outline: "none"
                }}
              />
              <button
                onClick={handleAsk}
                disabled={isLoading || !question.trim()}
                style={{
                  background: "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 16px",
                  cursor: isLoading || !question.trim() ? "not-allowed" : "pointer",
                  opacity: isLoading || !question.trim() ? 0.5 : 1,
                  fontWeight: 600,
                  fontSize: 14
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .dot-flashing {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #667eea;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0.5s;
        }
        .dot-flashing::before,
        .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }
        .dot-flashing::before {
          left: -12px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #667eea;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 0s;
        }
        .dot-flashing::after {
          left: 12px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #667eea;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 1s;
        }
        @keyframes dotFlashing {
          0% {
            background-color: #667eea;
          }
          50%,
          100% {
            background-color: #d1d5db;
          }
        }
      `}</style>
    </>
  );
}
