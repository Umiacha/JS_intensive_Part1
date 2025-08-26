const fs = require("fs");
const path = require("path");

function getDataFromFile() {
  const filePath = path.join(__dirname, "text.txt");
  const text = fs.readFileSync(filePath, "utf-8");

  return text
    .split("\n")
    .filter(Boolean)
    .map((element) => JSON.parse(element));
}

module.exports = getDataFromFile;
