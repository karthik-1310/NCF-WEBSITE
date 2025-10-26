import os
import sys
from sqlalchemy import create_engine, text
import pandas as pd
from dotenv import load_dotenv

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

def check_database():
    """Check database structure and data"""
    
    # Get database URL from environment or use default SQLite
    database_url = os.getenv('DATABASE_URL', 'sqlite:///pocketguide.db')
    
    print(f"🔗 Connecting to database: {database_url}")
    print(f"📁 Database type: {'PostgreSQL' if 'postgresql' in database_url else 'SQLite'}")
    
    try:
        # Create engine
        engine = create_engine(database_url)
        
        print("\n" + "="*50)
        print("📊 DATABASE STRUCTURE CHECK")
        print("="*50)
        
        # Check if tables exist
        with engine.connect() as conn:
            # Get all tables - different query for SQLite vs PostgreSQL
            if 'sqlite' in database_url:
                result = conn.execute(text("""
                    SELECT name FROM sqlite_master 
                    WHERE type='table' AND name NOT LIKE 'sqlite_%'
                    ORDER BY name;
                """))
            else:
                result = conn.execute(text("""
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                    ORDER BY table_name;
                """))
            tables = [row[0] for row in result]
            
            if not tables:
                print("❌ No tables found in the database!")
                print("💡 You may need to run the data ingestion script first.")
                return
            
            print(f"✅ Found {len(tables)} tables:")
            for table in tables:
                print(f"   📋 {table}")
            
            print("\n" + "="*50)
            print("📈 TABLE DETAILS AND DATA COUNTS")
            print("="*50)
            
            # Check each table structure and count
            for table in tables:
                print(f"\n🔍 Table: {table}")
                print("-" * 30)
                
                # Get column information - different for SQLite vs PostgreSQL
                if 'sqlite' in database_url:
                    columns_query = text(f"PRAGMA table_info({table})")
                    result = conn.execute(columns_query)
                    columns = [(row[1], row[2], "YES" if not row[3] else "NO", row[4]) for row in result]
                else:
                    columns_query = text("""
                        SELECT column_name, data_type, is_nullable, column_default
                        FROM information_schema.columns 
                        WHERE table_name = :table_name
                        ORDER BY ordinal_position;
                    """)
                    result = conn.execute(columns_query, {"table_name": table})
                    columns = result.fetchall()
                
                print("📝 Columns:")
                for col in columns:
                    nullable = "NULL" if col[2] == "YES" else "NOT NULL"
                    default = f" DEFAULT {col[3]}" if col[3] else ""
                    print(f"   • {col[0]} ({col[1]}) {nullable}{default}")
                
                # Get row count
                count_result = conn.execute(text(f"SELECT COUNT(*) FROM {table}"))
                count = count_result.scalar()
                print(f"📊 Total rows: {count}")
                
                # Show sample data if exists
                if count > 0:
                    sample_result = conn.execute(text(f"SELECT * FROM {table} LIMIT 3"))
                    sample_data = sample_result.fetchall()
                    column_names = [col[0] for col in columns]
                    
                    print("🔍 Sample data:")
                    for i, row in enumerate(sample_data, 1):
                        print(f"   Row {i}:")
                        for j, value in enumerate(row):
                            # Truncate long values
                            display_value = str(value)
                            if len(display_value) > 50:
                                display_value = display_value[:47] + "..."
                            print(f"     {column_names[j]}: {display_value}")
                else:
                    print("⚠️  No data found in this table")
        
        print("\n" + "="*50)
        print("🌍 REGIONAL DATA CHECK")
        print("="*50)
        
        # Check frequency data for states and districts
        if 'frequency' in tables:
            with engine.connect() as conn:
                # Get unique states
                states_result = conn.execute(text("SELECT DISTINCT state FROM frequency ORDER BY state"))
                states = [row[0] for row in states_result]
                
                print(f"🗺️  Available States ({len(states)}):")
                for state in states:
                    print(f"   • {state}")
                
                # Get districts for each state
                print(f"\n🏘️  Districts by State:")
                for state in states[:3]:  # Show first 3 states to avoid clutter
                    districts_result = conn.execute(text("""
                        SELECT DISTINCT district 
                        FROM frequency 
                        WHERE state = :state AND district IS NOT NULL
                        ORDER BY district
                    """), {"state": state})
                    districts = [row[0] for row in districts_result]
                    print(f"   {state}: {len(districts)} districts")
                    for district in districts[:5]:  # Show first 5 districts
                        print(f"     - {district}")
                    if len(districts) > 5:
                        print(f"     ... and {len(districts) - 5} more")
        
        print("\n" + "="*50)
        print("🦅 BIRD SPECIES CHECK")
        print("="*50)
        
        # Check species data
        if 'species' in tables:
            with engine.connect() as conn:
                # Get species by type
                types_result = conn.execute(text("""
                    SELECT type, COUNT(*) as count 
                    FROM species 
                    GROUP BY type 
                    ORDER BY count DESC
                """))
                
                print("🦅 Species by Type:")
                total_species = 0
                for row in types_result:
                    print(f"   • {row[0]}: {row[1]} species")
                    total_species += row[1]
                
                print(f"\n📊 Total Species: {total_species}")
                
                # Check images
                if 'illustrations' in tables:
                    images_result = conn.execute(text("SELECT COUNT(*) FROM illustrations"))
                    image_count = images_result.scalar()
                    print(f"🖼️  Total Images: {image_count}")
                    print(f"📈 Coverage: {(image_count/total_species)*100:.1f}% of species have images")
        
        print("\n✅ Database check completed successfully!")
        
    except Exception as e:
        print(f"❌ Error connecting to database: {e}")
        print("\n💡 Troubleshooting tips:")
        print("1. Make sure PostgreSQL is running")
        print("2. Check your DATABASE_URL in the .env file")
        print("3. Ensure the database 'pocketguide_db' exists")
        print("4. Verify your PostgreSQL username and password")

if __name__ == "__main__":
    check_database()
