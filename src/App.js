import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <LanguageSelector />
      <Game />
    </div>
  );
};

export default App;
