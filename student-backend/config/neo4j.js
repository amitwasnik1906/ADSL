const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'password') // your Neo4j username/password
);

module.exports = () => {
  driver.verifyConnectivity()
    .then(() => console.log('Neo4j connected'))
    .catch(err => console.error('Neo4j connection error', err));
};

module.exports.driver = driver;
