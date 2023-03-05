module.exports = {
  HOST: "sql12.freemysqlhosting.net",
  USER: "sql12602389",
  PASSWORD: "UuzX1t2aeJ",
  DB: "sql12602389",
  dialect: "mysql",
  port : 3306,
  pool: {
    max: 100,
    min: 0,
    acquire: 100*1000,
    idle: 200000
  }
};