import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db, Frequency

def check_frequency_data():
    """Check the actual frequency data structure"""
    
    with app.app_context():
        print("=" * 60)
        print("🔍 CHECKING FREQUENCY DATA STRUCTURE")
        print("=" * 60)
        
        # Get sample frequency records for Mizoram
        mizoram_records = Frequency.query.filter_by(state='Mizoram').limit(5).all()
        
        print(f"📊 Found {len(mizoram_records)} sample records for Mizoram:")
        for i, record in enumerate(mizoram_records, 1):
            print(f"{i}. Species: {record.english_name}")
            print(f"   State: '{record.state}'")
            print(f"   District: '{record.district}'")
            print(f"   Rank: {record.frequency_rank}")
            print()
        
        # Check all unique districts for Mizoram
        districts = db.session.query(Frequency.district).filter_by(state='Mizoram').distinct().all()
        print(f"🏘️ All districts for Mizoram:")
        for district in districts:
            count = Frequency.query.filter_by(state='Mizoram', district=district[0]).count()
            print(f"   • '{district[0]}': {count} records")

if __name__ == "__main__":
    check_frequency_data()
