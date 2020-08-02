#!/usr/bin/env node

"use strict";

const yaml = require("js-yaml");
const fs = require("fs");

const supportedLanguages = ["fr", "en"];
const yamlFolder = "i18n";
const jsonFolder = "src/i18n";

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

supportedLanguages.forEach((language) => {
  const regexpToMatch = new RegExp(`^(.+)\\.${language}\\.yml$`);
  fs.writeFileSync(
    `${jsonFolder}/${language}.json`,
    JSON.stringify(importFolder(yamlFolder, regexpToMatch))
  );
});
