const { db } = require('../config/mysql');

async function saveMySQLStudent(data) {
  const sql = 'INSERT INTO students SET ?';
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = { saveMySQLStudent };
