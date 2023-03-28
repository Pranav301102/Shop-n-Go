module.exports = {
  HOST: "aryansdomain.com",
  USER: "root",
  PASSWORD: "ember@2023",
  DB: "ShopnGo",
  dialect: "mysql",
  port : 3306,
  pool: {
    max: 100,
    min: 0,
    acquire: 100*1000,
    idle: 200000
  }
};