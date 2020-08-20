import {
  DEJANIRE,
  ALECTO,
  CAMILLA,
  CAROLE,
  CETO,
  KATRINA,
  TEKELI,
} from "../../characters";

export const score = ({ north, south, west, east }) => {
  let total = 0;

  switch (north) {
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
  }

  switch (south) {
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
  }

  switch (west) {
    case TEKELI:
    case CAROLE:
      total += 1;
      break;
    case CETO:
    case DEJANIRE:
      total += 3;
      break;
  }

  switch (east) {
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
  }

  return total;
};

export const divine = ({ south }) => {
  return south === DEJANIRE || south === CAMILLA;
};
