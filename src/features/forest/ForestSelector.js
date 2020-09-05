import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectForest, sendTo } from "./reducer";
import { Card, Radio, List, Typography } from "antd";
import { CAROLE, name } from "../../characters";
import "./ForestSelector.less";
import { useTranslation } from "react-i18next";
import { DIRECTIONS, SOUTH } from "./directions";

const { Text } = Typography;

const ForestRoseWind = ({ character }) => {
  const forest = useSelector(selectForest());
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Card>
      <Text strong>{name({ t, character })}</Text>
      <Radio.Group
        onChange={(event) => {
          dispatch(sendTo({ character, direction: event.target.value }));
        }}
        value={DIRECTIONS.find((direction) => forest[direction] === character)}
      >
        {DIRECTIONS.map((direction) => {
          const disabled = (() => {
            if (character === CAROLE && direction === SOUTH) {
              return true;
            }
            return !!forest[direction] && forest[direction] !== character;
          })();

          return (
            <Radio.Button key={direction} value={direction} disabled={disabled}>
              {t(`locations.forest.directions.${direction}`)}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </Card>
  );
};

const ForestSelector = ({ characters }) => {
  return (
    <List
      className="avh-forest-selector"
      grid={{ gutter: 16, column: characters.length }}
      dataSource={characters}
      renderItem={(character) => (
        <List.Item key={character}>
          <ForestRoseWind key={character} character={character} />
        </List.Item>
      )}
    />
  );
};

export default ForestSelector;
