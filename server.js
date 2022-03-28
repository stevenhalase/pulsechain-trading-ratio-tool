const express = require("express");

const app = express();
const path = require("path");
const history = require("connect-history-api-fallback");

const port = process.env.PORT || 3090;

// Force redirect to https
// app.use(function (req, res, next) {
//   const host = req.get("Host");
//   if (req.get("X-Forwarded-Proto") !== "https") {
//     res.redirect("https://" + host + req.url);
//   } else next();
// });

app.use(history());

app.use(express.static(`${__dirname}/www`));

app.get("/*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/www/index.html`));
});

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
