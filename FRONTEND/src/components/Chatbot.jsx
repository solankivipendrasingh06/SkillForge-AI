import { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your SkillForge AI Assistant. I can help you with course recommendations, skill assessments, profile setup, and learning paths. Ask me anything about your learning journey!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const newMessages = [
      ...messages,
      { role: "user", text: trimmedQuestion },
    ];

    setMessages(newMessages);
    setQuestion("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmedQuestion }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to get a response from the AI service.");
      }

      const answerMessage = {
        role: "assistant",
        text: data.answer || "I could not generate an answer. Please try again.",
        courses: data.courses || [],
        source: data.source || 'fallback'
      };

      setMessages((prev) => [
        ...prev,
        answerMessage,
      ]);
    } catch (err) {
      setError(err.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Hi! I'm your SkillForge AI Assistant. I can help you with course recommendations, skill assessments, profile setup, and learning paths. Ask me anything about your learning journey!",
      },
    ]);
    setError("");
  };

  return (
    <div className="header-chatbot">
      <button
        type="button"
        className="btn btn-outline-light me-2"
        onClick={toggleChat}
      >
        {isOpen ? "Close AI Chat" : "AI Chat"}
      </button>

      {isOpen && (
        <div className="chatbot-panel shadow-lg">
          <div className="chatbot-header d-flex align-items-center justify-content-between">
            <div>
              <strong>SkillForge AI Assistant</strong>
              <div className="text-muted small">Get personalized course recommendations & guidance</div>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={clearChat}
            >
              Reset
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`chatbot-message chatbot-message-${message.role}`}
                >
                  <div className="message-role">
                    {message.role === "assistant" ? "🤖 AI" : "👤 You"}
                  </div>
                  <div className="message-text">{message.text}</div>
                </div>
                
                {message.courses && message.courses.length > 0 && (
                  <div className="chatbot-courses mt-2">
                    <div className="courses-label text-muted small ms-3">📚 Recommended Courses:</div>
                    <div className="courses-list ms-3 mt-1">
                      {message.courses.map((course, cIdx) => (
                        <div key={cIdx} className="course-recommendation">
                          <span className="course-name">{course.name}</span>
                          <span className="course-meta">
                            {course.level} • {course.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {error && <div className="alert alert-danger mb-2 ms-3 me-3">{error}</div>}

          <form className="chatbot-input-form" onSubmit={handleSend}>
            <textarea
              className="form-control chatbot-input"
              rows="2"
              placeholder="Ask about Python, React, Machine Learning, career guidance, or anything else..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="d-flex justify-content-between align-items-center mt-2">
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={loading}
              >
                {loading ? "Thinking..." : "Send"}
              </button>
              <span className="text-muted small">
                {loading ? "⏳ Processing..." : "✅ Ready"}
              </span>
            </div>
          </form>
        </div>
      )}

      <style>{`
        .chatbot-courses {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 10px 0;
        }
        
        .courses-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .course-recommendation {
          background-color: white;
          border-left: 3px solid #007bff;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .course-name {
          font-weight: 600;
          color: #333;
          display: block;
        }
        
        .course-meta {
          font-size: 0.8rem;
          color: #666;
          display: block;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}

export default Chatbot;
