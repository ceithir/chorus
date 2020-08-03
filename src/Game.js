import React from "react";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { selectSection, setSection } from "./features/navigation/reducer";
import { useTranslation } from "react-i18next";
import { Typography, Button } from "antd";

const { Paragraph } = Typography;

const Section = ({ text, children }) => {
  return (
    <Paragraph>
      {text.split("\n").map((paragraph, index) => {
        return (
          <p
            key={index.toString()}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(paragraph) }}
          />
        );
      })}
      {children}
    </Paragraph>
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
      <Button onClick={() => dispatch(setSection("ceto"))}>
        {t("ui.next")}
      </Button>
    </Section>
  );
};

export default Game;
