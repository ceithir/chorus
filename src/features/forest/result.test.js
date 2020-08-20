import { score, divine } from "./result";

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
  expect(score({ north: CETO })).toBe(3);
  expect(score({ north: CETO, south: DEJANIRE, west: ALECTO })).toBe(5);
  expect(score({ north: TEKELI, south: CAMILLA, west: DEJANIRE })).toBe(11);
  expect(score({ north: DEJANIRE, west: CAROLE, east: KATRINA })).toBe(7);
});

test("divine", () => {
  expect(divine({})).toBe(false);
  expect(divine({ north: DEJANIRE })).toBe(false);
  expect(divine({ south: DEJANIRE })).toBe(true);
  expect(divine({ south: CAMILLA })).toBe(true);
  expect(divine({ south: KATRINA })).toBe(false);
});
