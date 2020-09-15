import React from "react";
import { Typography, Card, Button, Collapse } from "antd";
import { useTranslation, Trans } from "react-i18next";
import Section from "../navigation/Section";
import "./EndingSection.less";

const { Paragraph } = Typography;
const { Panel } = Collapse;

const HOPE = "hope";
const RESPITE = "respite";
const BAD = "bad";
const ENDINGS = [BAD, RESPITE, HOPE];

const Hints = ({ forestSuccess, librarySuccess, citySuccess, tplus }) => {
  return (
    <>
      {!forestSuccess && <Paragraph>{tplus("hints.forest")}</Paragraph>}
      {!librarySuccess && <Paragraph>{tplus("hints.library")}</Paragraph>}
      {!citySuccess && <Paragraph>{tplus("hints.city")}</Paragraph>}
    </>
  );
};

const EndingSection = ({
  forestSuccess,
  librarySuccess,
  citySuccess,
  entitiesFound,
}) => {
  const { t } = useTranslation();
  const tplus = (key, params) => t(`extras.endings.${ending}.${key}`, params);

  const success = forestSuccess && librarySuccess && citySuccess;
  const ending = success ? (entitiesFound ? HOPE : RESPITE) : BAD;

  return (
    <Section text={`story.debrief.endings.${ending}`}>
      <Card
        title={t("extras.endings.title", {
          name: tplus("name"),
          index: ENDINGS.findIndex((end) => ending === end) + 1,
          total: ENDINGS.length,
        })}
        className="avh-ending"
      >
        {ending !== HOPE && (
          <Collapse>
            <Panel header={t("extras.endings.hints")}>
              {ending === BAD && (
                <Hints
                  forestSuccess={forestSuccess}
                  librarySuccess={librarySuccess}
                  citySuccess={citySuccess}
                  tplus={tplus}
                />
              )}
              {ending === RESPITE && <Paragraph>{tplus("hint")}</Paragraph>}
            </Panel>
          </Collapse>
        )}
        {ending === HOPE && (
          <Paragraph>
            <Trans i18nKey={"extras.thanks"} />
          </Paragraph>
        )}
        <Button onClick={() => window.location.reload(true)}>
          {t("ui.restart")}
        </Button>
      </Card>
    </Section>
  );
};

export default EndingSection;
