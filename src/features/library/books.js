import { CAMILLA, TEKELI, MAHARAL, CETO } from "../../characters";

export const BOOKS = [
  "mystery",
  "fantasy",
  "mimic",
  "romance",
  "coffee",
  "science",
];

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
