module.exports = {
  HOST: "sql12.freemysqlhosting.net",
  USER: "sql12607094",
  PASSWORD: "I1TsxfIW2r",
  DB: "sql12607094",
  dialect: "mysql",
  port : 3306,
  pool: {
    max: 100,
    min: 0,
    acquire: 100*1000,
    idle: 200000
  }
};