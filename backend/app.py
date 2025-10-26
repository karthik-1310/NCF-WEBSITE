import os
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('backend.log')
    ]
)
logger = logging.getLogger(__name__)

# Create Flask app
app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'sqlite:///pocketguide.db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

# Initialize SQLAlchemy
db = SQLAlchemy(app)

logger.info(f"App initialized with DEBUG={app.config['DEBUG']}")

# Define models
class Species(db.Model):
    __tablename__ = 'species'
    english_name = db.Column(db.String(255), primary_key=True)
    scientific_name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    taxa = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(50))

class Illustrations(db.Model):
    __tablename__ = 'illustrations'
    id = db.Column(db.Integer, primary_key=True)
    image_name = db.Column(db.String(255), nullable=False)
    image_link = db.Column(db.String(512), nullable=False)
    species_english_name = db.Column(db.String(255), db.ForeignKey('species.english_name'))
    sex = db.Column(db.String(10))
    breeding_status = db.Column(db.String(20))
    subspecies = db.Column(db.String(100))
    is_default = db.Column(db.Boolean, nullable=False, default=False)

class Names(db.Model):
    __tablename__ = 'names'
    id = db.Column(db.Integer, primary_key=True)
    species_english_name = db.Column(db.String(255), db.ForeignKey('species.english_name'))
    language = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(255), nullable=False)

class Frequency(db.Model):
    __tablename__ = 'frequency'
    id = db.Column(db.Integer, primary_key=True)
    english_name = db.Column(db.String(255), db.ForeignKey('species.english_name'))
    state = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100))
    frequency_rank = db.Column(db.Integer, nullable=False)
    observation_count = db.Column(db.Integer)
    seasonality = db.Column(db.String(50))

@app.route('/api/birds/grouped')
def get_grouped_birds():
    """
    Get birds grouped by type for a specific state and optionally district.
    
    Query Parameters:
    - state (required): The state name (e.g., 'Mizoram')
    - district (optional): The district name (e.g., 'Aizawl') or 'Statewide'
    
    Returns:
    - 200 OK: JSON object with birds grouped by type
    - 400 Bad Request: If state parameter is missing
    - 404 Not Found: If no birds found for the selected region
    - 500 Internal Server Error: For other errors
    """
    try:
        logger.info(f"API Request: /api/birds/grouped with params: {request.args}")
        state = request.args.get('state')
        district = request.args.get('district')

        if not state:
            logger.warning("Missing 'state' parameter in request")
            return jsonify({'error': 'State parameter is required'}), 400

        # Build the query with explicit joins
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
        )

        # Apply district filter if specified
        if district and district != 'Statewide':
            query = query.filter(Frequency.district == district)
            logger.info(f"Filtering by district: {district}")
        else:
            # For statewide data, filter by district containing 'Statewide'
            query = query.filter(Frequency.district.like('%Statewide%'))
            logger.info("Using statewide data (districts containing 'Statewide')")

        # Order by frequency rank
        query = query.order_by(Frequency.frequency_rank)

        # Execute query
        results = query.all()
        logger.info(f"Query returned {len(results)} results")

        if not results:
            logger.warning(f"No birds found for state={state}, district={district}")
            return jsonify({'message': 'No birds found for the selected region'}), 404

        # Process results
        grouped_data = {}

        for result in results:
            # Get all names for this species
            names_query = Names.query.filter_by(species_english_name=result.english_name).all()
            names_dict = {'English': result.english_name}
            for name in names_query:
                names_dict[name.language] = name.name

            # Build bird data object
            bird_data = {
                'english_name': result.english_name,
                'scientific_name': result.scientific_name,
                'type': result.type,
                'taxa': result.taxa,
                'size': result.size,
                'frequency_rank': result.frequency_rank,
                'observation_count': result.observation_count,
                'seasonality': result.seasonality,
                'image_link': result.image_link,
                'image_name': result.image_name,
                'sex': result.sex,
                'breeding_status': result.breeding_status,
                'subspecies': result.subspecies,
                'names': names_dict
            }

            # Group by type
            bird_type = result.type or 'Other Birds'
            if bird_type not in grouped_data:
                grouped_data[bird_type] = []
            grouped_data[bird_type].append(bird_data)

        logger.info(f"Returning data with {len(grouped_data)} bird types")
        return jsonify(grouped_data)

    except Exception as e:
        logger.error(f"Error in get_grouped_birds: {str(e)}", exc_info=True)
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500

