import React from "react";
import { Typography, List, Tooltip } from "antd";
import { useTranslation, Trans } from "react-i18next";
import {
  RASHOMON,
  CETO,
  ALECTO,
  CAROLE,
  KATRINA,
  TEKELI,
  CAMILLA,
  DEJANIRE,
  MAHARAL,
  name,
} from "../../characters";
import "./Profile.less";

const { Title, Link } = Typography;

const standardizedAnswers = ["nature", "humanoid", "impetus", "bookishness"];
const freeTextAnswers = ["of-note", "job"];

const profiles = {
  [RASHOMON]: {
    nature: "flesh",
    humanoid: "class-2",
    species: ["oni"],
    impetus: "average",
    bookishness: "low",
  },
  [CETO]: {
    nature: "flesh",
    humanoid: "class-3",
    species: ["lamia", "gorgon"],
    impetus: "average",
    bookishness: "high",
  },
  [ALECTO]: {
    nature: "flesh",
    humanoid: "class-3",
    species: ["harpy"],
    impetus: "good",
    bookishness: "medium",
  },
  [CAROLE]: {
    nature: "mixed",
    humanoid: "class-1",
    species: ["catgirl", "cheshire"],
    impetus: "degraded",
    bookishness: "low",
  },
  [KATRINA]: {
    nature: "half-fay",
    humanoid: "class-1",
    species: ["dullahan"],
    impetus: "average",
    bookishness: "medium",
  },
  [TEKELI]: {
    nature: "mixed",
    humanoid: "class-7",
    species: ["slime"],
    impetus: "good",
    bookishness: "null",
  },
  [CAMILLA]: {
    nature: "dream",
    humanoid: "class-1",
    species: ["mask"],
    impetus: "good",
    bookishness: "null",
  },
  [DEJANIRE]: {
    nature: "flesh",
    humanoid: "class-3",
    species: ["centaur"],
    impetus: "bad",
    bookishness: "high",
  },
  [MAHARAL]: {
    nature: "composite",
    humanoid: "class-7",
    species: ["elemental", "golem"],
    impetus: "average",
    bookishness: "high",
  },
};

const orderedKeys = [
  "nature",
  "job",
  "humanoid",
  "appearance",
  "impetus",
  "bookishness",
  "of-note",
];

const FakeLink = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("extras.profile.links.error")}>
      <Link disabled>{children}</Link>
    </Tooltip>
  );
};

const FakeName = () => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("extras.profile.names.error")}>
      <span className="avh-censored-text">XXXXXXX</span>
    </Tooltip>
  );
};

const dataSource = ({ character, t, i18n }) => {
  const profile = profiles[character];
  if (!profile) {
    return [];
  }

  return orderedKeys
    .map((key) => {
      if (standardizedAnswers.includes(key)) {
        if (!profile[key]) {
          return null;
        }

        return {
          title: t(`extras.profile.${key}.title`),
          description: t(`extras.profile.${key}.${profile[key]}`),
        };
      }

      if (freeTextAnswers.includes(key)) {
        if (!i18n.exists(`characters.${character}.profile.${key}`)) {
          return null;
        }

        return {
          title: t(`extras.profile.${key}.title`),
          description: t(`characters.${character}.profile.${key}`),
        };
      }

      if (key === "appearance") {
        if (
          !profile["species"].find((species) =>
            i18n.exists(`extras.profile.appearance.${species}`)
          ) ||
          !i18n.exists(`characters.${character}.profile.appearance`)
        ) {
          return false;
        }

        return {
          title: t(`extras.profile.appearance.title`),
          description: (
            <>
              {profile["species"]
                .filter((species) =>
                  i18n.exists(`extras.profile.appearance.${species}`)
                )
                .map((species) => {
                  return (
                    <React.Fragment key={species}>
                      {t(`extras.profile.appearance.${species}.features`)}{" "}
                      <FakeLink>
                        <Trans
                          i18nKey={"extras.profile.links.see_more"}
                          values={{
                            species: t(
                              `extras.profile.appearance.${species}.name`
                            ),
                          }}
                        />
                      </FakeLink>
                      <br />
                    </React.Fragment>
                  );
                })}
              {t(`characters.${character}.profile.appearance`)}
            </>
          ),
        };
      }

      return null;
    })
    .filter(Boolean);
};

const Profile = ({ character }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="avh-character-profile">
      <Title level={3}>
        {name({ t, character })} <FakeName />
      </Title>
      <List
        dataSource={dataSource({ character, t, i18n })}
        renderItem={({ title, description }) => (
          <List.Item>
            <List.Item.Meta title={title} description={description} />
          </List.Item>
        )}
      />
      <FakeLink>{t("extras.profile.links.see_all")}</FakeLink>
    </div>
  );
};

export default Profile;
