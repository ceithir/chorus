import React, { useEffect } from "react";
import "./App.less";
import Game from "./Game";
import { useTranslation } from "react-i18next";
import "./transitions.less";
import Settings from "./Settings";
import About from "./About";

const App = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("ui.title");
  }, [t]);

  return (
    <>
      <header>
        <Settings />
        <About />
      </header>
      <main>
        <Game />
      </main>
    </>
  );
};

export default App;