# Admin endpoints
@app.route('/api/admin/species')
def get_all_species():
    """
    Get all species in the database.
    
    Returns:
    - 200 OK: JSON array of all species
    - 500 Internal Server Error: For errors
    """
    try:
        logger.info("API Request: /api/admin/species")
        species = Species.query.all()
        
        # Create response with additional information
        result = []
        for s in species:
            # Get illustrations for this species
            illustrations = Illustrations.query.filter_by(species_english_name=s.english_name).all()
            illustration_data = [{'id': i.id, 'image_name': i.image_name, 'image_link': i.image_link, 
                                'is_default': i.is_default} for i in illustrations]
            
            # Get names for this species
            names = Names.query.filter_by(species_english_name=s.english_name).all()
            names_data = [{'language': n.language, 'name': n.name} for n in names]
            
            # Build complete species record
            species_data = {
                'english_name': s.english_name,
                'scientific_name': s.scientific_name,
                'type': s.type,
                'taxa': s.taxa,
                'size': s.size,
                'illustrations': illustration_data,
                'names': names_data
            }
            result.append(species_data)
            
        logger.info(f"Returning data for {len(result)} species")
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error in get_all_species: {str(e)}", exc_info=True)
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500

@app.route('/api/admin/species/<string:english_name>')
def get_species_detail(english_name):
    """
    Get detailed information for a specific species.
    
    Parameters:
    - english_name: The English name of the species
    
    Returns:
    - 200 OK: JSON object with species details
    - 404 Not Found: If species not found
    - 500 Internal Server Error: For errors
    """
    try:
        logger.info(f"API Request: /api/admin/species/{english_name}")
        species = Species.query.filter_by(english_name=english_name).first()
        
        if not species:
            logger.warning(f"Species not found: {english_name}")
            return jsonify({'error': 'Species not found'}), 404
        
        # Get illustrations
        illustrations = Illustrations.query.filter_by(species_english_name=english_name).all()
        illustration_data = []
        for i in illustrations:
            illustration_data.append({
                'id': i.id,
                'image_name': i.image_name,
                'image_link': i.image_link,
                'sex': i.sex,
                'breeding_status': i.breeding_status,
                'subspecies': i.subspecies,
                'is_default': i.is_default
            })
        
        # Get names
        names = Names.query.filter_by(species_english_name=english_name).all()
        names_data = [{'language': n.language, 'name': n.name} for n in names]
        
        # Get frequency data
        frequencies = Frequency.query.filter_by(english_name=english_name).all()
        frequency_data = []
        for f in frequencies:
            frequency_data.append({
                'state': f.state,
                'district': f.district,
                'frequency_rank': f.frequency_rank,
                'observation_count': f.observation_count,
                'seasonality': f.seasonality
            })
        
        # Create detailed response
        result = {
            'english_name': species.english_name,
            'scientific_name': species.scientific_name,
            'type': species.type,
            'taxa': species.taxa,
            'size': species.size,
            'illustrations': illustration_data,
            'names': names_data,
            'frequency': frequency_data
        }
        
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error in get_species_detail: {str(e)}", exc_info=True)
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500

