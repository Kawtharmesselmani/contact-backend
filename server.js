const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------- CREATE TABLE ---------- */
db.query(`
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {
  if (err) {
    console.error("Table creation error:", err);
  } else {
    console.log("Table 'messages' is ready ✔");
  }
});

/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("Backend is running ✔");
});

/* ---------- INSERT MESSAGE ---------- */
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = `
    INSERT INTO messages (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Insert error:", err);

      return res.status(500).json({
        success: false,
      });
    }

    res.json({
      success: true,
    });
  });
});

/* ---------- GET MESSAGES ---------- */
app.get("/api/messages", (req, res) => {
  db.query("SELECT * FROM messages", (err, result) => {
    if (err) {
      console.error(err);
      return res.send("DB error");
    }

    res.json(result);
  });
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});