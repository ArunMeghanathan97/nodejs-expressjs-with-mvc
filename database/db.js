const mysql = require('mysql');
const db_config = require('../config/db.config');

var connection = mysql.createPool({
    host : db_config.HOST,
    user : db_config.USER,
    password : db_config.PASSWORD,
    database : db_config.DB,
    multipleStatements: true
});

module.exports = connection;