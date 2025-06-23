import {createContext, useContext, useState} from "react";
import en from "./locales/en.json";
import de from "./locales/de.json";

const translations = {en, de};

const LanguageContext = createContext({
  language: "en",
  setLanguage: (lang: "en" | "de") => {},
  t: (key: string) => "",
});

export function LanguageProvider({children}: {children: React.ReactNode}) {
  const [language, setLanguage] = useState<"en" | "de">("en");

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[language];
    keys.forEach((k) => (value = value?.[k]));
    return value ?? key;
  };

  return <LanguageContext.Provider value={{language, setLanguage, t}}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("Language Context must be wrapped in LanguageProvider");

  return context;
}
