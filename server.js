const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

async function initializeDatabase() {
  try {

    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Table 'messages' is ready ✔");

  } catch (err) {

    console.error('Table error:', err);

  }
}

initializeDatabase();

app.post('/api/contact', async (req, res) => {

  try {

    const { name, email, message } = req.body;

    const sql = `
      INSERT INTO messages (name, email, message)
      VALUES (?, ?, ?)
    `;

    await db.query(sql, [name, email, message]);

    res.json({
      success: true
    });

  } catch (err) {

    console.error('Insert error:', err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

});

app.get('/', (req, res) => {
  res.send('Backend is running ✔');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});