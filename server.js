const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('Connected to MySQL ✔');
  }
});

// API to insert data into the 'messages' table
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'DB error' });
    }
    res.json({ success: true });
  });
});

// TEST route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});