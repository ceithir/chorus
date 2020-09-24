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
  GUEST,
} from "../../characters";
import { selectParty } from "../party/reducer";
import BookSelector from "./BookSelector";
import { selectLibrary } from "../library/reducer";
import {
  BOOKS,
  slots,
  BAD,
  GOOD,
  success,
  MYSTERY,
  mimicUnveiled,
  MIMIC,
  SCIENCE,
  testimonyFound,
  quality,
  FANTASY,
  ROMANCE,
  COFFEE,
} from "../library/books";
import Results from "../debrief/Results";
import { forceAssign } from "../city/reducer";
import { SPECIAL } from "../city/locations";
import { useTranslation } from "react-i18next";

const Library = () => {
  const section = useSelector(selectSection);
  const step = useSelector(selectStep);
  const dispatch = useDispatch();
  const goTo = (section) => () => dispatch(setSection(section));
  const stepUp = () => dispatch(nextStep());
  const party = useSelector(selectParty("library"));
  const library = useSelector(selectLibrary());
  const { t } = useTranslation();

  const PLANNING = "planning";
  const READING = "reading";
  const RESULTS = "results";

  const nextChapter = () => dispatch(setChapter("city"));

  if (section === CAMILLA) {
    return (
      <Section
        text={"story.library.camilla"}
        character={CAMILLA}
        next={goTo(RESULTS)}
      />
    );
  }

  if (section === RESULTS) {
    const defaultParams = { characters: party, assignations: library };

    const data = [
      library[MYSTERY] !== BAD && {
        key: "dragon",
        character: library[MYSTERY],
        type: "success",
      },
      mimicUnveiled(library) && {
        key: "mimic",
        character: library[MIMIC],
        type: "success",
      },
      testimonyFound({ ...defaultParams }) && {
        key: "testimony",
        character: library[SCIENCE],
        type: "success",
      },
      (quality({ book: FANTASY, ...defaultParams }) ||
        quality({ book: MYSTERY, ...defaultParams })) && {
        key: "overkill",
        type: "warning",
      },
      [KATRINA, CETO].includes(library[ROMANCE]) && {
        key: `ally.${library[ROMANCE]}`,
      },
      party.includes(CAMILLA) && {
        key: "dream",
      },
    ].filter(Boolean);

    return (
      <Section next={nextChapter}>
        <Results
          context="library"
          success={success({ characters: party, assignations: library })}
          data={data}
        />
      </Section>
    );
  }

  if (section === READING) {
    const qualities = slots(party);

    const results = BOOKS.map((book) => {
      const character = library[book];
      const attentiveness = qualities[character]["quality"];

      const key = (() => {
        switch (book) {
          case MYSTERY:
            return attentiveness !== BAD && "mystery";
          case FANTASY:
            return `fantasy.${attentiveness === GOOD ? "good" : "default"}`;
          case MIMIC:
            if (character === TEKELI) {
              return "mimic.tekeli";
            }
            return (
              [ALECTO, KATRINA, CETO, CAROLE].includes(character) &&
              "mimic.default"
            );
          case COFFEE:
            return `coffee.${
              [ALECTO, CETO].includes(character) ? "good" : "default"
            }`;
          case ROMANCE:
            return (
              [CETO, KATRINA].includes(character) && `romance.${character}`
            );
          case SCIENCE:
            if (character === CAMILLA) {
              return "science.camilla";
            }
            return `science.${attentiveness === GOOD ? "good" : "default"}`;
          default:
            return false;
        }
      })();
      return key && { text: `story.library.books.${key}`, character, book };
    }).filter(Boolean);

    const next = (() => {
      if (results[step + 1]) {
        return stepUp;
      }
      if (party.includes(CAMILLA)) {
        return goTo(CAMILLA);
      }
      return goTo(RESULTS);
    })();
    return (
      <Section
        text={results[step]["text"]}
        character={results[step]["character"]}
        next={next}
        heading={`${t(`locations.library.name`)} – ${t(
          `locations.library.books.${results[step]["book"]}`
        )}`}
      />
    );
  }

  if (section === PLANNING) {
    const done = Object.values(library).filter(Boolean).length === BOOKS.length;
    const next = () => {
      if (library[ROMANCE] === KATRINA) {
        dispatch(forceAssign({ character: GUEST, location: SPECIAL }));
      }
      goTo(READING)();
    };

    return (
      <Section text={`story.library.planning`} next={done && next}>
        <BookSelector characters={[...party].sort()} />
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
