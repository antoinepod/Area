const mysql = require('mysql2');


connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect(function(err) {
    if (err) console.log(err);
    else console.log("MySQL database connected");
});

exports.connection = connection;