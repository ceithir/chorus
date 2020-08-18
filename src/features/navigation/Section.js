import React, { useEffect, useRef, useImperativeHandle } from "react";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { selectSubSection, nextSubSection } from "./reducer";
import { Typography, Card, Button } from "antd";
import "./Section.less";
import Animate from "rc-animate";
import QueueAnim from "rc-queue-anim";

const { Paragraph } = Typography;

const SubSection = ({ text }) => {
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  return (
    <Animate transitionName="fade" transitionAppear>
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
    </Animate>
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

const SectionCard = ({ children, ...props }) => {
  return (
    <Card className="avh-section" {...props}>
      {children}
    </Card>
  );
};

const SubSections = ({ subsections }) => {
  return (
    <QueueAnim className="avh-subsections" type={["top", "alpha"]}>
      <Animate transitionName="fade" transitionAppear>
        <div key={subsections[0].substring(0, 10)}>
          {subsections.map((text, index) => {
            return <SubSection key={index.toString()} text={text} />;
          })}
        </div>
      </Animate>
    </QueueAnim>
  );
};

const Section = ({ text, children, next }) => {
  const subSectionIndex = useSelector(selectSubSection);
  const dispatch = useDispatch();
  const continueRef = useRef();

  const subsections = text.split(/\n{2,}/);
  const showAll = subSectionIndex >= subsections.length - 1;

  if (showAll && !next) {
    return (
      <SectionCard>
        <SubSections subsections={subsections} />
        {children}
      </SectionCard>
    );
  }

  const action = showAll ? next : () => dispatch(nextSubSection());

  return (
    <SectionCard hoverable onClick={() => continueRef.current.click()}>
      <SubSections
        subsections={subsections.filter((_, index) => index <= subSectionIndex)}
      />
      <div className="avh-controls">
        <ContinueButton ref={continueRef} action={action} />
      </div>
    </SectionCard>
  );
};

export default Section;
