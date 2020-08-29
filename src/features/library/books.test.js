import { slots } from "./books";

import { MAHARAL, ALECTO, CETO, KATRINA, CAMILLA } from "../../characters";

test("slots", () => {
  expect(slots([MAHARAL, CETO, ALECTO])).toStrictEqual({
    [MAHARAL]: {
      quality: "bad",
    },
    [CETO]: {
      quality: "good",
      max: 3,
    },
    [ALECTO]: {
      quality: "good",
      max: 2,
    },
  });
  expect(slots([MAHARAL, KATRINA, CAMILLA])).toStrictEqual({
    [MAHARAL]: {
      quality: "bad",
    },
    [KATRINA]: {
      quality: "good",
      max: 2,
    },
    [CAMILLA]: {
      quality: "average",
      max: 2,
    },
  });
});
