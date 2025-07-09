// db/pool.js

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import PostgreSQL client from pg
import pg from 'pg';
const { Pool } = pg;

// ✅ Create and export a new PostgreSQL connection pool
// Uses connection string from environment variable (secure & configurable)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
