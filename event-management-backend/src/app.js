import express from "express";
import database from "../config/database.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import UserRoute from "../routes/UserRoute.js";
import AdminRoute from "../routes/AdminRoute.js";
import CategoryRoute from "../routes/CategoryRoute.js";
import EventRoute from "../routes/EventRoute.js";
import cors from "cors";

dotenv.config();
database();
const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cors());
app.get("/testing", (req, res) => {
  res.status(200).send("Hello World!");
});
app.use(express.static("uploads"));

app.use("/user", UserRoute);
app.use("/admin", AdminRoute);
app.use("/category", CategoryRoute);
app.use("/event", EventRoute);


export default app;
