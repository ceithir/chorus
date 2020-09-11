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
import { POOR, OLD, SUPERMARKET, BANK, LOCATIONS } from "./locations";
import { selectParty } from "../party/reducer";
import CitySelector from "./CitySelector";
import { useTranslation } from "react-i18next";

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

  const ACTION = "action";
  if (section === ACTION) {
    const adventures = LOCATIONS.filter((location) => !!city[location]).map(
      (location) => {
        const character = city[location];
        return { text: adventure({ location, character, t }), character };
      }
    );
    const parts = party.includes(CAROLE)
      ? [{ text: t("story.city.carole"), character: CAROLE }, ...adventures]
      : [...adventures];
    const { text, character } = parts[step];
    return (
      <Section
        text={text}
        character={character}
        translated={true}
        next={parts[step + 1] ? stepUp : () => dispatch(setChapter("finale"))}
      />
    );
  }

  const SPLIT = "split";
  if (section === SPLIT) {
    if (party.includes(TEKELI) && !city[POOR]) {
      return <Section text={`story.city.split`} next={goTo(TEKELI)} />;
    }

    const completed =
      Object.values(city).filter(Boolean).length ===
      (party.includes(TEKELI) ? party.length + 1 : party.length);
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
