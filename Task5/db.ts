import { Pool } from 'pg';

const pool = new Pool({
    user: 'natali',
    host: 'localhost',
    database: 'firstdb',
    password: '8409',
    port: 5432,
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err: Error) => console.error('Connection error', err));

export default pool;
