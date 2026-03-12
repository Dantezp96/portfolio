import { useState, useEffect } from "react";
import type { Locale } from "./i18n";
import { LOCALE_KEY, LOCALE_EVENT, translations } from "./i18n";

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  return (localStorage.getItem(LOCALE_KEY) as Locale) || "en";
}

export function setLocaleValue(locale: Locale) {
  localStorage.setItem(LOCALE_KEY, locale);
  window.dispatchEvent(new CustomEvent(LOCALE_EVENT, { detail: locale }));
}

export function useLocale() {
  const [locale, setLoc] = useState<Locale>(getLocale);

  useEffect(() => {
    const handler = (e: Event) => setLoc((e as CustomEvent).detail as Locale);
    window.addEventListener(LOCALE_EVENT, handler);
    return () => window.removeEventListener(LOCALE_EVENT, handler);
  }, []);

  return { locale, t: translations[locale] };
}
