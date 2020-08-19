import React, { useEffect, useRef, useImperativeHandle } from "react";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { selectSubSection, nextSubSection, selectInstantText } from "./reducer";
import { Typography, Card, Button } from "antd";
import "./Section.less";
import Animate from "rc-animate";
import QueueAnim from "rc-queue-anim";

const { Paragraph } = Typography;

const StaticSubSectionText = ({ text }) => {
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

const AnimatedSubsection = ({ text }) => {
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  return (
    <Animate transitionName="fade" transitionAppear>
      <StaticSubSectionText text={text} />
    </Animate>
  );
};

const SubSection = ({ text }) => {
  const instantText = useSelector(selectInstantText);

  const Component = instantText ? StaticSubSectionText : AnimatedSubsection;

  return <Component text={text} />;
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
    <Button
      ref={buttonRef}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        action();
      }}
    >
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

const StaticSubSections = ({ id, subsections }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  return (
    <div className="avh-subsections">
      {subsections.map((text, index) => {
        return <SubSection key={index.toString()} text={text} />;
      })}
    </div>
  );
};

const SubSections = ({ subsections }) => {
  const instantText = useSelector(selectInstantText);
  const id = subsections[0].substring(0, 32);
  if (instantText) {
    return <StaticSubSections id={id} subsections={subsections} />;
  }

  return (
    <QueueAnim className="avh-subsections" type={["top", "alpha"]}>
      <Animate transitionName="fade" transitionAppear>
        <div key={id}>
          {subsections.map((text, index) => {
            return <SubSection key={index.toString()} text={text} />;
          })}
        </div>
      </Animate>
    </QueueAnim>
  );
};

const SectionWithButton = ({ subsections, action }) => {
  const continueRef = useRef();

  return (
    <SectionCard hoverable onClick={() => continueRef.current.click()}>
      <SubSections subsections={subsections} />
      <div className="avh-controls">
        <ContinueButton ref={continueRef} action={action} />
      </div>
    </SectionCard>
  );
};

const Section = ({ text, children, next }) => {
  const subSectionIndex = useSelector(selectSubSection);
  const dispatch = useDispatch();
  const instantText = useSelector(selectInstantText);

  const subsections = text.split(/\n{2,}/);
  const showAll = instantText || subSectionIndex >= subsections.length - 1;

  if (showAll) {
    if (children) {
      return (
        <SectionCard>
          <SubSections subsections={subsections} />
          {children}
        </SectionCard>
      );
    }

    return <SectionWithButton subsections={subsections} action={next} />;
  }

  return (
    <SectionWithButton
      subsections={subsections.filter((_, index) => index <= subSectionIndex)}
      action={() => dispatch(nextSubSection())}
    />
  );
};

export default Section;
