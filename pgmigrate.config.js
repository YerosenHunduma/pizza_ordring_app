const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    migrationsTable: 'pgmigrations',
    dir: 'src/migrations',
    dbConnectionString: process.env.DATABASE_URL,
    schema: 'public'
};
