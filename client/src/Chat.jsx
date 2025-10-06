import { useState, useRef, useEffect } from "react";
import "./Chat.css";

const API_URL = import.meta.env.VITE_API_URL;

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // 1. 입력창 제어를 위한 Ref 생성

  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // 로딩이 끝났을 때도 입력창에 포커스를 줌 (선택 사항)
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setIsLoading(true);

    // 2. 메시지 전송 직후 입력창으로 포커스 유지!
    // setTimeout을 아주 짧게 주어 렌더링 후 확실하게 잡도록 함
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    try {
      const response = await fetch(`${API_URL}/api/dialogflow/textQuery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      let answerText = "";

      if (response.ok) {
        answerText = data.fulfillmentText || "(응답이 없어요)";
      } else {
        answerText = `에러: ${data.error || "알 수 없는 에러"}`;
      }

      setMessages((prev) => [...prev, { from: "bot", text: answerText }]);
    } catch (error) {
      console.error("요청 중 에러:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "서버와 연결할 수 없습니다." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* 헤더 */}
      <div className="chat-header">
        <div className="header-icon">🧪</div>
        <div>
          <h1 className="header-title">AI-Chemist97</h1>
          <span className="header-status">Interactive Portfolio</span>
        </div>
      </div>

      {/* 대화 영역 */}
      <div className="messages-area">
        {messages.length === 0 && (
          <div className="welcome-message">
            <p>
              안녕하세요! <strong>AI-Chemist97</strong>의 봇입니다.
            </p>
            <p>
              화학 전공 지식부터 SSAFY 프로젝트 경험까지,
              <br />
              무엇이든 물어봐 주세요.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.from}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}

        {isLoading && (
          <div className="message-row bot">
            <div className="message-bubble loading">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <form onSubmit={handleSubmit} className="input-area">
        <input
          ref={inputRef} /* 3. Ref 연결 */
          type="text"
          placeholder="질문을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          /* 4. disabled={isLoading} 제거 -> 답변 기다리는 중에도 타이핑 가능하게 변경 */
        />
        <button type="submit" disabled={!input.trim() || isLoading}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="send-icon">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Chat;
