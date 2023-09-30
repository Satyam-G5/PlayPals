import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'users_data',
    user: 'postgres',
    password: 'Satyam12'
});

// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL + "?sslmode=require",
//   })

module.exports = pool;