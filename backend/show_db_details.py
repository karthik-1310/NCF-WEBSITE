"""
Display detailed database contents and structure
"""
import sqlite3
import os

# Get database path
db_path = os.path.join('instance', 'pocketguide.db')

if not os.path.exists(db_path):
    print(f"❌ Database not found at: {db_path}")
    exit(1)

print("="*80)
print("NCF POCKET GUIDE CREATOR - DATABASE CONTENTS")
print("="*80)
print(f"📁 Database: {db_path}\n")

# Connect to database
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print(f"📊 Total Tables: {len(tables)}")
print("-"*80)

for table in tables:
    table_name = table[0]
    print(f"\n{'='*80}")
    print(f"📋 TABLE: {table_name.upper()}")
    print('='*80)
    
    # Get table schema
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = cursor.fetchall()
    
    print("\n🔧 COLUMNS:")
    for col in columns:
        col_id, col_name, col_type, not_null, default_val, pk = col
        nullable = "NOT NULL" if not_null else "NULL"
        primary = " [PRIMARY KEY]" if pk else ""
        print(f"   • {col_name:20s} {col_type:15s} {nullable:10s}{primary}")
    
    # Get row count
    cursor.execute(f"SELECT COUNT(*) FROM {table_name};")
    count = cursor.fetchone()[0]
    print(f"\n📊 Total Records: {count}")
    
    # Show sample data (first 5 rows)
    if count > 0:
        cursor.execute(f"SELECT * FROM {table_name} LIMIT 5;")
        rows = cursor.fetchall()
        
        print(f"\n📝 SAMPLE DATA (first 5 records):")
        print("-"*80)
        
        # Print column headers
        col_names = [col[1] for col in columns]
        header = " | ".join([f"{name[:15]:15s}" for name in col_names])
        print(f"   {header}")
        print("   " + "-"*len(header))
        
        # Print rows
        for row in rows:
            row_str = " | ".join([f"{str(val)[:15]:15s}" if val is not None else f"{'NULL':15s}" for val in row])
            print(f"   {row_str}")
    else:
        print("\n⚠️  No data in this table")

# Additional statistics
print("\n" + "="*80)
print("📈 DATABASE STATISTICS")
print("="*80)

# Species by type (not category)
cursor.execute("SELECT type, COUNT(*) FROM species GROUP BY type ORDER BY COUNT(*) DESC;")
categories = cursor.fetchall()
print("\n🐦 Species by Type:")
for cat, count in categories:
    category_name = cat if cat else "Uncategorized"
    print(f"   • {category_name:30s}: {count:3d} species")

# States and districts
cursor.execute("SELECT DISTINCT state FROM frequency ORDER BY state;")
states = cursor.fetchall()
print(f"\n🗺️  States in Database: {len(states)}")
for state in states:
    state_name = state[0] if state[0] else "Unknown"
    cursor.execute("SELECT DISTINCT district FROM frequency WHERE state=?;", (state[0],))
    districts = cursor.fetchall()
    print(f"   • {state_name}")
    for district in districts[:3]:  # Show first 3 districts
        district_name = district[0] if district[0] else "Unknown"
        cursor.execute("SELECT COUNT(*) FROM frequency WHERE state=? AND district=?;", (state[0], district[0]))
        bird_count = cursor.fetchone()[0]
        print(f"      - {district_name}: {bird_count} bird records")

# Images statistics
cursor.execute("SELECT COUNT(*) FROM illustrations WHERE image_link IS NOT NULL AND image_link != '';")
images_with_link = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM illustrations WHERE image_link IS NULL OR image_link = '';")
images_without_link = cursor.fetchone()[0]
print(f"\n📸 Image Statistics:")
print(f"   • Total illustration records: {images_with_link + images_without_link}")
print(f"   • Records with image link: {images_with_link}")
print(f"   • Records without image link: {images_without_link}")

# Local names statistics
cursor.execute("SELECT language, COUNT(*) FROM names GROUP BY language;")
languages = cursor.fetchall()
print(f"\n🌐 Local Names by Language:")
for lang, count in languages:
    language_name = lang if lang else "Unknown"
    print(f"   • {language_name}: {count} names")

# Frequency data statistics
cursor.execute("SELECT state, district, COUNT(*) FROM frequency GROUP BY state, district;")
freq_stats = cursor.fetchall()
print(f"\n📊 Frequency Data Coverage:")
print(f"   • Total location-species combinations: {sum([x[2] for x in freq_stats])}")

conn.close()

print("\n" + "="*80)
print("✅ Database inspection complete!")
print("="*80)
