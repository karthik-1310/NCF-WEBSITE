import os
import sys
from pathlib import Path

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db, Species, Illustrations, Names, Frequency

def debug_api():
    """Debug what our API should actually return"""
    
    with app.app_context():
        print("=" * 60)
        print("🔍 DEBUG: WHAT OUR API SHOULD RETURN")
        print("=" * 60)
        
        state = "Mizoram"
        print(f"📍 Querying for state: {state}")
        
        # Let's manually run the same query as the API
        query = db.session.query(
            Frequency.frequency_rank,
            Frequency.observation_count,
            Frequency.seasonality,
            Species.english_name,
            Species.scientific_name,
            Species.type,
            Species.taxa,
            Species.size,
            Illustrations.image_link,
            Illustrations.image_name,
            Illustrations.sex,
            Illustrations.breeding_status,
            Illustrations.subspecies
        ).join(
            Species, Frequency.english_name == Species.english_name
        ).outerjoin(
            Illustrations,
            (Species.english_name == Illustrations.species_english_name) &
            (Illustrations.is_default == True)
        ).filter(
            Frequency.state == state
        ).filter(
            Frequency.district.like('%Statewide%')
        ).order_by(Frequency.frequency_rank)
        
        results = query.limit(5).all()  # Get first 5 for testing
        
        print(f"📊 Query returned {len(results)} results")
        
        if results:
            print("\n🦅 Sample results:")
            for i, result in enumerate(results, 1):
                print(f"{i}. {result.english_name}")
                print(f"   Scientific: {result.scientific_name}")
                print(f"   Type: {result.type}")
                print(f"   Rank: {result.frequency_rank}")
                print(f"   Image: {result.image_link[:50] if result.image_link else 'None'}...")
                print()
        else:
            print("❌ No results found!")
            
        # Check what states we actually have
        print("🗺️ Available states in frequency table:")
        states = db.session.query(Frequency.state).distinct().all()
        for state_row in states:
            count = Frequency.query.filter_by(state=state_row[0]).count()
            print(f"   • {state_row[0]}: {count} records")

if __name__ == "__main__":
    debug_api()
