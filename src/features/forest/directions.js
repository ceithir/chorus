import {
  DEJANIRE,
  ALECTO,
  CAMILLA,
  CAROLE,
  CETO,
  KATRINA,
  TEKELI,
} from "../../characters";

export const NORTH = "north";
export const SOUTH = "south";
export const WEST = "west";
export const EAST = "east";

export const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

export const score = (assignations) => {
  let total = 0;

  switch (assignations[NORTH]) {
    case ALECTO:
    case CAROLE:
      total += 1;
      break;
    case CAMILLA:
    case KATRINA:
      total += 2;
      break;
    case CETO:
    case DEJANIRE:
      total += 3;
      break;
    case TEKELI:
      total += 4;
      break;
    default:
      break;
  }

  switch (assignations[SOUTH]) {
    case ALECTO:
      total += 1;
      break;
    case DEJANIRE:
    case KATRINA:
      total += 2;
      break;
    case CETO:
      total += 3;
      break;
    case CAMILLA:
    case TEKELI:
      total += 4;
      break;
    default:
      break;
  }

  switch (assignations[WEST]) {
    case TEKELI:
    case CAROLE:
      total += 1;
      break;
    case CETO:
    case DEJANIRE:
      total += 3;
      break;
    default:
      break;
  }

  switch (assignations[EAST]) {
    case ALECTO:
      total += 1;
      break;
    case CAMILLA:
      total += 2;
      break;
    case CETO:
    case DEJANIRE:
    case KATRINA:
    case CAROLE:
      total += 3;
      break;
    case TEKELI:
      total += 4;
      break;
    default:
      break;
  }

  return total;
};

export const divineFound = (assignations) => {
  return [DEJANIRE, CAMILLA].includes(assignations[SOUTH]);
};
