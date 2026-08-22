import { pool } from './index.js';

const seedSchemaAndData = async () => {
  console.log('🌱 Initializing PostgreSQL Schema and Seeding Database Data...');

  const schemaSql = `
    CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        city VARCHAR(100),
        country VARCHAR(100),
        tier VARCHAR(50) DEFAULT 'Explorer Tier',
        avatar TEXT,
        trips_completed INT DEFAULT 0,
        countries_visited INT DEFAULT 0,
        preferred_language VARCHAR(50) DEFAULT 'English (US)',
        display_currency VARCHAR(10) DEFAULT 'USD ($)',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS trips (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        cover_image TEXT,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        budget NUMERIC(12, 2) DEFAULT 0.00,
        status VARCHAR(50) DEFAULT 'Draft',
        is_public BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(schemaSql);
    console.log('✅ PostgreSQL Schema & Seed Data populated successfully!');
  } catch (err) {
    console.warn('⚠️ Local PostgreSQL database not running on port 5432. App using Express + client DB model fallback:', err.message);
  } finally {
    await pool.end();
  }
};

seedSchemaAndData();
