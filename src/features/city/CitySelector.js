import React from "react";
import { Card, Radio, List, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { LOCATIONS, POOR } from "./locations";
import { useSelector, useDispatch } from "react-redux";
import { selectCity, assign } from "./reducer";
import { TEKELI } from "../../characters";
import "./CitySelector.less";

const { Text } = Typography;

const CityButtons = ({ character }) => {
  const { t } = useTranslation();
  const city = useSelector(selectCity());
  const dispatch = useDispatch();

  const places = LOCATIONS.filter(
    (location) => character !== TEKELI || location !== POOR
  );

  return (
    <Card>
      <Text strong>{t(`characters.${character}.name`)}</Text>
      <Radio.Group
        onChange={(event) => {
          dispatch(assign({ character, location: event.target.value }));
        }}
        value={places.find((location) => city[location] === character)}
      >
        {places.map((location) => {
          const disabled = !!city[location] && city[location] !== character;

          return (
            <Radio.Button key={location} value={location} disabled={disabled}>
              {t(`locations.city.locations.${location}`)}
            </Radio.Button>
          );
        })}
        {character === TEKELI && (
          <Text type="secondary" className="ant-radio-button-wrapper">
            + {t(`locations.city.locations.${POOR}`)}
          </Text>
        )}
      </Radio.Group>
    </Card>
  );
};

const CitySelector = ({ characters }) => {
  return (
    <List
      className="avh-city-selector"
      dataSource={characters}
      renderItem={(character) => (
        <List.Item key={character}>
          <CityButtons key={character} character={character} />
        </List.Item>
      )}
    />
  );
};

export default CitySelector;
