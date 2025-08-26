const http = require("http");

function sendDataToServer(result) {
  const data = JSON.stringify(result);

  const options = {
    hostname: "localhost",
    port: 8008,
    path: "/send",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = http.request(options);

  req.write(data);
  req.end();
}

module.exports = sendDataToServer;
