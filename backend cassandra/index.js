const express = require('express');
const cassandra = require('cassandra-driver');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cassandra Connection
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],  // Your Cassandra node IP
  localDataCenter: 'datacenter1', // Your Cassandra datacenter name
  keyspace: 'crud_sample'         // Your keyspace name
});

client.connect()
  .then(() => console.log('Connected to Cassandra'))
  .catch(err => console.error('Cassandra connection error:', err));

// Routes

// Create Item
app.post('/api/items', async (req, res) => {
  const { id, name, quantity } = req.body;
  const query = 'INSERT INTO items (id, name, quantity) VALUES (?, ?, ?)';
  try {
    await client.execute(query, [id, name, quantity], { prepare: true });
    res.status(201).json({ id, name, quantity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All Items
app.get('/api/items', async (req, res) => {
  const query = 'SELECT * FROM items';
  try {
    const result = await client.execute(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Item
app.put('/api/items/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const id = req.params.id;
  const query = 'UPDATE items SET name = ?, quantity = ? WHERE id = ?';
  try {
    await client.execute(query, [name, quantity, id], { prepare: true });
    res.json({ message: 'Item updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Item
app.delete('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM items WHERE id = ?';
  try {
    await client.execute(query, [id], { prepare: true });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
