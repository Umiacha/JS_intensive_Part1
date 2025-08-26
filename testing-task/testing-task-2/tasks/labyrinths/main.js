const getDataFromFile = require("./read");
const scan = require("./scan");
const sendDataToServer = require("./send");

function main() {
  const items = getDataFromFile();

  const dictionary = {
    pass: 0,
    failed: 0,
  };

  for (const item of items) {
    const result = scan(item);

    if (result.isolated + result.ceil + result.floor >= result.both) {
      dictionary.failed++;
    } else {
      dictionary.pass++;
    }
  }

  const passed = dictionary.pass > dictionary.failed;

  if (passed) {
    sendDataToServer({ passed });
  }

  return passed;
}

module.exports = main;
