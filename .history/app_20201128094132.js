const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all(
  "/api",
  function (req, res, next) {
    console.log("Accessing the secret section ...");
    next(); // pass control to the next handler
  },
  function (req, res) {
    res.send("Hello from D!");
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
