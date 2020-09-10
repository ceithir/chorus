import React, { useEffect, useRef, useImperativeHandle } from "react";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { selectSubSection, nextSubSection, selectInstantText } from "./reducer";
import { Typography, Card, Button } from "antd";
import "./Section.less";
import Animate from "rc-animate";
import CharacterHeader from "../characters/CharacterHeader";
import { useTranslation } from "react-i18next";
import { name } from "../../characters";

const { Paragraph } = Typography;

const FadeInAndScrollTo = ({ children }) => {
  const instantText = useSelector(selectInstantText);

  useEffect(() => {
    if (instantText) {
      return;
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [instantText]);

  if (instantText) {
    return <>{children}</>;
  }

  return (
    <Animate transitionName="fade" transitionAppear>
      <div>{children}</div>
    </Animate>
  );
};

const SubSection = ({ text }) => {
  return (
    <FadeInAndScrollTo>
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
    </FadeInAndScrollTo>
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
  const refDefined = !!buttonRef.current;
  useEffect(() => {
    buttonRef.current.focus();
  }, [refDefined]);

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
    <div className="avh-subsections">
      <Animate transitionName="fade" transitionAppear>
        <div key={id}>
          {subsections.map((text, index) => {
            return <SubSection key={index.toString()} text={text} />;
          })}
        </div>
      </Animate>
    </div>
  );
};

const Controls = React.forwardRef(({ action }, ref) => {
  return (
    <div className="avh-controls">
      <ContinueButton ref={ref} action={action} />
    </div>
  );
});

const Section = ({ text, children, next, character, translated = false }) => {
  const subSectionIndex = useSelector(selectSubSection);
  const dispatch = useDispatch();
  const instantText = useSelector(selectInstantText);
  const continueRef = useRef();
  const { t } = useTranslation();

  const translatedText = translated
    ? text
    : t(text, { name: name({ t, character }) });
  const id = translatedText.substring(0, 32);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const subsections = translatedText.split(/\n{2,}/);
  const showAll = (() => {
    if (instantText) {
      return true;
    }
    if (children) {
      return subSectionIndex >= subsections.length;
    }
    return subSectionIndex >= subsections.length - 1;
  })();
  const visibleSubsections = (() => {
    if (showAll) {
      return subsections;
    }
    return subsections.filter((_, index) => index <= subSectionIndex);
  })();
  const action = (() => {
    if (showAll) {
      return next;
    }
    return () => dispatch(nextSubSection());
  })();
  const canClickOnWholeCard = !!action && (!showAll || !children);

  return (
    <div data-character={character}>
      {character && <CharacterHeader character={character} />}
      <Card
        className="avh-section"
        hoverable={canClickOnWholeCard}
        onClick={() => canClickOnWholeCard && continueRef.current.click()}
      >
        <SubSections subsections={visibleSubsections} />
        {showAll && <FadeInAndScrollTo>{children}</FadeInAndScrollTo>}
        {!!action && <Controls ref={continueRef} action={action} />}
      </Card>
    </div>
  );
};

export default Section;
