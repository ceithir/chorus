import {
  RASHOMON,
  ALECTO,
  KATRINA,
  CAMILLA,
  TEKELI,
  CAROLE,
} from "../../characters";

export const POOR = "poor";
export const OLD = "old";
export const RICH = "rich";
export const SUPERMARKET = "supermarket";
export const BANK = "bank";
export const LOCATIONS = [OLD, RICH, SUPERMARKET, BANK, POOR];
export const SPECIAL = "special";

export const score = (assignations) => {
  let result = 0;

  if ([TEKELI, CAROLE].includes(assignations[POOR])) {
    result += 1;
  }

  if ([TEKELI, ALECTO].includes(assignations[OLD])) {
    result += 1;
  }

  if ([CAMILLA, KATRINA].includes(assignations[BANK])) {
    result += 1;
  }

  if (assignations[SPECIAL]) {
    result += 1;
  }

  if (Object.values(assignations).includes(ALECTO)) {
    result += 1;
  }

  return result;
};

export const demonFound = (assignations) =>
  [RASHOMON, CAMILLA, KATRINA].includes(assignations[BANK]);

export const success = (assignations) => score(assignations) >= 2;
