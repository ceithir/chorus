import {
  score,
  demonFound,
  POOR,
  OLD,
  RICH,
  SUPERMARKET,
  BANK,
} from "./locations";

import {
  RASHOMON,
  ALECTO,
  CETO,
  KATRINA,
  CAMILLA,
  TEKELI,
  CAROLE,
} from "../../characters";

test("score", () => {
  expect(score({})).toBe(0);
  expect(
    score({
      [POOR]: TEKELI,
      [OLD]: TEKELI,
      [BANK]: CAMILLA,
      [RICH]: RASHOMON,
    })
  ).toBe(3);
  expect(
    score({
      [POOR]: ALECTO,
      [OLD]: ALECTO,
      [BANK]: RASHOMON,
      [SUPERMARKET]: CAROLE,
    })
  ).toBe(1);
  expect(
    score({
      [POOR]: RASHOMON,
      [OLD]: CETO,
      [BANK]: KATRINA,
    })
  ).toBe(1);
  expect(
    score({
      [POOR]: RASHOMON,
      [OLD]: ALECTO,
      [BANK]: CAMILLA,
    })
  ).toBe(2);
});

test("demonFound", () => {
  expect(demonFound({})).toBe(false);
  expect(demonFound({ [BANK]: TEKELI })).toBe(false);
  expect(demonFound({ [BANK]: RASHOMON })).toBe(true);
});