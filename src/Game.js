import React from "react";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectSubSection,
  nextSubSection,
} from "./features/navigation/reducer";
import { useTranslation } from "react-i18next";
import { Typography, Card } from "antd";

const { Paragraph } = Typography;

const SubSection = ({ text }) => {
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
    </Paragraph>
  );
};

const Section = ({ text, children, next }) => {
  const subSectionIndex = useSelector(selectSubSection);
  const dispatch = useDispatch();

  const subsections = text.split(/\n{2,}/);

  const show = (list) => {
    return list.map((text, index) => {
      return <SubSection key={index.toString()} text={text} />;
    });
  };

  if (subSectionIndex >= subsections.length - 1 && !next) {
    return (
      <Card>
        {show(subsections)}
        {children}
      </Card>
    );
  }

  const onClick =
    subSectionIndex >= subsections.length - 1
      ? next
      : () => dispatch(nextSubSection());

  return (
    <Card hoverable onClick={onClick}>
      {show(subsections.filter((_, index) => index <= subSectionIndex))}
    </Card>
  );
};

const Game = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (section === "ceto") {
    return <Section text={t("story.meeting.ceto")} />;
  }

  const next = () => dispatch(setSection("ceto"));

  return <Section text={t("story.meeting.introduction")} next={next} />;
};

export default Game;
