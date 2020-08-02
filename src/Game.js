import React from "react";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { selectSection, setSection } from "./features/navigation/reducer";
import { useTranslation } from "react-i18next";

const Section = ({ text, children }) => {
  return (
    <div>
      {text.split("\n").map((paragraph, index) => {
        return (
          <p
            key={index.toString()}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(paragraph) }}
          />
        );
      })}
      {children}
    </div>
  );
};

const Game = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (section === "ceto") {
    return <Section text={t("story.meeting.ceto")} />;
  }

  return (
    <Section text={t("story.meeting.introduction")}>
      <button onClick={() => dispatch(setSection("ceto"))}>
        {t("ui.next")}
      </button>
    </Section>
  );
};

export default Game;
