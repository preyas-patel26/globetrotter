-- GlobeTrotter PostgreSQL Database Schema

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
    status VARCHAR(50) DEFAULT 'Draft', -- Draft, Upcoming, Ongoing, Completed
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS destinations (
    id VARCHAR(64) PRIMARY KEY,
    trip_id VARCHAR(64) REFERENCES trips(id) ON DELETE CASCADE,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    image TEXT,
    nights INT DEFAULT 1,
    start_date DATE,
    end_date DATE,
    est_cost_per_day NUMERIC(10, 2),
    popularity_rating NUMERIC(3, 2),
    region VARCHAR(50),
    cost_level VARCHAR(20),
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS day_itineraries (
    id VARCHAR(64) PRIMARY KEY,
    destination_id VARCHAR(64) REFERENCES destinations(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    date DATE,
    title VARCHAR(255),
    focus TEXT
);

CREATE TABLE IF NOT EXISTS activities (
    id VARCHAR(64) PRIMARY KEY,
    day_id VARCHAR(64) REFERENCES day_itineraries(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- Culture, Food, Adventure, Nature, Shopping, Relaxation, Transport, Hotel
    time VARCHAR(20),
    duration VARCHAR(50),
    estimated_cost NUMERIC(10, 2) DEFAULT 0.00,
    rating NUMERIC(3, 2),
    image TEXT,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS custom_expenses (
    id VARCHAR(64) PRIMARY KEY,
    trip_id VARCHAR(64) REFERENCES trips(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- stay, transport, meals, activities, misc
    amount NUMERIC(10, 2) NOT NULL,
    expense_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS community_trips (
    id VARCHAR(64) PRIMARY KEY,
    original_trip_id VARCHAR(64) REFERENCES trips(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    creator_name VARCHAR(100),
    creator_avatar TEXT,
    creator_badge VARCHAR(50),
    duration VARCHAR(50),
    season VARCHAR(50),
    budget_tier VARCHAR(50),
    est_budget VARCHAR(50),
    likes_count INT DEFAULT 0,
    cover_image TEXT,
    is_featured BOOLEAN DEFAULT FALSE
);
