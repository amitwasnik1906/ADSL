const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Change DB type here: ('mongo' | 'mysql' | 'cassandra' | 'neo4j')
const SELECTED_DB = 'mongo';

app.use(cors());
app.use(express.json());

// Connect DB based on selected
if (SELECTED_DB === 'mongo') {
  require('./config/mongo')();
} else if (SELECTED_DB === 'mysql') {
  require('./config/mysql')();
} else if (SELECTED_DB === 'cassandra') {
  require('./config/cassandra')();
} else if (SELECTED_DB === 'neo4j') {
  require('./config/neo4j')();
}

// Import correct model
let saveStudent;
if (SELECTED_DB === 'mongo') {
  const { saveMongoStudent } = require('./models/StudentMongo');
  saveStudent = saveMongoStudent;
} else if (SELECTED_DB === 'mysql') {
  const { saveMySQLStudent } = require('./models/StudentMySQL');
  saveStudent = saveMySQLStudent;
} else if (SELECTED_DB === 'cassandra') {
  const { saveCassandraStudent } = require('./models/StudentCassandra');
  saveStudent = saveCassandraStudent;
} else if (SELECTED_DB === 'neo4j') {
  const { saveNeo4jStudent } = require('./models/StudentNeo4j');
  saveStudent = saveNeo4jStudent;
}

// Routes
app.post('/student', async (req, res) => {
  try {
    await saveStudent(req.body);
    res.status(201).json({ message: `Student saved in ${SELECTED_DB}` });
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ error: 'Failed to save student.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
