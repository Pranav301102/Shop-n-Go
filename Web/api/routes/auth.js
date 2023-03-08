require('dotenv').config()
const bcrypt = require('bcrypt')
var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
var dbConfig = require("../credentials");
const { response } = require("express");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());
const jwt = require('jsonwebtoken')

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


var Users = databaseConnection.define(
  "users",
  {
    User_ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    User_Name: {
      type: Sequelize.STRING
    },
    User_Pass: {
      type: Sequelize.STRING
    },
    
    User_Token: {
      type: Sequelize.INTEGER,
    },
    User_Email: {
      type: Sequelize.TEXT
    },
    User_Address: {
      type: Sequelize.TEXT
    },
    // isDeleted: Sequelize.BOOLEAN,
  },
  {
    timestamps: false,
    freezeTableName: true, 
  }
);

let refreshTokens = []

const users = []

router.get('/users', (req, res) => {
  try {
    Users.findAll().then(function (users) {
      res.json(users);
    });
  } catch (ex) {
    res.json(ex);
  }
  //res.json(users)
})

router.post('/users', async (req, res) => {
    
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // const user = { name: req.body.name, password: hashedPassword }
    Users.create({User_Name: req.body.name, User_Pass: hashedPassword, User_Email: req.body.email, User_Address: req.body.address })
    // users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

router.post('/token', async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  //if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  const user = await Users.findOne({ where: { User_Token: req.body.token } });
  if (user == null) {
    return res.status(403).send('Cannot find token')
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

router.delete('/logout',  (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

router.post('/login', async (req, res) => {
  // Authenticate User
  // console.log("this",process.env)
  // console.log("here",req.body)
  const user = await Users.findOne({ where: { User_Name: req.body.name } });
  if (user == null) {
    return res.status(401).send('Cannot find user')
  }
  try {
    if(bcrypt.compare(req.body.password, user.User_Pass)) {
        //SUCCESS
        // res.status(200).send()
        // const username = req.body.username
        // const user = { name: username }
        const accessToken = generateAccessToken(user.User_Name)
        const refreshToken = jwt.sign(user.User_Name, process.env.REFRESH_TOKEN_SECRET)
        try{
          await Users.update({User_Token: refreshToken}, { where: { User_Name: req.body.name } });
        }catch(err){ console.log(err)}
        res.json({ accessToken: accessToken, refreshToken: refreshToken }).status(201).send()
    } else {
      res.status(401).send()
    }
  } catch(err) {
    res.send(err.message)
  }
})

router.get('/verify', authenticateToken, (req, res) => {
  res.status(200).send() 
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

 function generateAccessToken(user) {
  const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30 days' })
  return token;
}

module.exports = router;

