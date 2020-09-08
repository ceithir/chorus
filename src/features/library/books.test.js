import {
  slots,
  score,
  MYSTERY,
  FANTASY,
  MIMIC,
  COFFEE,
  SCIENCE,
  ROMANCE,
  mimicUnveiled,
  ghostFound,
} from "./books";

import {
  MAHARAL,
  ALECTO,
  CETO,
  KATRINA,
  CAMILLA,
  TEKELI,
} from "../../characters";

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
  expect(slots([MAHARAL, TEKELI, CAMILLA])).toStrictEqual({
    [MAHARAL]: {
      quality: "bad",
    },
    [TEKELI]: {
      quality: "average",
      max: 2,
    },
    [CAMILLA]: {
      quality: "average",
      max: 2,
    },
  });
  expect(slots([MAHARAL, TEKELI, ALECTO])).toStrictEqual({
    [MAHARAL]: {
      quality: "bad",
    },
    [TEKELI]: {
      quality: "average",
      max: 2,
    },
    [ALECTO]: {
      quality: "good",
      max: 2,
    },
  });
});

test("score", () => {
  expect(
    score({
      characters: [MAHARAL, KATRINA, CETO],
      assignations: {
        [MYSTERY]: MAHARAL,
        [FANTASY]: MAHARAL,
        [MIMIC]: MAHARAL,
        [COFFEE]: MAHARAL,
        [SCIENCE]: MAHARAL,
        [ROMANCE]: MAHARAL,
      },
    })
  ).toBe(5);

  expect(
    score({
      characters: [MAHARAL, KATRINA, CETO],
      assignations: {
        [MYSTERY]: CETO,
        [FANTASY]: MAHARAL,
        [MIMIC]: CETO,
        [COFFEE]: CETO,
        [SCIENCE]: KATRINA,
        [ROMANCE]: KATRINA,
      },
    })
  ).toBe(11);

  expect(
    score({
      characters: [MAHARAL, KATRINA, CETO],
      assignations: {
        [MYSTERY]: KATRINA,
        [FANTASY]: KATRINA,
        [MIMIC]: CETO,
        [COFFEE]: MAHARAL,
        [SCIENCE]: CETO,
        [ROMANCE]: CETO,
      },
    })
  ).toBe(10);

  expect(
    score({
      characters: [MAHARAL, TEKELI, ALECTO],
      assignations: {
        [MYSTERY]: TEKELI,
        [FANTASY]: TEKELI,
        [MIMIC]: ALECTO,
        [COFFEE]: ALECTO,
        [SCIENCE]: MAHARAL,
        [ROMANCE]: MAHARAL,
      },
    })
  ).toBe(5);

  expect(
    score({
      characters: [MAHARAL, TEKELI, CAMILLA],
      assignations: {
        [MYSTERY]: MAHARAL,
        [FANTASY]: TEKELI,
        [MIMIC]: TEKELI,
        [COFFEE]: MAHARAL,
        [SCIENCE]: CAMILLA,
        [ROMANCE]: CAMILLA,
      },
    })
  ).toBe(3);
});

test("mimicUnveiled", () => {
  expect(mimicUnveiled({ [MIMIC]: TEKELI })).toBe(true);
  expect(mimicUnveiled({})).toBe(false);
  expect(mimicUnveiled({ [MIMIC]: MAHARAL })).toBe(false);
});

test("ghostFound", () => {
  expect(ghostFound({ [ROMANCE]: ALECTO })).toBe(false);
  expect(ghostFound({})).toBe(false);
  expect(ghostFound({ [ROMANCE]: CETO })).toBe(true);
});
