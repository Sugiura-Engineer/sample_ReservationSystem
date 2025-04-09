const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'WaterMouse0',
  database: 'reservation_system',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();
