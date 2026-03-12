import { useState, useRef, useEffect } from "react";
import { API_URL } from "../../lib/constants";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading || messages.length >= 20) return;

    setError("");
    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (res.status === 429) {
        setError("Too many messages. Wait a moment.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({ detail: "Error" }));
        setError(data.detail || "Error sending message");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--color-accent)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 20px var(--color-accent-glow)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          transition: "transform 0.2s, box-shadow 0.2s",
          transform: open ? "rotate(45deg)" : "none",
        }}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "92px",
            right: "24px",
            width: "380px",
            maxWidth: "calc(100vw - 48px)",
            height: "500px",
            maxHeight: "calc(100vh - 140px)",
            borderRadius: "16px",
            background: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 8px 40px var(--color-shadow)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid var(--color-border)",
              background: "var(--color-bg-card)",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--color-text-primary)" }}>
              Portfolio Assistant
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px" }}>
              Ask about Omar's projects & experience
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 16px", color: "var(--color-text-muted)", fontSize: "13px" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>💬</div>
                Try asking:<br />
                "What projects does Omar have?"<br />
                "What tech stack does he use?"
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "8px 12px",
                  borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: m.role === "user" ? "var(--color-accent)" : "var(--color-bg-card)",
                  color: m.role === "user" ? "#fff" : "var(--color-text-primary)",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  border: m.role === "assistant" ? "1px solid var(--color-border)" : "none",
                  wordBreak: "break-word",
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "8px 16px",
                  borderRadius: "12px 12px 12px 2px",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  fontSize: "13px",
                  color: "var(--color-text-muted)",
                }}
              >
                Thinking...
              </div>
            )}
            {error && (
              <div style={{ fontSize: "12px", color: "#EF4444", textAlign: "center", padding: "4px" }}>
                {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              gap: "8px",
              background: "var(--color-bg-card)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={messages.length >= 20 ? "Message limit reached" : "Type a message..."}
              disabled={messages.length >= 20}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
                fontSize: "13px",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim() || messages.length >= 20}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                background: loading || !input.trim() ? "var(--color-border)" : "var(--color-accent)",
                color: "#fff",
                border: "none",
                cursor: loading || !input.trim() ? "default" : "pointer",
                fontSize: "13px",
                fontWeight: 600,
                transition: "background 0.2s",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
