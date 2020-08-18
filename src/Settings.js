import React from "react";
import "./App.less";
import { useTranslation } from "react-i18next";
import { Radio, Switch } from "antd";
import "./transitions.less";
import { useSelector, useDispatch } from "react-redux";
import {
  selectInstantText,
  toggleInstantText,
} from "./features/navigation/reducer";

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

const InstantTextToggler = () => {
  const { t } = useTranslation();
  const instantText = useSelector(selectInstantText);
  const dispatch = useDispatch();

  return (
    <div className="instant-text-toggler">
      <Switch
        checked={!instantText}
        onClick={() => dispatch(toggleInstantText())}
        unCheckedChildren={t("ui.instant-text-on")}
        checkedChildren={t("ui.instant-text-off")}
      />
    </div>
  );
};

const Settings = () => {
  return (
    <>
      <InstantTextToggler />
      <LanguageSelector />
    </>
  );
};

export default Settings;
