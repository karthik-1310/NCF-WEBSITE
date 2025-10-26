-- Create database
CREATE DATABASE pocketguide_db;

-- Connect to the database
\c pocketguide_db;

-- Create species table
CREATE TABLE species (
    english_name VARCHAR(255) PRIMARY KEY,
    scientific_name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    taxa VARCHAR(100) NOT NULL,
    size VARCHAR(50)
);

-- Create illustrations table
CREATE TABLE illustrations (
    id SERIAL PRIMARY KEY,
    image_name VARCHAR(255) NOT NULL,
    image_link VARCHAR(512) NOT NULL,
    species_english_name VARCHAR(255) REFERENCES species(english_name),
    sex VARCHAR(10),
    breeding_status VARCHAR(20),
    subspecies VARCHAR(100),
    is_default BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create names table
CREATE TABLE names (
    id SERIAL PRIMARY KEY,
    species_english_name VARCHAR(255) REFERENCES species(english_name),
    language VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Create frequency table
CREATE TABLE frequency (
    id SERIAL PRIMARY KEY,
    english_name VARCHAR(255) REFERENCES species(english_name),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    frequency_rank INTEGER NOT NULL,
    observation_count INTEGER,
    seasonality VARCHAR(50)
);

-- Create indexes for better performance
CREATE INDEX idx_frequency_state_district ON frequency(state, district);
CREATE INDEX idx_illustrations_species ON illustrations(species_english_name);
CREATE INDEX idx_names_species ON names(species_english_name);
