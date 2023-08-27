const { Pool } = require("pg");

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    database: 'users_data',
    user: 'postgres',
    password: 'Satyam12'
});

module.exports = pool;