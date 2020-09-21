#!/usr/bin/env node

"use strict";

const yaml = require("js-yaml");
const fs = require("fs");

const supportedLanguages = ["fr", "en"];
const yamlFolder = "i18n";
const jsonFolder = "src/i18n";
const originalLanguage = ["fr"];

const importFolder = (folder, regexpToMatch) => {
  const result = {};

  fs.readdirSync(folder, { withFileTypes: true }).forEach((dirent) => {
    const name = dirent.name;
    if (dirent.isDirectory()) {
      result[name] = importFolder(`${folder}/${name}`, regexpToMatch);
      return;
    }

    const match = name.match(regexpToMatch);
    if (match) {
      result[match[1]] = yaml.safeLoad(
        fs.readFileSync(`${folder}/${name}`, "utf8")
      );
    }
  });

  return result;
};

const loadTranslations = (language) => {
  const regexpToMatch = new RegExp(`^(.+)\\.${language}\\.yml$`);
  return importFolder(yamlFolder, regexpToMatch);
};

const flattenObject = (object) => {
  return Object.keys(object)
    .map((key) => {
      if (typeof object[key] !== "object") {
        return [key];
      }
      return flattenObject(object[key]).map((suffix) => `${key}.${suffix}`);
    })
    .reduce((acc, current) => {
      return [...acc, ...current];
    }, []);
};

const requiredKeys = flattenObject(loadTranslations(originalLanguage));

const missingKeys = (translations) => {
  const definedKeys = flattenObject(translations);

  return requiredKeys.filter((key) => !definedKeys.includes(key)).sort();
};

supportedLanguages.forEach((language) => {
  const translations = loadTranslations(language);

  fs.writeFileSync(
    `${jsonFolder}/${language}.json`,
    JSON.stringify(translations)
  );

  missingKeys(translations).forEach((key) => {
    console.warn(`Missing ${language.toUpperCase()} key: ${key}`);
  });
});
