import React from "react";
import Section from "../navigation/Section";
import { RASHOMON } from "../../characters";
import { useSelector, useDispatch } from "react-redux";
import { selectSection, setSection } from "../navigation/reducer";
import { TEKELI } from "../../characters";
import { selectCity, forceAssign } from "./reducer";
import { POOR } from "./locations";
import { selectParty } from "../party/reducer";
import CitySelector from "./CitySelector";

const City = () => {
  const section = useSelector(selectSection);
  const dispatch = useDispatch();
  const goTo = (section) => () => dispatch(setSection(section));
  const party = useSelector(selectParty("city"));
  const city = useSelector(selectCity());

  const SPLIT = "split";
  if (section === SPLIT) {
    if (party.includes(TEKELI) && !city[POOR]) {
      return <Section text={`story.city.split`} next={goTo(TEKELI)} />;
    }

    const completed =
      Object.values(city).filter(Boolean).length ===
      (party.includes(TEKELI) ? party.length + 1 : party.length);
    const next = () => console.log("TODO");

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
