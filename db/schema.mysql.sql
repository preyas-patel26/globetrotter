-- GlobeTrotter MySQL Database Schema

CREATE DATABASE IF NOT EXISTS globetrotter;
USE globetrotter;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    city VARCHAR(100),
    country VARCHAR(100),
    tier VARCHAR(50) DEFAULT 'Explorer Tier',
    avatar TEXT,
    role VARCHAR(20) DEFAULT 'user',
    trips_completed INT DEFAULT 0,
    countries_visited INT DEFAULT 0,
    preferred_language VARCHAR(50) DEFAULT 'English (US)',
    display_currency VARCHAR(10) DEFAULT 'USD ($)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Trips Table
CREATE TABLE IF NOT EXISTS trips (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget DECIMAL(12, 2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'Draft', -- Draft, Upcoming, Ongoing, Completed
    is_public TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
    id VARCHAR(64) PRIMARY KEY,
    trip_id VARCHAR(64),
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    image TEXT,
    nights INT DEFAULT 1,
    start_date DATE,
    end_date DATE,
    est_cost_per_day DECIMAL(10, 2),
    popularity_rating DECIMAL(3, 2),
    region VARCHAR(50),
    cost_level VARCHAR(20),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Day Itineraries Table
CREATE TABLE IF NOT EXISTS day_itineraries (
    id VARCHAR(64) PRIMARY KEY,
    destination_id VARCHAR(64),
    day_number INT NOT NULL,
    date DATE,
    title VARCHAR(255),
    focus TEXT,
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Activities Table
CREATE TABLE IF NOT EXISTS activities (
    id VARCHAR(64) PRIMARY KEY,
    day_id VARCHAR(64),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- Culture, Food, Adventure, Nature, Shopping, Relaxation, Transport, Hotel
    time VARCHAR(20),
    duration VARCHAR(50),
    estimated_cost DECIMAL(10, 2) DEFAULT 0.00,
    rating DECIMAL(3, 2),
    image TEXT,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (day_id) REFERENCES day_itineraries(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Custom Expenses Table
CREATE TABLE IF NOT EXISTS custom_expenses (
    id VARCHAR(64) PRIMARY KEY,
    trip_id VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- stay, transport, meals, activities, misc
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Community Trips Table
CREATE TABLE IF NOT EXISTS community_trips (
    id VARCHAR(64) PRIMARY KEY,
    original_trip_id VARCHAR(64),
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
    is_featured TINYINT(1) DEFAULT 0,
    FOREIGN KEY (original_trip_id) REFERENCES trips(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
