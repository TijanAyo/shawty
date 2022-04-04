const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT);

process.env.NODE_ENV !== "production" &&
  server.on("listening", () =>
    console.log(`listening on http://localhost:${PORT}`)
  );
