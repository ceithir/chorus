import React, { useEffect } from "react";
import Game from "./Game";
import { useTranslation } from "react-i18next";
import "./App.css";

const supportedLanguages = ["en", "fr"];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      {supportedLanguages.map((language) => {
        return (
          <button
            key={language}
            onClick={() => i18n.changeLanguage(language)}
            disabled={language === i18n.language}
          >
            {language.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

const App = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("ui.title");
  }, [t]);

  return (
    <div>
      <LanguageSelector />
      <Game />
    </div>
  );
};

export default App;
