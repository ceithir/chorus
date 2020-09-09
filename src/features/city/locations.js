export const POOR = "poor";
export const OLD = "old";
export const RICH = "rich";
export const SUPERMARKET = "supermarket";
export const BANK = "bank";
export const LOCATIONS = [OLD, RICH, SUPERMARKET, BANK, POOR];

import {
  RASHOMON,
  ALECTO,
  KATRINA,
  CAMILLA,
  TEKELI,
  CAROLE,
} from "../../characters";

export const score = (assignations) => {
  let result = 0;

  if ([TEKELI, CAROLE].includes(assignations[POOR])) {
    result += 2;
  }

  if ([TEKELI, ALECTO].includes(assignations[OLD])) {
    result += 2;
  }

  if ([CAMILLA, KATRINA].includes(assignations[BANK])) {
    result += 1;
  }

  if (assignations[SUPERMARKET] === CAROLE) {
    result -= 1;
  }

  return result;
};

export const demon = (assignations) =>
  [RASHOMON, CAMILLA, KATRINA].includes(assignations[BANK]);
