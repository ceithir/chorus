import React, { useRef, useImperativeHandle } from "react";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectSubSection,
  nextSubSection,
} from "./features/navigation/reducer";
import { useTranslation } from "react-i18next";
import { Typography, Card, Button } from "antd";

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

const ContinueButton = React.forwardRef(({ action }, ref) => {
  const buttonRef = useRef();
  useImperativeHandle(ref, () => ({
    click: () => {
      buttonRef.current.focus();
      buttonRef.current.click();
    },
  }));

  return (
    <Button ref={buttonRef} onClick={action}>
      {">>>"}
    </Button>
  );
});

const Section = ({ text, children, next }) => {
  const subSectionIndex = useSelector(selectSubSection);
  const dispatch = useDispatch();
  const continueRef = useRef();

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

  const action =
    subSectionIndex >= subsections.length - 1
      ? next
      : () => dispatch(nextSubSection());

  return (
    <Card hoverable onClick={() => continueRef.current.click()}>
      {show(subsections.filter((_, index) => index <= subSectionIndex))}
      <ContinueButton ref={continueRef} action={action} />
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
