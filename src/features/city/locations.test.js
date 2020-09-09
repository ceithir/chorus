import { score, demon, POOR, OLD, RICH, SUPERMARKET, BANK } from "./locations";

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
  ).toBe(5);
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
});

test("demon", () => {
  expect(demon({})).toBe(false);
  expect(demon({ [BANK]: TEKELI })).toBe(false);
  expect(demon({ [BANK]: RASHOMON })).toBe(true);
});
