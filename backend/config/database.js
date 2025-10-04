// backend/config/database.js
const { Pool } = require('pg');
require('dotenv').config();

// Prefer a single DATABASE_URL if provided (e.g., from Render)
// Falls back to individual vars for local development
const useConnectionString = Boolean(process.env.DATABASE_URL);

const pool = useConnectionString
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      // Only disable SSL verification in development
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: true }
        : { rejectUnauthorized: false }
    })
  : new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'skill_swap_db',
      password: process.env.DB_PASSWORD || '',
      port: Number(process.env.DB_PORT) || 5432
    });

// Test the database connection
pool.connect()
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    console.error('Please check your database configuration in .env file');
    // Exit in production, continue in development for debugging
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });

module.exports = pool;
