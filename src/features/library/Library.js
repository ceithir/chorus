import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectStep,
  nextStep,
  setChapter,
} from "../navigation/reducer";
import Section from "../navigation/Section";
import {
  CETO,
  KATRINA,
  MAHARAL,
  TEKELI,
  ALECTO,
  CAROLE,
  CAMILLA,
} from "../../characters";
import { selectParty } from "../party/reducer";
import BookSelector from "./BookSelector";
import { selectLibrary } from "../library/reducer";
import { BOOKS, slots, BAD, GOOD } from "../library/books";

const Library = () => {
  const section = useSelector(selectSection);
  const step = useSelector(selectStep);
  const dispatch = useDispatch();
  const goTo = (section) => () => dispatch(setSection(section));
  const stepUp = () => dispatch(nextStep());
  const party = useSelector(selectParty("library"));
  const library = useSelector(selectLibrary());

  const PLANNING = "planning";
  const READING = "reading";

  const nextChapter = () => dispatch(setChapter("city"));

  if (section === CAMILLA) {
    return (
      <Section
        text={"story.library.camilla"}
        character={CAMILLA}
        next={nextChapter}
      />
    );
  }

  if (section === READING) {
    const qualities = slots(party);

    const results = BOOKS.map((book) => {
      const character = library[book];
      const attentiveness = qualities[character]["quality"];

      const key = (() => {
        switch (book) {
          case "mystery":
            return attentiveness !== BAD && "mystery";
          case "fantasy":
            return `fantasy.${attentiveness === GOOD ? "good" : "default"}`;
          case "mimic":
            if (character === TEKELI) {
              return "mimic.tekeli";
            }
            return (
              [ALECTO, KATRINA, CETO, CAROLE].includes(character) &&
              "mimic.default"
            );
          case "coffee":
            return `coffee.${
              [ALECTO, CETO].includes(character) ? "good" : "default"
            }`;
          case "romance":
            return (
              [CETO, KATRINA].includes(character) && `romance.${character}`
            );
          case "science":
            if (character === CAMILLA) {
              return "science.camilla";
            }
            return `science.${attentiveness === GOOD ? "good" : "default"}`;
          default:
            return false;
        }
      })();
      return key && { text: `story.library.books.${key}`, character };
    }).filter(Boolean);

    const next = (() => {
      if (results[step + 1]) {
        return stepUp;
      }
      if (party.includes(CAMILLA)) {
        return goTo(CAMILLA);
      }
      return nextChapter;
    })();
    return (
      <Section
        text={results[step]["text"]}
        character={results[step]["character"]}
        next={next}
      />
    );
  }

  if (section === PLANNING) {
    const done = Object.values(library).filter(Boolean).length === BOOKS.length;
    const next = goTo(READING);

    return (
      <Section text={`story.library.planning`} next={done && next}>
        <BookSelector characters={party} />
      </Section>
    );
  }

  const introduction = [MAHARAL, CETO, KATRINA].filter((character) =>
    party.includes(character)
  );
  const character = introduction[step];

  return (
    <Section
      text={`story.library.introduction.${character}`}
      character={character}
      next={!!introduction[step + 1] ? stepUp : goTo(PLANNING)}
    />
  );
};

export default Library;
