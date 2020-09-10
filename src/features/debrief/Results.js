import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, List } from "antd";
import { name } from "../../characters";

const { Text, Title } = Typography;

const Results = ({ context, success, data }) => {
  const { t } = useTranslation();
  const tplus = (key, params) => t(`extras.results.${context}.${key}`, params);

  const conclusion = success ? (
    <Text strong type="success">
      {tplus("good")}
    </Text>
  ) : (
    <Text strong type="warning">
      {tplus("bad")}
    </Text>
  );

  return (
    <div className="avh-chapter-results">
      <Title level={3}>{t("extras.results.title")}</Title>
      <List
        footer={conclusion}
        dataSource={data}
        renderItem={({ key, character, type }) => (
          <List.Item>
            <Text type={type}>
              {tplus(key, { name: name({ character, t }) })}
            </Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Results;
