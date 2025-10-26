# Data Ingestion Process Documentation

## Overview

This document explains the data ingestion process for the NCF Pocket Guide Creator application. The ingestion process imports data from CSV files into the PostgreSQL database, including species information, images, local names, and frequency data.

## Input Files

The ingestion process requires the following CSV files:

1. **species.csv**: Primary species data

   - Required columns: `English Name`, `Scientific Name`
   - Optional columns: `Size`, `Mizo Name`, `Image File Name`, `Image Link`, `Sex`, `Breeding Status`, `Subspecies`

2. **frequency_birds.csv**: Regional frequency data

   - Required columns: `English Name`, `State`
   - Optional columns: `District`, `Frequency Rank`, `Observation Count`, `Seasonality`

3. **google_drive_inventory.csv**: Mapping of filenames to Google Drive links
   - Required columns: `FileName`, `ShareableLink`

## Ingestion Process

The ingestion is handled by `backend/ingest_data_complete.py`, which is called by `backend/run_complete_ingestion.py`. The process follows these steps:

### 1. Load CSV Files

- Load the species, frequency, and Google Drive inventory CSV files
- Create a mapping of filenames to Google Drive links

### 2. Process Species

- Create database records for each unique species
- Categorize birds based on names (arboreal, water, raptor, ground, or wetland birds)
- Track any missing scientific names

### 3. Process Illustrations

- Find image links from the species CSV or Google Drive inventory
- Convert Google Drive links to direct URLs
- Create Illustration records with image details
- Track species without images

### 4. Process Local Names

- Extract Mizo names from the species CSV
- Create Name records for each language-name pair

### 5. Process Frequency Data

- Create Frequency records for each species in each region
- Validate and transform frequency rankings and observation counts

## Data Validation

The `backend/validate_data.py` script performs various checks to ensure data integrity:

- Unique species names
- Valid image links
- Scientific name format
- Matching frequency data

## Error Handling

The ingestion process includes several error handling mechanisms:

- Null value handling: All inputs are validated and sanitized to prevent database errors
- Missing data warnings: Displays warnings for species missing scientific names or images
- Default values: Provides default values when essential data is missing
- Type conversion: Ensures all data is converted to the correct type before database insertion

## Running the Ingestion

To run the ingestion process:

```bash
# With Flask app context
python backend/run_complete_ingestion.py

# Or via make command
make ingest-data
```

## Common Issues and Solutions

### Null Value Errors

- **Symptom**: Database integrity errors related to NULL values
- **Solution**: The script has been updated to handle null values by converting them to appropriate defaults

### Missing Images

- **Symptom**: Many species showing "No image found" warnings
- **Solution**: Ensure the Google Drive inventory is up-to-date and image filenames match species names

### Duplicate Species

- **Symptom**: Warnings about duplicate species entries
- **Solution**: Review the species CSV for duplicated English names, possibly with different case or whitespace

### Invalid Frequency Data

- **Symptom**: Frequency rank conversion errors
- **Solution**: Ensure frequency ranks are integers; the script will default to 9999 for invalid values
