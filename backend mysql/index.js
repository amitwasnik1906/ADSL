const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // your MySQL username
  password: '',       // your MySQL password
  database: 'crud_sample' // your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Routes

// Create Item
app.post('/api/items', (req, res) => {
  const { name, quantity } = req.body;
  const sql = 'INSERT INTO items (name, quantity) VALUES (?, ?)';
  db.query(sql, [name, quantity], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, quantity });
  });
});

// Read All Items
app.get('/api/items', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update Item
app.put('/api/items/:id', (req, res) => {
  const { name, quantity } = req.body;
  const sql = 'UPDATE items SET name = ?, quantity = ? WHERE id = ?';
  db.query(sql, [name, quantity, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item updated successfully' });
  });
});

// Delete Item
app.delete('/api/items/:id', (req, res) => {
  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item deleted successfully' });
  });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
