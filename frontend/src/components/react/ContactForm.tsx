import { useState, type FormEvent } from "react";
import { submitContact } from "../../lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "0.75rem",
    border: "1px solid var(--color-border)",
    background: "var(--color-bg-card)",
    color: "var(--color-text-primary)",
    fontSize: "var(--font-size-sm)",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "var(--font-size-2xl)",
          fontWeight: 800,
          marginBottom: "var(--space-md)",
          background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Get in Touch
      </h2>
      <p
        style={{
          textAlign: "center",
          fontSize: "var(--font-size-lg)",
          color: "var(--color-text-secondary)",
          marginBottom: "var(--space-2xl)",
        }}
      >
        Let's build something together
      </p>

      {status === "success" ? (
        <div
          style={{
            textAlign: "center",
            padding: "var(--space-2xl)",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-accent-secondary)",
          }}
        >
          <p style={{ fontSize: "var(--font-size-lg)", fontWeight: 600, color: "var(--color-accent-secondary)" }}>
            Message sent!
          </p>
          <p style={{ color: "var(--color-text-secondary)", marginTop: "var(--space-sm)" }}>
            I'll get back to you soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            style={{
              marginTop: "var(--space-lg)",
              padding: "0.625rem 1.5rem",
              borderRadius: "var(--radius-full)",
              background: "var(--color-accent)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
            }}
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Your email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              style={inputStyle}
            />
          </div>
          <input
            type="text"
            placeholder="Subject (optional)"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            style={inputStyle}
          />
          <textarea
            placeholder="Your message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            style={{ ...inputStyle, resize: "vertical" }}
          />

          {status === "error" && (
            <p style={{ color: "#ef4444", fontSize: "var(--font-size-sm)" }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              padding: "0.875rem 2rem",
              borderRadius: "var(--radius-full)",
              background: status === "sending" ? "var(--color-text-muted)" : "var(--color-accent)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "var(--font-size-base)",
              cursor: status === "sending" ? "not-allowed" : "pointer",
              border: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px var(--color-accent-glow)",
            }}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
