import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLibrary, assignList } from "./reducer";
import { Card, List, Checkbox, Typography, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { BOOKS, slots, GOOD, BAD } from "./books";

const { Text, Paragraph } = Typography;

const QualityEvaluation = ({ quality, character }) => {
  const { t } = useTranslation();
  const text = (version) =>
    t(`locations.library.quality.${quality}.${version}`, {
      name: t(`characters.${character}.name`),
    });

  return (
    <Tooltip placement="top" title={text("long")}>
      <Paragraph type={quality === GOOD ? "success" : "warning"}>
        {text("short")}
      </Paragraph>
    </Tooltip>
  );
};

const BookCheckList = ({ character, quality, max }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const library = useSelector(selectLibrary());

  const currentlyAssigned = Object.keys(library).filter(
    (book) => library[book] === character
  );
  const maxedOut = max && currentlyAssigned.length >= max;
  const options = BOOKS.map((book) => {
    const disabled = (() => {
      if (library[book] === character) {
        return false;
      }
      return maxedOut || library[book];
    })();

    return {
      value: book,
      label: t(`locations.library.books.${book}`),
      disabled,
    };
  });
  const onChange = (books) => {
    dispatch(assignList({ character, books }));
  };

  return (
    <Card>
      <Text strong>{t(`characters.${character}.name`)}</Text>
      {max && (
        <Text strong={maxedOut}>{` ${currentlyAssigned.length}/${max}`}</Text>
      )}
      {[BAD, GOOD].includes(quality) && (
        <QualityEvaluation quality={quality} character={character} />
      )}
      <Checkbox.Group
        options={options}
        onChange={onChange}
        value={currentlyAssigned}
      />
    </Card>
  );
};

const BookSelector = ({ characters }) => {
  return (
    <List
      className="avh-library-selector"
      grid={{ gutter: 16, column: characters.length }}
      dataSource={characters}
      renderItem={(character) => (
        <List.Item key={character}>
          <BookCheckList
            key={character}
            character={character}
            {...slots(characters)[character]}
          />
        </List.Item>
      )}
    />
  );
};

export default BookSelector;
