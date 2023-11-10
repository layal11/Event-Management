// const app = require("./app");
// import app from "app";

import app from "./app.js";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
