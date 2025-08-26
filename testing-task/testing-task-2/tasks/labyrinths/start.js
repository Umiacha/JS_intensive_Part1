const { http, HttpResponse } = require("msw");
const { setupServer } = require("msw/node");

const main = require("./main");

(() => {
  const server = setupServer(
    http.post("http://localhost:8008/send", () => {
      return HttpResponse.json({
        status: "success",
      });
    }),
  );

  server.listen();

  const result = main();

  console.log("Результат: ", result);
})();