@app.route('/api/admin/statistics')
def get_statistics():
    """
    Get statistics about the database.
    
    Returns:
    - 200 OK: JSON object with statistics
    - 500 Internal Server Error: For errors
    """
    try:
        logger.info("API Request: /api/admin/statistics")
        
        # Count records
        species_count = Species.query.count()
        illustrations_count = Illustrations.query.count()
        names_count = Names.query.count()
        frequency_count = Frequency.query.count()
        
        # Count species by type
        species_by_type = {}
        for s in db.session.query(Species.type, db.func.count(Species.english_name)).group_by(Species.type).all():
            species_by_type[s[0]] = s[1]
        
        # Count species with images
        species_with_images = db.session.query(db.func.count(db.distinct(Illustrations.species_english_name))).scalar()
        
        # Count species with local names
        species_with_names = db.session.query(db.func.count(db.distinct(Names.species_english_name))).scalar()
        
        # Build statistics response
        stats = {
            'counts': {
                'species': species_count,
                'illustrations': illustrations_count,
                'names': names_count,
                'frequency': frequency_count
            },
            'distribution': {
                'species_by_type': species_by_type
            },
            'coverage': {
                'illustrations': {
                    'count': species_with_images,
                    'percentage': round((species_with_images / species_count) * 100, 1) if species_count else 0
                },
                'names': {
                    'count': species_with_names,
                    'percentage': round((species_with_names / species_count) * 100, 1) if species_count else 0
                }
            }
        }
        
        return jsonify(stats)
    except Exception as e:
        logger.error(f"Error in get_statistics: {str(e)}", exc_info=True)
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500

@app.route('/api/admin/upload-csv', methods=['POST'])
def upload_csv():
    """
    Upload CSV files for ingestion.
    
    Expected form data:
    - type: The type of CSV file ('species', 'frequency', 'images')
    - file: The CSV file to upload
    
    Returns:
    - 200 OK: JSON object with upload results
    - 400 Bad Request: If parameters are missing or invalid
    - 500 Internal Server Error: For errors
    """
    try:
        logger.info("API Request: /api/admin/upload-csv")
        
        # For now, return a not implemented response
        return jsonify({
            'error': 'Not implemented',
            'message': 'CSV upload functionality is not yet implemented'
        }), 501
    except Exception as e:
        logger.error(f"Error in upload_csv: {str(e)}", exc_info=True)
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500

@app.route('/api/birds/locations')
def get_locations():
    """
    Get a list of available states and districts.
    
    Returns:
    - 200 OK: JSON object with states and districts
    - 500 Internal Server Error: For errors
    """
    try:
        logger.info("API Request: /api/birds/locations")
        
        # Query all distinct states
        states = [row[0] for row in db.session.query(Frequency.state).distinct().all()]
        
        # Query districts for each state
        districts = {}
        for state in states:
            state_districts = [row[0] for row in db.session.query(Frequency.district)
                                  .filter(Frequency.state == state)
                                  .distinct().all()]
            districts[state] = state_districts
        
        return jsonify({
            'states': states,
            'districts': districts
        })
    except Exception as e:
        logger.error(f"Error in get_locations: {str(e)}", exc_info=True)
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500

