import os
import sys
from pathlib import Path

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db, Species, Illustrations, Names, Frequency

def check_database_and_fix():
    """Check which database is actually being used and show data"""
    
    with app.app_context():
        print("="*60)
        print("🔍 DATABASE INSPECTION")
        print("="*60)
        
        # Check database location
        db_url = app.config['SQLALCHEMY_DATABASE_URI']
        print(f"📊 Database URL: {db_url}")
        
        if 'sqlite' in db_url:
            if '///' in db_url:
                db_path = db_url.split('///')[-1]
                print(f"📁 SQLite file: {db_path}")
                if os.path.exists(db_path):
                    size = os.path.getsize(db_path)
                    print(f"📏 File size: {size} bytes")
                else:
                    print("❌ SQLite file does not exist!")
                    
        print("\n" + "="*60)
        print("📋 TABLE STATUS")
        print("="*60)
        
        try:
            # Try to query each table
            tables = [
                ('species', Species),
                ('illustrations', Illustrations), 
                ('names', Names),
                ('frequency', Frequency)
            ]
            
            for table_name, model in tables:
                try:
                    count = model.query.count()
                    print(f"✅ {table_name}: {count} records")
                    
                    if count > 0:
                        # Show sample data
                        sample = model.query.first()
                        print(f"   📝 Sample: {sample}")
                        
                except Exception as e:
                    print(f"❌ {table_name}: Error - {e}")
                    
        except Exception as e:
            print(f"❌ Could not access tables: {e}")
            print("💡 The tables might not exist yet. Try creating them first.")
            
        print("\n" + "="*60)
        print("🌍 FREQUENCY DATA ANALYSIS")
        print("="*60)
        
        try:
            # Check frequency data structure
            freq_count = Frequency.query.count()
            if freq_count > 0:
                # Get unique states
                states = db.session.query(Frequency.state).distinct().all()
                print(f"🗺️  Available States: {[s[0] for s in states]}")
                
                # Get sample frequency data
                sample_freq = Frequency.query.limit(3).all()
                for i, freq in enumerate(sample_freq, 1):
                    print(f"   {i}. {freq.english_name} in {freq.state}, {freq.district} (rank: {freq.frequency_rank})")
                    
            else:
                print("⚠️  No frequency data found")
                
        except Exception as e:
            print(f"❌ Error checking frequency data: {e}")

if __name__ == "__main__":
    check_database_and_fix()
