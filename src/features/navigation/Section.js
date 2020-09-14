import React, { useEffect, useRef, useImperativeHandle } from "react";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSubSection,
  nextSubSection,
  selectInstantText,
  selectFadingOut,
  setFadingOut,
} from "./reducer";
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
  const instantText = useSelector(selectInstantText);
  useEffect(() => {
    if (instantText) {
      return;
    }
    buttonRef.current.focus();
  }, [refDefined, instantText]);

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

const SubSections = ({ subsections }) => {
  if (!subsections.length) {
    return null;
  }

  return (
    <div className="avh-subsections">
      {subsections.map((text, index) => {
        return <SubSection key={index.toString()} text={text} />;
      })}
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

const AnimationBlock = ({ children }) => {
  return <>{children}</>;
};

const AnimationContainer = ({
  children,
  animationId,
  visible,
  action,
  fadeOutBeforeAction,
  scrollUpOnAppear,
}) => {
  useEffect(() => {
    if (!animationId) {
      return;
    }
    if (scrollUpOnAppear) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [animationId, scrollUpOnAppear]);

  if (!animationId) {
    return <>{children}</>;
  }

  return (
    <Animate
      transitionName="fade"
      transitionEnter={false}
      transitionLeave={fadeOutBeforeAction}
      showProp="visible"
      onEnd={(_, exists) => {
        if (!exists) {
          action();
        }
      }}
    >
      <AnimationBlock key={animationId} visible={visible}>
        {children}
      </AnimationBlock>
    </Animate>
  );
};

const RawSection = ({
  character,
  canClickOnWholeCard,
  animationId,
  action,
  fadeOutBeforeAction,
  children,
}) => {
  const continueRef = useRef();
  const dispatch = useDispatch();
  const visible = !useSelector(selectFadingOut);
  const setVisible = (visible) => dispatch(setFadingOut(!visible));
  const startFadingOut = () => setVisible(false);
  const endFadingOutAndContinue = () => {
    setVisible(true);
    action();
  };
  const actualAction = fadeOutBeforeAction ? startFadingOut : action;
  const scrollUpOnAppear = animationId && !fadeOutBeforeAction; // FIXME: Arcane rule

  return (
    <div data-character={character}>
      {character && <CharacterHeader character={character} />}
      <Card
        className="avh-section"
        hoverable={canClickOnWholeCard}
        onClick={() => canClickOnWholeCard && continueRef.current.click()}
      >
        <AnimationContainer
          animationId={animationId}
          visible={visible}
          action={endFadingOutAndContinue}
          fadeOutBeforeAction={fadeOutBeforeAction}
          scrollUpOnAppear={scrollUpOnAppear}
        >
          {children}
        </AnimationContainer>
        {!!action && <Controls ref={continueRef} action={actualAction} />}
      </Card>
    </div>
  );
};

const Section = ({ text, children, next, character, translated = false }) => {
  const subSectionIndex = useSelector(selectSubSection);
  const dispatch = useDispatch();
  const instantText = useSelector(selectInstantText);
  const { t, i18n } = useTranslation();

  const animationId = (() => {
    if (!text) {
      return null;
    }
    if (translated) {
      return text.substring(0, 32);
    }
    return `${i18n.language}.${text}`;
  })();

  const translatedText = (() => {
    if (!text) {
      return null;
    }
    if (translated) {
      return text;
    }
    return t(text, { name: name({ t, character }) });
  })();
  const subsections = translatedText?.split(/\n{2,}/) || [];
  const showAll = (() => {
    if (!text) {
      return true;
    }
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
    <RawSection
      character={character}
      canClickOnWholeCard={canClickOnWholeCard}
      animationId={animationId}
      action={action}
      fadeOutBeforeAction={!instantText && showAll && animationId && next}
    >
      <SubSections subsections={visibleSubsections} />
      {showAll && <FadeInAndScrollTo>{children}</FadeInAndScrollTo>}
    </RawSection>
  );
};

export default Section;
