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

var Product = databaseConnection.define(
  "products",
  {
    Prod_ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    Prod_Name: {
      type: Sequelize.STRING
    },
    Prod_Price: {
      type: Sequelize.INTEGER
    },
    Prod_Qty: {
      type: Sequelize.INTEGER,
    },
    Prod_Image: {
      type: Sequelize.TEXT,
    },
    // isDeleted: Sequelize.BOOLEAN,
  },
  {
    timestamps: false,
    freezeTableName: true, 
  }
);

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

//create new product
router.post("/create_new_product", authenticateToken ,(request, response) => {
  //set headers
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(request.body);
  Product.create(request.body).then((product) => {
    response.json(product);
  });
});

//fetch all the brands
router.get("/fetch_all_products", function (request, response) {
  //set headers
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  try {
    Product.findAll().then(function (products) {
      response.json(products);
    });
  } catch (ex) {
    response.json(ex);
  }
});

//fetch specific brand by id
router.get("/fetch_product_by_id/:Prod_ID", async function (request, response) {
  //set headers
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  try {
    const Prod_ID = request.params.Prod_ID;
    console.log(Prod_ID);
    const prodResult = await Product.findOne({
      where: { Prod_ID: Prod_ID },
    });
    console.log(prodResult);
    //check if result found
    if (prodResult === null) {
      response.json("No Product Found");
    } else {
      response.json(prodResult);
    }
  } catch (ex) {
    response.json(ex);
  }
});
//update
router.put("/update_target_product",authenticateToken ,function (request, response) {
  //set headers
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  try {
    const Prod_ID = request.body.Prod_ID;

    Product.update(
      {
        //fields to update
        Prod_Name: request.body.Prod_Name,
      },
      {
        //where clause
        where: {
            Prod_ID: Prod_ID,
        },
      }
    ).then(function (count) {
      response.json("Rows updated " + count);
    });
  } catch (ex) {
    response.json(ex);
  }
});

//TODO delete: can use the paranoid method but we dont have a deletion timestamp column
//so we will just set the isDeleted to false

//test connection
router.get("/testconnection", function (request, response) {
  //set headers
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.send("Product Management Test");
});

//to export the class
module.exports = router;