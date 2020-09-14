import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectChapter,
  setChapter,
  setFadingOut,
  selectInstantText,
} from "./features/navigation/reducer";
import Section from "./features/navigation/Section";
import PartySelector from "./features/party/PartySelector";
import {
  CETO,
  ALECTO,
  CAROLE,
  KATRINA,
  TEKELI,
  CAMILLA,
  RASHOMON,
} from "./characters";
import Forest from "./features/forest/Forest";
import Library from "./features/library/Library";
import City from "./features/city/City";
import Debrief from "./features/debrief/Debrief";

const Game = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const goTo = (section) => () => dispatch(setSection(section));
  const chapter = useSelector(selectChapter);
  const instantText = useSelector(selectInstantText);

  if (chapter === "finale") {
    return <Debrief />;
  }

  if (chapter === "city") {
    return <City />;
  }

  if (chapter === "forest") {
    return <Forest />;
  }

  if (chapter === "library") {
    return <Library />;
  }

  const meetingOrder = [CETO, ALECTO, CAROLE, KATRINA, TEKELI, CAMILLA];
  const i = meetingOrder.indexOf(section);
  if (i > -1) {
    const next = goTo(meetingOrder[i + 1] || RASHOMON);

    return (
      <Section
        text={`story.meeting.${section}`}
        character={meetingOrder[i]}
        next={next}
        hideLastButton={true}
      >
        <PartySelector
          character={section}
          next={instantText ? next : () => dispatch(setFadingOut(true))}
        />
      </Section>
    );
  }

  switch (section) {
    case RASHOMON:
      return (
        <Section
          text={"story.meeting.rashomon"}
          next={() => dispatch(setChapter("forest"))}
          character={RASHOMON}
        />
      );
    default:
      return (
        <Section
          text={"story.meeting.introduction"}
          next={goTo(CETO)}
          character={RASHOMON}
        />
      );
  }
};

export default Game;
