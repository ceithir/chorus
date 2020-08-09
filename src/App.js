import React, { useEffect } from "react";
import "./App.less";
import Game from "./Game";
import { useTranslation } from "react-i18next";
import { Radio } from "antd";
import "./transitions.less";

const supportedLanguages = ["en", "fr"];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <Radio.Group
      onChange={(event) => i18n.changeLanguage(event.target.value)}
      defaultValue={i18n.language}
    >
      {supportedLanguages.map((language) => {
        return (
          <Radio.Button key={language} value={language}>
            {language.toUpperCase()}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
};

const App = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("ui.title");
  }, [t]);

  return (
    <>
      <header>
        <LanguageSelector />
      </header>
      <main>
        <Game />
      </main>
    </>
  );
};

export default App;
