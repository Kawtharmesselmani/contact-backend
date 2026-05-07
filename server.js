const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- CREATE TABLE -------------------- */
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

/* -------------------- TEST ROUTE -------------------- */
app.get("/", (req, res) => {
  res.send("API is working ✔");
});

/* -------------------- INSERT MESSAGE -------------------- */
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
        error: "Database error"
      });
    }

    res.json({
      success: true,
      message: "Message saved successfully ✔"
    });
  });
});

/* -------------------- GET ALL MESSAGES -------------------- */
app.get("/api/messages", (req, res) => {
  const sql = "SELECT * FROM messages ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Fetch error:", err);
      return res.status(500).json({
        success: false,
        error: "Database error"
      });
    }

    res.json(result);
  });
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});