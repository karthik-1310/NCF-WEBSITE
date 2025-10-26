#!/usr/bin/env python3
"""
Simple script to check database contents
"""
import sqlite3
import os

def check_sqlite_database():
    """Check SQLite database contents"""
    # Check multiple possible locations for the database
    possible_paths = [
        'instance/pocketguide.db',  # Check backend/instance first (most likely)
        'pocketguide.db',
        '../instance/pocketguide.db'
    ]
    
    db_path = None
    for path in possible_paths:
        if os.path.exists(path) and os.path.getsize(path) > 0:  # Check file exists and has content
            db_path = path
            break
    
    if not db_path:
        print("❌ Database file not found or empty!")
        print("💡 Checked locations:")
        for path in possible_paths:
            full_path = os.path.abspath(path)
            exists = "✅" if os.path.exists(path) else "❌"
            size = f"({os.path.getsize(path)} bytes)" if os.path.exists(path) else "(not found)"
            print(f"   {exists} {full_path} {size}")
        print("💡 You may need to initialize the database first.")
        return
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("=== DATABASE CONTENTS ===")
        print(f"📁 Database: {db_path}")
        
        # Get all tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        
        if not tables:
            print("❌ No tables found in database!")
            conn.close()
            return
        
        print(f"\n📊 Tables Found: {len(tables)}")
        
        # Check each table
        for table in tables:
            table_name = table[0]
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            count = cursor.fetchone()[0]
            print(f"   • {table_name}: {count} records")
        
        # Show sample species data if exists
        try:
            cursor.execute("SELECT english_name, scientific_name, type FROM species LIMIT 5")
            species = cursor.fetchall()
            if species:
                print(f"\n🦅 Sample Species:")
                for i, (english, scientific, bird_type) in enumerate(species, 1):
                    scientific_display = scientific if scientific != "Unknown" else "Scientific name not available"
                    print(f"   {i}. {english} ({scientific_display}) - {bird_type}")
        except Exception as e:
            print(f"Error reading species: {e}")
        
        # Show all unique bird types
        try:
            cursor.execute("SELECT type, COUNT(*) FROM species GROUP BY type ORDER BY COUNT(*) DESC")
            types = cursor.fetchall()
            if types:
                print(f"\n🦆 Bird Types & Counts:")
                for bird_type, count in types:
                    print(f"   • {bird_type}: {count} species")
        except Exception as e:
            print(f"Error reading bird types: {e}")
        
        # Show sample frequency data if exists
        try:
            cursor.execute("SELECT DISTINCT state, district FROM frequency LIMIT 10")
            locations = cursor.fetchall()
            if locations:
                print(f"\n🗺️  Sample Locations:")
                unique_locations = set()
                for state, district in locations:
                    location = f"{state} - {district}"
                    if location not in unique_locations:
                        unique_locations.add(location)
                        print(f"   • {location}")
                        if len(unique_locations) >= 5:
                            break
        except Exception as e:
            print(f"Error reading locations: {e}")
        
        # Show frequency statistics
        try:
            cursor.execute("""
                SELECT 
                    AVG(CAST(frequency AS REAL)) as avg_freq,
                    MIN(CAST(frequency AS REAL)) as min_freq, 
                    MAX(CAST(frequency AS REAL)) as max_freq,
                    COUNT(*) as total_records
                FROM frequency 
                WHERE frequency IS NOT NULL AND frequency != ''
            """)
            freq_stats = cursor.fetchone()
            if freq_stats and freq_stats[0]:
                avg_freq, min_freq, max_freq, total = freq_stats
                print(f"\n📊 Frequency Statistics:")
                print(f"   • Average frequency: {avg_freq:.2f}")
                print(f"   • Range: {min_freq} - {max_freq}")
                print(f"   • Total frequency records: {total}")
        except Exception as e:
            print(f"Error reading frequency stats: {e}")
        
        # Show sample illustrations
        try:
            cursor.execute("SELECT image_name, image_url FROM illustrations LIMIT 5")
            illustrations = cursor.fetchall()
            if illustrations:
                print(f"\n🖼️  Sample Illustrations:")
                for i, (name, url) in enumerate(illustrations, 1):
                    url_display = url[:50] + "..." if len(url) > 50 else url
                    print(f"   {i}. {name}")
                    print(f"      URL: {url_display}")
        except Exception as e:
            print(f"Error reading illustrations: {e}")
        
        # Check data completeness
        try:
            cursor.execute("""
                SELECT 
                    COUNT(DISTINCT s.english_name) as species_count,
                    COUNT(DISTINCT i.image_name) as image_count,
                    COUNT(DISTINCT f.english_name) as freq_species_count
                FROM species s
                LEFT JOIN illustrations i ON s.english_name = i.image_name
                LEFT JOIN frequency f ON s.english_name = f.english_name
            """)
            completeness = cursor.fetchone()
            if completeness:
                species_count, image_count, freq_species_count = completeness
                print(f"\n📈 Data Completeness:")
                print(f"   • Species with images: {image_count}/{species_count} ({(image_count/species_count)*100:.1f}%)")
                print(f"   • Species with frequency data: {freq_species_count}/{species_count} ({(freq_species_count/species_count)*100:.1f}%)")
        except Exception as e:
            print(f"Error checking completeness: {e}")
        
        conn.close()
        print("\n✅ Database check completed!")
        
    except Exception as e:
        print(f"❌ Error checking database: {e}")

if __name__ == "__main__":
    check_sqlite_database()