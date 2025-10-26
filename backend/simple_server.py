"""
Standalone Flask server for the NCF Pocket Guide Creator
This ensures the backend API serves real bird data to the frontend
"""

import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import db, Species, Illustrations, Names, Frequency

# Create a simple Flask app
simple_app = Flask(__name__)
CORS(simple_app)

# Configure SQLite database
simple_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pocketguide.db'
simple_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database with the app
db.init_app(simple_app)

@simple_app.route('/api/birds/locations')
def get_locations():
    """Get available states and districts"""
    try:
        # Get distinct states
        states = [row[0] for row in db.session.query(Frequency.state).distinct().all()]
        
        # Get districts for each state
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
        return jsonify({'error': str(e)}), 500

@simple_app.route('/api/birds/grouped')
def get_grouped_birds():
    """Get birds grouped by type for a specific state"""
    try:
        state = request.args.get('state')
        if not state:
            return jsonify({'error': 'State parameter is required'}), 400

        # Build query with fixed district filtering
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

        results = query.all()
        
        if not results:
            return jsonify({'message': 'No birds found for the selected region'}), 404

        # Process results and group by type
        grouped_data = {}
        
        for result in results:
            # Get local names
            names_query = Names.query.filter_by(species_english_name=result.english_name).all()
            names_dict = {'English': result.english_name}
            for name in names_query:
                names_dict[name.language] = name.name

            # Build bird data
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

        return jsonify(grouped_data)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@simple_app.route('/api/test')
def test_endpoint():
    """Simple test endpoint"""
    return jsonify({'message': 'API is working!', 'birds_count': Species.query.count()})

if __name__ == '__main__':
    print("🚀 Starting NCF Pocket Guide API Server...")
    print("📊 Database: SQLite with real bird data")
    print("🌐 URL: http://localhost:5000")
    print("🔗 Frontend should connect successfully!")
    
    simple_app.run(debug=True, host='0.0.0.0', port=5000, use_reloader=False)
