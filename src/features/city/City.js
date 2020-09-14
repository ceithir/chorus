import React from "react";
import Section from "../navigation/Section";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSection,
  setSection,
  selectStep,
  nextStep,
  setChapter,
} from "../navigation/reducer";
import {
  TEKELI,
  ALECTO,
  CAROLE,
  RASHOMON,
  CAMILLA,
  KATRINA,
  name,
} from "../../characters";
import { selectCity, forceAssign } from "./reducer";
import {
  POOR,
  OLD,
  SUPERMARKET,
  BANK,
  LOCATIONS,
  success,
  RICH,
  SPECIAL,
} from "./locations";
import { selectParty } from "../party/reducer";
import CitySelector from "./CitySelector";
import { useTranslation } from "react-i18next";
import Results from "../debrief/Results";

const adventure = ({ location, character, t }) => {
  const tplus = (key) =>
    t(`story.city.locations.${key}`, { name: name({ t, character }) });
  const compose = (...keys) => {
    return keys.map((key) => tplus(key)).join("\n\n");
  };

  switch (location) {
    case POOR:
      if (![TEKELI, CAROLE].includes(character)) {
        return compose("poor.intro", "poor.failure");
      }
      return compose("poor.intro", `poor.${character}`, "poor.success");
    case OLD:
      if (![TEKELI, ALECTO].includes(character)) {
        return compose("old.intro", "old.failure");
      }
      return compose("old.intro", `old.${character}`, "old.success");
    case SUPERMARKET:
      if (character === CAROLE) {
        return compose("supermarket.default", "supermarket.carole");
      }
      return tplus("supermarket.default");
    case BANK:
      if (character === RASHOMON) {
        return compose("bank.default", "bank.rashomon");
      }
      if ([CAMILLA, KATRINA].includes(character)) {
        return compose("bank.default", "bank.spirit");
      }
      return tplus("bank.default");
    default:
      return tplus(location);
  }
};

const City = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const goTo = (section) => () => dispatch(setSection(section));
  const party = useSelector(selectParty("city"));
  const city = useSelector(selectCity());
  const step = useSelector(selectStep);
  const stepUp = () => dispatch(nextStep());
  const { t } = useTranslation();

  const RESULTS = "results";
  if (section === RESULTS) {
    const noAccess =
      (city[POOR] && ![TEKELI, CAROLE].includes(city[POOR])) ||
      (city[OLD] && ![ALECTO, TEKELI].includes(city[OLD]));

    const data = [
      [TEKELI, CAROLE].includes(city[POOR]) && {
        key: "poor",
        character: city[POOR],
        type: "success",
      },
      [ALECTO, TEKELI].includes(city[OLD]) && {
        key: "old",
        character: city[OLD],
        type: "success",
      },
      party.includes(ALECTO) && {
        key: "alecto",
        type: "success",
      },
      city[SPECIAL] && {
        key: "spider",
        type: "success",
      },
      noAccess && {
        key: "no-access",
        type: "warning",
      },
      (city[RICH] || city[SUPERMARKET]) && {
        key: "useless",
        type: "warning",
      },
      [(CAMILLA, RASHOMON, KATRINA)].includes(city[BANK]) && {
        key: "ally",
        character: city[BANK],
      },
      party.includes(CAROLE) && {
        key: "dream",
      },
    ].filter(Boolean);
    return (
      <Section next={() => dispatch(setChapter("finale"))}>
        <Results context="city" success={success(city)} data={data} />
      </Section>
    );
  }

  const ACTION = "action";
  if (section === ACTION) {
    const parts = [
      party.includes(CAROLE) && {
        text: t("story.city.carole"),
        character: CAROLE,
      },
      ...LOCATIONS.filter((location) => !!city[location]).map((location) => {
        const character = city[location];
        return { text: adventure({ location, character, t }), character };
      }),
      party.includes(ALECTO) && {
        text: t("story.city.alecto"),
        character: ALECTO,
      },
    ].filter(Boolean);
    const { text, character } = parts[step];
    return (
      <Section
        text={text}
        character={character}
        translated={true}
        next={parts[step + 1] ? stepUp : goTo(RESULTS)}
      />
    );
  }

  const SPLIT = "split";
  if (section === SPLIT) {
    if (party.includes(TEKELI) && !city[POOR]) {
      return <Section text={`story.city.split`} next={goTo(TEKELI)} />;
    }

    const completed = party.every((character) => {
      const assignCount = Object.values(city).filter(
        (chara) => chara === character
      ).length;
      if (character === TEKELI) {
        return assignCount === 2;
      }
      return assignCount === 1;
    });
    const next = goTo(ACTION);

    return (
      <Section text={"story.city.split"} next={completed && next}>
        <CitySelector characters={party} />
      </Section>
    );
  }

  if (section === TEKELI) {
    return (
      <Section
        text={`story.city.tekeli`}
        character={TEKELI}
        next={() => {
          dispatch(forceAssign({ character: TEKELI, location: POOR }));
          goTo(SPLIT)();
        }}
      />
    );
  }

  return (
    <Section
      text={`story.city.introduction`}
      character={RASHOMON}
      next={goTo(SPLIT)}
    />
  );
};

export default City;
