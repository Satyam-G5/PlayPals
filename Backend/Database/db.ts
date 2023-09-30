import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config()

// const pool = new Pool({
//     host: 'localhost',
//     port: 5432,
//     database: 'users_data',
//     user: 'postgres',
//     password: 'Satyam12'
// });

const dblocal = `postgresql://${process.env.PGLOCAL_USER}:${process.env.PGLOCAL_PASSWORD}@${process.env.PGLOCAL_HOST}:${process.env.PGLOCAL_PORT}/${process.env.PGLOCAL_DATABASE}`
 
const pool = new Pool({
    connectionString : process.env.NODE === "production" ? process.env.POSTGRES_URL + "?sslmode=require" : dblocal 
  })

module.exports = pool;