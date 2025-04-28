const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '22510115', // your mysql password
  database: 'studentdb'
});

module.exports = () => {
  db.connect((err) => {
    if (err) {
      console.error('MySQL connection error', err);
    } else {
      console.log('MySQL connected');
      db.query(`CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        email VARCHAR(255),
        phoneNumber VARCHAR(20),
        address TEXT,
        course VARCHAR(255),
        rollNumber INT
      )`);
    }
  });
};

module.exports.db = db;
