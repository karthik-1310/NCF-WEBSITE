import os
from app import app, db, Species, Frequency, Illustrations

def test_database():
    with app.app_context():
        # Check if tables exist and have data
        species_count = Species.query.count()
        frequency_count = Frequency.query.count()
        illustrations_count = Illustrations.query.count()
        
        print(f"Species count: {species_count}")
        print(f"Frequency count: {frequency_count}")
        print(f"Illustrations count: {illustrations_count}")
        
        if species_count > 0:
            sample_species = Species.query.limit(5).all()
            print("\nSample species:")
            for species in sample_species:
                print(f"- {species.english_name} ({species.scientific_name})")
        
        # Check if we have frequency data for Mizoram
        mizoram_freq = Frequency.query.filter_by(state='Mizoram').limit(5).all()
        print(f"\nMizoram frequency records: {len(mizoram_freq)}")
        for freq in mizoram_freq:
            print(f"- {freq.english_name} in {freq.district} (Rank: {freq.frequency_rank})")

if __name__ == "__main__":
    test_database()
