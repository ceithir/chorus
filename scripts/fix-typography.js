#!/usr/bin/env node

"use strict";

const fs = require("fs");

const supportedLanguages = ["fr"];
const yamlFolder = "i18n";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
const escapeRegExp = (string) => {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
};

const rules = {
  fr: [
    ["'", "’"],
    ["« ", "« "],
    ["« ", "« "],
    ["« ", "« "],
    ["« ", "« "],
    [" »", " »"],
    [" »", " »"],
    [" !", " !"],
    [" !", " !"],
    [" ?", " ?"],
    [" ?", " ?"],
    [" ;", " ;"],
    [" ;", " ;"],
    [" :", " :"],
    [" :", " :"],
  ],
};

const cleanFile = (filePath, language) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  let cleanedFileContent = fileContent;

  const replace = (a, b) => {
    const regex = typeof a === "string" ? new RegExp(escapeRegExp(a), "g") : a;
    cleanedFileContent = cleanedFileContent.replace(regex, b);
  };

  const languageRules = rules[language] || [];
  languageRules.forEach(([a, b]) => replace(a, b));

  fs.writeFileSync(filePath, cleanedFileContent);
};

const cleanFolder = (folder, language) => {
  const filePathRegex = new RegExp(`^(.+)\\.${language}\\.yml$`);

  fs.readdirSync(folder, { withFileTypes: true }).forEach((dirent) => {
    const name = dirent.name;
    if (dirent.isDirectory()) {
      cleanFolder(`${folder}/${name}`, language);
      return;
    }

    const match = name.match(filePathRegex);
    if (match) {
      cleanFile(`${folder}/${name}`, language);
    }
  });
};

supportedLanguages.forEach((language) => {
  cleanFolder(yamlFolder, language);
});
