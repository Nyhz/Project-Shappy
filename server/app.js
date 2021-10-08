require("dotenv/config");
require("./db");

const express = require("express");
const path = require('path');
const app = express();

require("./config")(app);
require("./config/cors.config")(app);
require('./config/session.config')(app)
app.use(express.static(path.join(__dirname, "public")))


const allRoutes = require("./routes");
app.use("/api", allRoutes);
app.use((req, res) => res.sendFile(__dirname + "/public/index.html"))

require("./error-handling")(app);


module.exports = app;
