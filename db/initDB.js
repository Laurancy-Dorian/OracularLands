var path = require('path');
var db = require(path.join(global.appRoot , 'config/db')).db;
var mysql = require('mysql');

var pool = mysql.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port
});

pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
});

module.exports = pool;