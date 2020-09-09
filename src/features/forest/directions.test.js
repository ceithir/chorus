import { score, divine, NORTH, SOUTH, WEST, EAST } from "./directions";

import {
  DEJANIRE,
  ALECTO,
  CAMILLA,
  CAROLE,
  CETO,
  KATRINA,
  TEKELI,
} from "../../characters";

test("score", () => {
  expect(score({})).toBe(0);
  expect(score({ [NORTH]: CETO })).toBe(3);
  expect(score({ [NORTH]: CETO, [SOUTH]: DEJANIRE, [WEST]: ALECTO })).toBe(5);
  expect(score({ [NORTH]: TEKELI, [SOUTH]: CAMILLA, [WEST]: DEJANIRE })).toBe(
    11
  );
  expect(score({ [NORTH]: DEJANIRE, [WEST]: CAROLE, [EAST]: KATRINA })).toBe(7);
});

test("divine", () => {
  expect(divine({})).toBe(false);
  expect(divine({ [NORTH]: DEJANIRE })).toBe(false);
  expect(divine({ [SOUTH]: DEJANIRE })).toBe(true);
  expect(divine({ [SOUTH]: CAMILLA })).toBe(true);
  expect(divine({ [SOUTH]: KATRINA })).toBe(false);
});
