from app import app, db, Species, Frequency
from datetime import datetime

def create_test_frequency_data():
    """Create frequency data for existing species without frequency data"""
    with app.app_context():
        print("=== Creating Test Frequency Data ===\n")

        # Find species without frequency data
        species_without_frequency = db.session.query(Species).outerjoin(
            Frequency,
            Species.english_name == Frequency.english_name
        ).filter(Frequency.id == None).all()
        
        if not species_without_frequency:
            print("✓ All species already have frequency data")
            return

        print(f"Found {len(species_without_frequency)} species without frequency data")

        # Create basic frequency data for these species
        count = 0
        for i, species in enumerate(species_without_frequency):
            # Create frequency for Mizoram statewide
            frequency = Frequency(
                english_name=species.english_name,
                state='Mizoram',
                district='Statewide',
                frequency_rank=i + 1000,  # Use high rank to avoid conflicts
                observation_count=10,
                seasonality='Year-round'
            )
            db.session.add(frequency)
            count += 1

        # Commit changes
        db.session.commit()
        print(f"✅ Added frequency data for {count} species")

if __name__ == "__main__":
    create_test_frequency_data()
