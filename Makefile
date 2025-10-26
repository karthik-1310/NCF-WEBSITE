.PHONY: install install-frontend setup run run-dev run-frontend test clean reset-db validate build help

# Install backend dependencies
install:
	@echo "Installing backend dependencies..."
	cd backend && pip install -r requirements.txt

# Install frontend dependencies
install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

# Install all dependencies
install-all: install install-frontend
	@echo "All dependencies installed."

# Setup database and ingest data
setup:
	@echo "Setting up database and ingesting data..."
	cd backend && python -c "from app import db, app; app.app_context().push(); db.create_all()"
	cd backend && python run_complete_ingestion.py

# Run backend server
run:
	@echo "Starting backend server..."
	cd backend && python app.py

# Run frontend development server
run-frontend:
	@echo "Starting frontend development server..."
	cd frontend && npm start

# Run both servers for development
run-dev:
	@echo "Starting development servers..."
	python start_dev_servers.py

# Run tests and validation
test:
	@echo "Running backend validation..."
	cd backend && python validate_data.py

# Clean up temporary files
clean:
	@echo "Cleaning up temporary files..."
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete
	rm -rf frontend/node_modules
	rm -rf frontend/build

# Reset database completely
reset-db:
	@echo "Resetting database..."
	cd backend && python -c "from app import db, app; app.app_context().push(); db.drop_all(); db.create_all()"

# Validate data
validate:
	@echo "Validating data..."
	cd backend && python validate_data.py

# Build frontend for production
build:
	@echo "Building frontend for production..."
	cd frontend && npm run build

# Help
help:
	@echo "Available commands:"
	@echo "  make install         - Install backend dependencies"
	@echo "  make install-frontend - Install frontend dependencies"
	@echo "  make install-all     - Install all dependencies"
	@echo "  make setup           - Setup database and ingest data"
	@echo "  make run             - Run backend server"
	@echo "  make run-frontend    - Run frontend development server"
	@echo "  make run-dev         - Run both backend and frontend servers"
	@echo "  make test            - Run validation tests"
	@echo "  make clean           - Clean up temporary files"
	@echo "  make reset-db        - Reset the database completely"
	@echo "  make validate        - Validate data in the database"
	@echo "  make build           - Build frontend for production"
