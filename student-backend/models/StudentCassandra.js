const { client } = require('../config/cassandra');

async function saveCassandraStudent(data) {
  const query = `INSERT INTO students (id, firstName, lastName, email, phoneNumber, address, course, rollNumber) VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    data.firstName, data.lastName, data.email,
    data.phoneNumber, data.address, data.course, data.rollNumber
  ];
  await client.execute(query, params, { prepare: true });
}

module.exports = { saveCassandraStudent };
