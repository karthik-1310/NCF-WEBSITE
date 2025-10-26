from app import app, db, Species, Illustrations, Names, Frequency
from collections import defaultdict
from sqlalchemy import func

def validate_data():
    """Validates data integrity after ingestion"""
    with app.app_context():
        print("=== Data Validation Report ===\n")

        # Check for species without images
        species_without_images = db.session.query(Species).outerjoin(
            Illustrations, 
            Species.english_name == Illustrations.species_english_name
        ).filter(Illustrations.id == None).all()
        
        if species_without_images:
            print(f"⚠️  Species without images: {len(species_without_images)}")
            for species in species_without_images[:5]:  # Show first 5
                print(f"   - {species.english_name}")
            if len(species_without_images) > 5:
                print(f"   - ...and {len(species_without_images) - 5} more")
        else:
            print("✓ All species have images")

        # Check for species without scientific names or with placeholder names
        species_missing_sci_names = db.session.query(Species).filter(
            (Species.scientific_name == None) | 
            (Species.scientific_name == '') | 
            (Species.scientific_name == 'Unknown')
        ).all()
        
        if species_missing_sci_names:
            print(f"\n⚠️  Species without proper scientific names: {len(species_missing_sci_names)}")
            for species in species_missing_sci_names[:5]:
                print(f"   - {species.english_name}")
            if len(species_missing_sci_names) > 5:
                print(f"   - ...and {len(species_missing_sci_names) - 5} more")
        else:
            print("\n✓ All species have scientific names")

        # Check for species without local (Mizo) names
        species_without_local_names = db.session.query(Species).outerjoin(
            Names,
            Species.english_name == Names.species_english_name
        ).filter(Names.id == None).all()
        
        if species_without_local_names:
            print(f"\n⚠️  Species without Mizo names: {len(species_without_local_names)}")
            for species in species_without_local_names[:5]:
                print(f"   - {species.english_name}")
            if len(species_without_local_names) > 5:
                print(f"   - ...and {len(species_without_local_names) - 5} more")
        else:
            print("\n✓ All species have Mizo names")
            
        # Check for species without frequency data
        species_without_frequency = db.session.query(Species).outerjoin(
            Frequency,
            Species.english_name == Frequency.english_name
        ).filter(Frequency.id == None).all()
        
        if species_without_frequency:
            print(f"\n⚠️  Species without frequency data: {len(species_without_frequency)}")
            for species in species_without_frequency[:5]:
                print(f"   - {species.english_name}")
            if len(species_without_frequency) > 5:
                print(f"   - ...and {len(species_without_frequency) - 5} more")
        else:
            print("\n✓ All species have frequency data")

        # Check frequency coverage by region
        frequency_coverage = defaultdict(int)
        for freq in Frequency.query.all():
            frequency_coverage[f"{freq.state}-{freq.district}"] += 1

        print(f"\n📊 Frequency Data Coverage:")
        for region, count in sorted(frequency_coverage.items()):
            print(f"   {region}: {count} birds")

        # Bird categorization statistics
        bird_types = db.session.query(
            Species.type, 
            func.count(Species.english_name)
        ).group_by(Species.type).all()
        
        print(f"\n🦅 Bird Type Distribution:")
        for bird_type, count in sorted(bird_types, key=lambda x: x[1], reverse=True):
            print(f"   {bird_type}: {count} birds")
        
        # Images per species statistics
        multi_image_species = db.session.query(
            Illustrations.species_english_name,
            func.count(Illustrations.id)
        ).group_by(Illustrations.species_english_name).having(
            func.count(Illustrations.id) > 1
        ).all()
        
        if multi_image_species:
            print(f"\n�️  Species with multiple images: {len(multi_image_species)}")
            for species, count in multi_image_species[:5]:
                print(f"   - {species}: {count} images")
            if len(multi_image_species) > 5:
                print(f"   - ...and {len(multi_image_species) - 5} more")

        # Print overall statistics
        total_species = Species.query.count()
        total_illustrations = Illustrations.query.count()
        total_names = Names.query.count()
        total_frequency = Frequency.query.count()
        
        print(f"\n📈 Database Statistics:")
        print(f"   Total Species: {total_species}")
        print(f"   Total Illustrations: {total_illustrations}")
        print(f"   Total Local Names: {total_names}")
        print(f"   Total Frequency Records: {total_frequency}")
        
        # Coverage percentages
        if total_species > 0:
            image_coverage = ((total_species - len(species_without_images)) / total_species) * 100
            name_coverage = ((total_species - len(species_without_local_names)) / total_species) * 100
            freq_coverage = ((total_species - len(species_without_frequency)) / total_species) * 100
            
            print(f"\n📊 Coverage Percentages:")
            print(f"   Images: {image_coverage:.1f}%")
            print(f"   Mizo Names: {name_coverage:.1f}%")
            print(f"   Frequency Data: {freq_coverage:.1f}%")

if __name__ == "__main__":
    validate_data()
