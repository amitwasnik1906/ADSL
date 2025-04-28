const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'studentkeyspace'
});

module.exports = () => {
  client.connect()
    .then(() => console.log('Cassandra connected'))
    .catch(err => console.error('Cassandra connection error', err));
};

module.exports.client = client;
