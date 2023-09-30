"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
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
