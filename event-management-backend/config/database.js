// const mongoose = require("mongoose");
import mongoose from "mongoose";


const connect = () => {
  // Connecting to the database
  mongoose
      .connect(process.env.DB_CONN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
export default connect;
