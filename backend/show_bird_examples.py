"""
Show detailed examples of actual bird data in the database
"""
import sqlite3
import os

db_path = os.path.join('instance', 'pocketguide.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print("="*80)
print("DETAILED BIRD DATA EXAMPLES")
print("="*80)

# Get 10 complete bird records with all related data
cursor.execute("""
    SELECT 
        s.english_name,
        s.scientific_name,
        s.type,
        s.taxa,
        s.size
    FROM species s
    LIMIT 10
""")

birds = cursor.fetchall()

for i, bird in enumerate(birds, 1):
    english_name, scientific_name, bird_type, taxa, size = bird
    
    print(f"\n{'='*80}")
    print(f"🐦 BIRD #{i}: {english_name}")
    print('='*80)
    print(f"   Scientific Name: {scientific_name}")
    print(f"   Type: {bird_type}")
    print(f"   Taxa: {taxa}")
    print(f"   Size: {size if size else 'Not specified'}")
    
    # Get local names
    cursor.execute("SELECT language, name FROM names WHERE species_english_name=?", (english_name,))
    local_names = cursor.fetchall()
    if local_names:
        print(f"\n   🌐 Local Names:")
        for lang, name in local_names:
            print(f"      • {lang}: {name}")
    
    # Get images
    cursor.execute("SELECT image_name, image_link, sex, breeding_status FROM illustrations WHERE species_english_name=?", (english_name,))
    images = cursor.fetchall()
    if images:
        print(f"\n   📸 Images: {len(images)} available")
        for img_name, img_link, sex, breeding in images[:2]:  # Show first 2 images
            print(f"      • {img_name}")
            print(f"        Link: {img_link[:50]}...")
            if sex:
                print(f"        Sex: {sex}")
            if breeding:
                print(f"        Breeding Status: {breeding}")
    
    # Get frequency data
    cursor.execute("SELECT state, district, frequency_rank, observation_count FROM frequency WHERE english_name=?", (english_name,))
    freq_data = cursor.fetchall()
    if freq_data:
        print(f"\n   📊 Frequency Data:")
        for state, district, rank, obs_count in freq_data:
            print(f"      • {state} - {district}")
            print(f"        Frequency Rank: {rank}")
            print(f"        Observations: {obs_count if obs_count else 'N/A'}")

print("\n" + "="*80)
print("✅ Sample data display complete!")
print("="*80)

# Summary statistics
print("\n" + "="*80)
print("QUICK SUMMARY")
print("="*80)
cursor.execute("SELECT COUNT(*) FROM species")
total_species = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM illustrations")
total_images = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM names")
total_names = cursor.fetchone()[0]
cursor.execute("SELECT COUNT(*) FROM frequency")
total_freq = cursor.fetchone()[0]

print(f"\n✅ Database contains:")
print(f"   • {total_species} bird species")
print(f"   • {total_images} bird illustrations")
print(f"   • {total_names} local name translations")
print(f"   • {total_freq} frequency records")

# Top 10 most frequently observed birds
print(f"\n🏆 TOP 10 MOST OBSERVED BIRDS:")
cursor.execute("""
    SELECT f.english_name, f.observation_count, s.type
    FROM frequency f
    JOIN species s ON f.english_name = s.english_name
    ORDER BY f.observation_count DESC
    LIMIT 10
""")
top_birds = cursor.fetchall()
for i, (name, obs_count, bird_type) in enumerate(top_birds, 1):
    print(f"   {i:2d}. {name:30s} - {obs_count:5d} observations ({bird_type})")

conn.close()
