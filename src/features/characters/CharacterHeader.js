import React, { useState } from "react";
import { Typography, Card, Button, Drawer } from "antd";
import "./CharacterHeader.less";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";

const { Text } = Typography;

const CharacterHeader = ({ character }) => {
  const [showRecord, setShowRecord] = useState(false);
  const { t } = useTranslation();

  return (
    <Card className="avh-character-header">
      <Text strong>{t(`characters.${character}.name`)}</Text>
      <Button shape="circle" size="small" onClick={() => setShowRecord(true)}>
        ?
      </Button>
      <Drawer
        placement={"left"}
        visible={showRecord}
        onClose={() => setShowRecord(false)}
        width={"min(100%, 512px)"}
      >
        <Profile character={character} />
      </Drawer>
    </Card>
  );
};

export default CharacterHeader;
