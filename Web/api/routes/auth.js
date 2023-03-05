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



let refreshTokens = []


const users = []

router.get('/users', (req, res) => {
  res.json(users)
})

router.post('/users', async (req, res) => {
    console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

router.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

router.post('/login', (req, res) => {
  // Authenticate User
  console.log("this",process.env)
  console.log("here",req.body)
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(bcrypt.compare(req.body.password, user.password)) {
        //SUCCESS
        // res.status(200).send()
        // const username = req.body.username
        // const user = { name: username }
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.json({ accessToken: accessToken, refreshToken: refreshToken }).send()
    } else {
      res.status(401).send()
    }
  } catch(err) {
    res.send(err.message)
  }
})

 function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

module.exports = router;

