import { useLocale, setLocaleValue } from "../../lib/useLocale";

export default function LanguageToggle() {
  const { locale } = useLocale();

  const toggle = () => setLocaleValue(locale === "en" ? "es" : "en");

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${locale === "en" ? "Spanish" : "English"}`}
      style={{
        height: "36px",
        padding: "0 10px",
        borderRadius: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text-primary)",
        fontSize: "13px",
        fontWeight: 600,
        fontFamily: "var(--font-mono)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        letterSpacing: "0.5px",
      }}
    >
      <span style={{ opacity: locale === "en" ? 1 : 0.4 }}>EN</span>
      <span style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>|</span>
      <span style={{ opacity: locale === "es" ? 1 : 0.4 }}>ES</span>
    </button>
  );
}
