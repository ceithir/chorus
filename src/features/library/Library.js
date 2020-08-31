import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectStep,
  nextStep,
} from "../navigation/reducer";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const goTo = (section) => () => dispatch(setSection(section));
  const stepUp = () => dispatch(nextStep());
  const party = useSelector(selectParty("library"));
  const library = useSelector(selectLibrary());

  const PLANNING = "planning";
  const READING = "reading";

  if (section === READING) {
    const results = (() => {
      const qualities = slots(party);

      return BOOKS.map((book) => {
        const character = library[book];
        const attentiveness = qualities[character]["quality"];
        const tplus = (key) => {
          if (!key) {
            return null;
          }
          return {
            text: t(`story.library.books.${key}`, { name: character }),
            character,
          };
        };

        switch (book) {
          case "mystery":
            return attentiveness !== BAD && tplus("mystery");
          case "fantasy":
            return tplus(
              `fantasy.${attentiveness === GOOD ? "good" : "default"}`
            );
          case "mimic":
            if (character === TEKELI) {
              return tplus("mimic.tekeli");
            }
            return (
              [ALECTO, KATRINA, CETO, CAROLE].includes(character) &&
              tplus("mimic.default")
            );
          case "coffee":
            return tplus(
              `coffee.${
                [ALECTO, CETO].includes(character) ? "good" : "default"
              }`
            );
          case "romance":
            return (
              [CETO, KATRINA].includes(character) &&
              tplus(`romance.${character}`)
            );
          case "science":
            if (character === CAMILLA) {
              return tplus("science.camilla");
            }
            return tplus(
              `science.${attentiveness === GOOD ? "good" : "default"}`
            );
          default:
            return false;
        }
      }).filter(Boolean);
    })();
    return (
      <Section
        text={results[step]["text"]}
        character={results[step]["character"]}
        next={!!results[step + 1] ? stepUp : () => console.log("TODO")}
      />
    );
  }

  if (section === PLANNING) {
    const done = Object.values(library).filter(Boolean).length === BOOKS.length;
    const next = goTo(READING);

    return (
      <Section text={t(`story.library.planning`)} next={done && next}>
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
      text={t(`story.library.introduction.${character}`)}
      character={character}
      next={!!introduction[step + 1] ? stepUp : goTo(PLANNING)}
    />
  );
};

export default Library;
