var dbConfig = require("./credentials");
const express = require("express");
const cors=require("cors");
var Sequelize = require("sequelize");
var brandManagement = require("./routes/productManagement");
var authenticate = require("./routes/auth");
const app = express(); 
const PORT = 8085;
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))

const databaseConnection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port : dbConfig.port,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


app.get("/", function (request, response) {
  response.send("Server is online!");
});

app.use("/api/productManagement", brandManagement);
app.use("/api/auth", authenticate);

app.listen(PORT);
console.log("server is running on http://127.0.0.1:" + PORT);