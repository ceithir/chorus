import React, { useState } from "react";
import { Modal, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const About = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button shape="circle" size="small" onClick={() => setVisible(true)}>
        ?
      </Button>
      <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Title level={2}>{t("ui.title")}</Title>
        {Object.values(t("extras.credits", { returnObjects: true })).map(
          (text, index) => {
            return <Paragraph key={index.toString()}>{text}</Paragraph>;
          }
        )}
      </Modal>
    </>
  );
};

export default About;
