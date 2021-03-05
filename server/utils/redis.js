const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => console.log('Connected to Redis-server'));
client.on('ready', () => console.log('Redis-client ready'));
client.on('error', err => console.log(err.message));
client.on('end', () => console.log('Disconnected from Redis-server'));

process.on('SIGINT', () => client.quit());

module.exports = client;