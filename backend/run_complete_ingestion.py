import os

# Set environment variables
os.environ['DATABASE_URL'] = 'sqlite:///pocketguide.db'

# Now import app after setting environment variables
from ingest_data_complete import DataIngestion
from app import app, db

def reset_database():
    """Optional: Reset database before ingestion"""
    response = input("Do you want to reset the database before ingestion? (y/n): ")
    if response.lower() == 'y':
        with app.app_context():
            db.drop_all()
            db.create_all()
            print("Database reset completed.")

if __name__ == "__main__":
    # File paths
    DATA_DIR = os.path.join("backend", "data", "real")
    species_csv = os.path.join(DATA_DIR, "species.csv")
    frequency_csv = os.path.join(DATA_DIR, "frequency_birds_f.csv")
    google_drive_csv = os.path.join(DATA_DIR, "google_drive_inventory.csv")

    # Check if files exist
    files_exist = True
    for file_path, file_name in [(species_csv, "species.csv"),
                                  (frequency_csv, "frequency_birds.csv"),
                                  (google_drive_csv, "google_drive_inventory.csv")]:
        if not os.path.exists(file_path):
            print(f"Warning: {file_name} not found at {file_path}")
            # Do not exit, google_drive_inventory is optional
            if file_name != "google_drive_inventory.csv":
                files_exist = False

    if not files_exist:
        print("\nPlease ensure all required CSV files are in the 'data' directory.")
        exit(1)

    # Optional: Reset database
    reset_database()

    # Run ingestion
    with app.app_context():
        print("\nStarting comprehensive data ingestion...")
        ingestion = DataIngestion()
        ingestion.ingest_all_data(species_csv, frequency_csv, google_drive_csv)
