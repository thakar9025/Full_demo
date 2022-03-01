var bcrypt = require('bcrypt');
var {User} = require('../models/user')
const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const constant = require('../utils/constants')


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    { 
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idel: dbConfig.pool.idel,
    }
}
)

sequelize.authenticate()
    .then(() => {
        console.info(constant.databaseSuccess);
    })
    .catch(err => {
        console.log(err)
    })

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user')(sequelize, DataTypes);
  
 


// create all the defined tables in the specified database.
db.sequelize.sync({ force: false })
    .then(() => {
        console.info(constant.reSync)
    })

module.exports = db;