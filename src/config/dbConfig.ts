import { Pool } from 'pg';

const pool = new Pool({
    connectionString: 'postgres://postgres:yerosen@localhost:5432/pizza_db'
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Error connecting to PostgreSQL database:', err);
    process.exit(-1);
});

export default pool;
