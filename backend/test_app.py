from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/test')
def test():
    return jsonify({'message': 'API is working!'})

@app.route('/api/birds/locations')
def locations():
    return jsonify({
        'states': ['Karnataka', 'Tamil Nadu', 'Kerala', 'Mizoram'],
        'districts': {
            'Karnataka': ['Bangalore', 'Mysore', 'Coorg'],
            'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
            'Kerala': ['Kochi', 'Trivandrum', 'Kozhikode'],
            'Mizoram': ['Aizawl', 'Lunglei', 'Champhai']
        }
    })

@app.route('/api/birds/grouped')
def birds_grouped():
    return jsonify({
        'waterbirds': [
            {
                'id': 1,
                'common_name': 'Little Grebe',
                'scientific_name': 'Tachybaptus ruficollis',
                'family': 'Podicipedidae',
                'image_url': 'https://example.com/little_grebe.jpg'
            }
        ],
        'raptors': [
            {
                'id': 2,
                'common_name': 'Black Kite',
                'scientific_name': 'Milvus migrans',
                'family': 'Accipitridae',
                'image_url': 'https://example.com/black_kite.jpg'
            }
        ],
        'passerines': [
            {
                'id': 3,
                'common_name': 'House Sparrow',
                'scientific_name': 'Passer domesticus',
                'family': 'Passeridae',
                'image_url': 'https://example.com/house_sparrow.jpg'
            }
        ]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