@app.route('/api/admin/initialize-db', methods=['POST'])
def initialize_database():
    """Initialize database with sample data for testing"""
    try:
        logger.info("Initializing database with sample data")
        
        # Create all tables
        db.create_all()
        
        # Check if data already exists
        if Species.query.count() > 0:
            return jsonify({'message': 'Database already has data', 'species_count': Species.query.count()})
        
        # Add sample species data
        sample_species = [
            Species(english_name="Asian Paradise Flycatcher", scientific_name="Terpsiphone paradisi", type="bird", taxa="birds", size="medium"),
            Species(english_name="White-throated Kingfisher", scientific_name="Halcyon smyrnensis", type="bird", taxa="birds", size="medium"),
            Species(english_name="Red-vented Bulbul", scientific_name="Pycnonotus cafer", type="bird", taxa="birds", size="small"),
            Species(english_name="House Sparrow", scientific_name="Passer domesticus", type="bird", taxa="birds", size="small"),
            Species(english_name="Indian Robin", scientific_name="Copsychus fulicatus", type="bird", taxa="birds", size="small"),
            Species(english_name="Common Myna", scientific_name="Acridotheres tristis", type="bird", taxa="birds", size="medium"),
            Species(english_name="Rose-ringed Parakeet", scientific_name="Psittacula krameri", type="bird", taxa="birds", size="medium"),
            Species(english_name="Black Drongo", scientific_name="Dicrurus macrocercus", type="bird", taxa="birds", size="small"),
            Species(english_name="Pied Kingfisher", scientific_name="Ceryle rudis", type="bird", taxa="birds", size="medium"),
            Species(english_name="Brown-headed Barbet", scientific_name="Psilopogon zeylanicus", type="bird", taxa="birds", size="small"),
        ]
        
        # Add sample frequency data for Mizoram
        sample_frequency = [
            Frequency(english_name="House Sparrow", state="Mizoram", district="Aizawl", frequency_rank=1, observation_count=150, seasonality="Year-round"),
            Frequency(english_name="Red-vented Bulbul", state="Mizoram", district="Aizawl", frequency_rank=3, observation_count=120, seasonality="Year-round"),
            Frequency(english_name="Black Drongo", state="Mizoram", district="Aizawl", frequency_rank=7, observation_count=85, seasonality="Year-round"),
            Frequency(english_name="White-throated Kingfisher", state="Mizoram", district="Aizawl", frequency_rank=8, observation_count=78, seasonality="Mar-Oct"),
            Frequency(english_name="Common Myna", state="Mizoram", district="Aizawl", frequency_rank=5, observation_count=95, seasonality="Year-round"),
            Frequency(english_name="Rose-ringed Parakeet", state="Mizoram", district="Aizawl", frequency_rank=10, observation_count=65, seasonality="Year-round"),
            Frequency(english_name="Indian Robin", state="Mizoram", district="Aizawl", frequency_rank=12, observation_count=55, seasonality="Nov-Feb"),
            Frequency(english_name="Asian Paradise Flycatcher", state="Mizoram", district="Aizawl", frequency_rank=15, observation_count=42, seasonality="Apr-Sep"),
            Frequency(english_name="Pied Kingfisher", state="Mizoram", district="Aizawl", frequency_rank=18, observation_count=35, seasonality="Nov-Mar"),
            Frequency(english_name="Brown-headed Barbet", state="Mizoram", district="Aizawl", frequency_rank=22, observation_count=28, seasonality="Year-round"),
            
            # Add data for Lunglei district
            Frequency(english_name="House Sparrow", state="Mizoram", district="Lunglei", frequency_rank=2, observation_count=135, seasonality="Year-round"),
            Frequency(english_name="Red-vented Bulbul", state="Mizoram", district="Lunglei", frequency_rank=4, observation_count=110, seasonality="Year-round"),
            Frequency(english_name="Common Myna", state="Mizoram", district="Lunglei", frequency_rank=6, observation_count=88, seasonality="Year-round"),
            Frequency(english_name="Black Drongo", state="Mizoram", district="Lunglei", frequency_rank=9, observation_count=72, seasonality="Year-round"),
            Frequency(english_name="White-throated Kingfisher", state="Mizoram", district="Lunglei", frequency_rank=11, observation_count=62, seasonality="Mar-Oct"),
        ]
        
        # Add sample illustrations
        sample_illustrations = [
            Illustrations(species_english_name="House Sparrow", image_link="https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop", image_name="house_sparrow.jpg", is_default=True, sex="unknown", breeding_status="unknown"),
            Illustrations(species_english_name="Red-vented Bulbul", image_link="https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop", image_name="red_vented_bulbul.jpg", is_default=True, sex="unknown", breeding_status="unknown"),
            Illustrations(species_english_name="Black Drongo", image_link="https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop", image_name="black_drongo.jpg", is_default=True, sex="unknown", breeding_status="unknown"),
            Illustrations(species_english_name="White-throated Kingfisher", image_link="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", image_name="white_throated_kingfisher.jpg", is_default=True, sex="unknown", breeding_status="unknown"),
            Illustrations(species_english_name="Common Myna", image_link="https://images.unsplash.com/photo-1565002330297-58754c040ddc?w=400&h=300&fit=crop", image_name="common_myna.jpg", is_default=True, sex="unknown", breeding_status="unknown"),
        ]
        
        # Add to database
        for species in sample_species:
            db.session.add(species)
        
        for freq in sample_frequency:
            db.session.add(freq)
            
        for illus in sample_illustrations:
            db.session.add(illus)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Database initialized successfully',
            'species_count': len(sample_species),
            'frequency_records': len(sample_frequency),
            'illustrations_count': len(sample_illustrations)
        })
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error initializing database: {str(e)}", exc_info=True)
        return jsonify({'error': 'Failed to initialize database', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
