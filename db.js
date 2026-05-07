const mysql = require('mysql2');

// Connect to MySQL using the environment variable
const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('Connected to MySQL ✔');
  }
});

module.exports = db;