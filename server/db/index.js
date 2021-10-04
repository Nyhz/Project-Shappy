const mongoose = require("mongoose");
const REMOTEDB = process.env.DB_REMOTE

mongoose
  .connect(REMOTEDB)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
