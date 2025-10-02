import { useState } from "react";

function Chat() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 폼의 새로고침을 막는 것!

    if (!input.trim()) return;

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/dialogflow/textQuery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.fulfillmentText || "(응답이 없어요)");
      } else {
        setAnswer(`에러: ${data.error || "알 수 없는 에러"}`);
      }
    } catch (error) {
      console.error("요청 중 에러:", error);
      setAnswer("요청 중 에러가 발생했습니다.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Jobby Chat</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="질문을 입력해 주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit">보내기</button>
      </form>

      <div style={{ marginTop: "24px" }}>
        <h2>조비의 대답</h2>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default Chat;
