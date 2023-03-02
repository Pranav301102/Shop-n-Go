var dbConfig = require("./credentials");
const express = require("express");
var Sequelize = require("sequelize");
const app = express(); 
const PORT = 8085;

const databaseConnection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


app.get("/", function (request, response) {
  response.send("Welcome to Keijaoh Tutorials!");
});


var brandManagement = require("./routes/brandManagement");
// var categoriesManagement = require("./routes/categoriesManagement");
// var locationManagement = require("./routes/locationManagement");

app.use("/api/brandmanagement", brandManagement);
// app.use("/api/categoriesmanagement", categoriesManagement);
// app.use("/api/locationmanagement", locationManagement);

app.listen(PORT);
console.log("server is running on http://127.0.0.1:" + PORT);