const { Pool } = require('pg');

const pool = new Pool({
    user: 'natali',
    host: 'db',
    database: 'firstDB',
    password: '8409',
    port: 5432,
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err));

module.exports = pool;
