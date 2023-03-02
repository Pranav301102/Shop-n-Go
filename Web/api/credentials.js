module.exports = {
  HOST: "shopandgo.mysql.pythonanywhere-services.com",
  USER: "shopandgo",
  PASSWORD: "embe@shopngo",
  DB: "shopandgo$inventory",
  dialect: "mysql",
  port : 3306,
  pool: {
    max: 100,
    min: 0,
    acquire: 100*1000,
    idle: 200000
  }
};