import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const { Pool } = pg

const DATABASE_LOCAL = 'postgresql://postgres:porthedland@localhost:5432/witly';

export const pool = new Pool ({
    connectionString: process.env.DATABASE_URL || DATABASE_LOCAL,
    ssl: process.env.NODE_ENV == 'dev' ? false :{rejectUnauthorized : false}
})

