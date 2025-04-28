const { driver } = require('../config/neo4j');

async function saveNeo4jStudent(data) {
  const session = driver.session();
  try {
    await session.run(
      `CREATE (s:Student {
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        phoneNumber: $phoneNumber,
        address: $address,
        course: $course,
        rollNumber: $rollNumber
      })`,
      data
    );
  } finally {
    await session.close();
  }
}

module.exports = { saveNeo4jStudent };
