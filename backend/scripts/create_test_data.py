from app import app, db, Species, Illustrations, Names, Frequency

def create_test_data():
    """Create minimal test data for development"""

    test_birds = [
        {
            'english_name': 'Red-vented Bulbul',
            'scientific_name': 'Pycnonotus cafer',
            'type': 'Arboreal Birds',
            'taxa': 'Birds',
            'mizo_name': 'Chu thuruai',
            'image_link': 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Bird1',
            'frequency_rank': 1,
            'size': '20-25 cm'
        },
        {
            'english_name': 'Oriental Magpie-Robin',
            'scientific_name': 'Copsychus saularis',
            'type': 'Arboreal Birds',
            'taxa': 'Birds',
            'mizo_name': 'Thlangva',
            'image_link': 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Bird2',
            'frequency_rank': 2,
            'size': '18-20 cm'
        },
        {
            'english_name': 'Black Drongo',
            'scientific_name': 'Dicrurus macrocercus',
            'type': 'Arboreal Birds',
            'taxa': 'Birds',
            'mizo_name': 'Vakul',
            'image_link': 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Bird3',
            'frequency_rank': 3,
            'size': '28-31 cm'
        },
        {
            'english_name': 'White-throated Kingfisher',
            'scientific_name': 'Halcyon smyrnensis',
            'type': 'Wetland Birds',
            'taxa': 'Birds',
            'mizo_name': 'Kawlhawk',
            'image_link': 'https://via.placeholder.com/150/FFFF00/000000?text=Bird4',
            'frequency_rank': 4,
            'size': '27-28 cm'
        },
        {
            'english_name': 'Common Myna',
            'scientific_name': 'Acridotheres tristis',
            'type': 'Ground Birds',
            'taxa': 'Birds',
            'mizo_name': 'Vaiva',
            'image_link': 'https://via.placeholder.com/150/00FFFF/FFFFFF?text=Bird5',
            'frequency_rank': 5,
            'size': '23-25 cm'
        }
    ]

    with app.app_context():
        # Clear existing data
        db.session.query(Frequency).delete()
        db.session.query(Names).delete()
        db.session.query(Illustrations).delete()
        db.session.query(Species).delete()
        db.session.commit()
        print("Cleared existing data.")

        # Add test data
        for bird in test_birds:
            # Create species record
            species = Species(
                english_name=bird['english_name'],
                scientific_name=bird['scientific_name'],
                type=bird['type'],
                taxa=bird['taxa'],
                size=bird['size']
            )
            db.session.add(species)

            # Create illustration record
            illustration = Illustrations(
                image_name=f"{bird['english_name']}.png",
                image_link=bird['image_link'],
                species_english_name=bird['english_name'],
                is_default=True
            )
            db.session.add(illustration)

            # Create name record
            name = Names(
                species_english_name=bird['english_name'],
                language='Mizo',
                name=bird['mizo_name']
            )
            db.session.add(name)

            # Create frequency records for multiple regions
            # Statewide
            frequency = Frequency(
                english_name=bird['english_name'],
                state='Mizoram',
                district='Statewide',
                frequency_rank=bird['frequency_rank'],
                observation_count=500 + (5 - bird['frequency_rank']) * 100,
                seasonality='Year-round'
            )
            db.session.add(frequency)

            # Aizawl district
            frequency = Frequency(
                english_name=bird['english_name'],
                state='Mizoram',
                district='Aizawl',
                frequency_rank=bird['frequency_rank'],
                observation_count=200 + (5 - bird['frequency_rank']) * 40,
                seasonality='Year-round'
            )
            db.session.add(frequency)

        # Commit all changes
        db.session.commit()
        print(f"✅ Added {len(test_birds)} test birds to the database")

if __name__ == "__main__":
    create_test_data()
