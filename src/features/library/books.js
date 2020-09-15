import {
  CAMILLA,
  TEKELI,
  MAHARAL,
  CETO,
  KATRINA,
  ALECTO,
} from "../../characters";

export const MYSTERY = "mystery";
export const FANTASY = "fantasy";
export const MIMIC = "mimic";
export const ROMANCE = "romance";
export const COFFEE = "coffee";
export const SCIENCE = "science";

export const BOOKS = [MYSTERY, FANTASY, MIMIC, ROMANCE, COFFEE, SCIENCE];

const SLOW = [CAMILLA, TEKELI];

export const GOOD = "good";
export const AVERAGE = "average";
export const BAD = "bad";

const assistSlots = (assistants) => {
  if (assistants.length !== 2) {
    throw new Error("Groups of three only please");
  }

  if (assistants.includes(CETO)) {
    const otherAssistant = assistants.find((character) => character !== CETO);

    return {
      [CETO]: {
        quality: GOOD,
        max: 3,
      },
      [otherAssistant]: {
        quality: GOOD,
        max: SLOW.includes(otherAssistant) ? 1 : 2,
      },
    };
  }

  return Object.fromEntries(
    assistants.map((character) => {
      return [
        character,
        {
          quality: SLOW.includes(character) ? AVERAGE : GOOD,
          max: 2,
        },
      ];
    })
  );
};

export const slots = (characters) => {
  return {
    [MAHARAL]: {
      quality: BAD,
    },
    ...assistSlots(characters.filter((character) => character !== MAHARAL)),
  };
};

export const score = ({ characters, assignations }) => {
  let result = 0;

  const s = slots(characters);
  const quality = (book) => s[assignations[book]]["quality"];

  const unusedSlots = (quality) =>
    characters.reduce((acc, character) => {
      if (s[character]["quality"] !== quality) {
        return acc;
      }
      return (
        acc +
        Math.max(
          0,
          s[character]["max"] -
            Object.values(assignations).filter((char) => char === character)
              .length
        )
      );
    }, 0);

  const baseScore = (book, mod = 0) => {
    switch (quality(book)) {
      case GOOD:
        return 2 + mod;
      case AVERAGE:
        return 1 + mod;
      default:
        return 0;
    }
  };

  result += unusedSlots(GOOD) * 1; // Leftover bonus

  result += baseScore(MYSTERY, 1);
  result += baseScore(FANTASY);

  const coffeePenalty = [ALECTO, CETO].includes(assignations[COFFEE]) ? 0 : -1;
  result += baseScore(COFFEE, coffeePenalty);

  if (assignations[MIMIC] === TEKELI) {
    result += 1;
  }

  result += assignations[ROMANCE] === KATRINA ? 3 : baseScore(ROMANCE);

  if (testimonyFound({ characters, assignations })) {
    result += 3;
  }

  return result;
};

export const mimicUnveiled = (assignations) =>
  !!assignations[MIMIC] && ![MAHARAL, CAMILLA].includes(assignations[MIMIC]);

export const ghostFound = (assignations) =>
  [KATRINA, CETO].includes(assignations[ROMANCE]);

export const quality = ({ book, characters, assignations }) =>
  slots(characters)[assignations[book]]["quality"];

export const testimonyFound = ({ characters, assignations }) => {
  if (assignations[SCIENCE] === CAMILLA) {
    return false;
  }
  return quality({ book: SCIENCE, characters, assignations }) === GOOD;
};

export const success = ({ characters, assignations }) =>
  mimicUnveiled(assignations) && score({ characters, assignations }) >= 8;
