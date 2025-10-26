import os

# Set environment variables
os.environ['DATABASE_URL'] = 'sqlite:///pocketguide.db'

# Now import app after setting environment variables
from app import app, db

# Set up the database
with app.app_context():
    print("Creating database tables...")
    db.create_all()
    print("Database tables created successfully.")

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
