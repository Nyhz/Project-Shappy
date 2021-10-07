require("dotenv/config");
require("./db");

const express = require("express");
const path = require('path');
const app = express();

require("./config")(app);
require('./config/session.config')(app)
require("./config/cors.config")(app);



const allRoutes = require("./routes");
app.use("/api", allRoutes);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

require("./error-handling")(app);


module.exports = app;
