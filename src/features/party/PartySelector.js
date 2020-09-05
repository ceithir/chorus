import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectParty, addToParty } from "./reducer";
import { Typography, Card, List, Button } from "antd";
import { useTranslation } from "react-i18next";
import "./PartySelector.less";
import { name } from "../../characters";

const { Text } = Typography;

const pad = (arr, len, fill) => arr.concat(Array(len).fill(fill)).slice(0, len);

const PartyCard = ({ party, location, full, onClick }) => {
  const { t } = useTranslation();
  const buttonRef = useRef();

  return (
    <Card
      data-location={location}
      title={t(`locations.${location}.title`)}
      hoverable={!full}
      onClick={() => {
        buttonRef.current.blur();
        onClick();
      }}
    >
      <List
        bordered={!full}
        dataSource={pad(party, 3, "placeholder")}
        renderItem={(character) => (
          <List.Item>
            <Text>{name({ t, character })}</Text>
          </List.Item>
        )}
      />
      <Button ref={buttonRef} disabled={full}>
        {"+"}
      </Button>
    </Card>
  );
};

const LocationCard = ({ location, character, next }) => {
  const party = useSelector(selectParty(location));
  const dispatch = useDispatch();

  const full = party.length >= 3;
  const onClick = () => {
    if (full) {
      return;
    }
    dispatch(addToParty({ character, location }));
    next();
  };

  return (
    <PartyCard
      party={party}
      location={location}
      full={full}
      onClick={onClick}
    />
  );
};

const PartySelector = ({ character, next }) => {
  const locations = ["forest", "library", "city"];

  return (
    <List
      className="avh-party-selector"
      grid={{ gutter: 16, column: locations.length }}
      dataSource={locations}
      renderItem={(location) => (
        <List.Item key={location}>
          <LocationCard
            key={location}
            location={location}
            character={character}
            next={next}
          />
        </List.Item>
      )}
    />
  );
};

export default PartySelector;
