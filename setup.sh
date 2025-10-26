#!/bin/bash
set -e

# Database variables
DB_NAME=${DB_NAME:-pocketguide_db}
DB_USER=${DB_USER:-postgres}
DB_PASSWORD=${DB_PASSWORD:-postgres}
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== NCF Pocket Guide Setup Script ===${NC}"

# Install dependencies
install_dependencies() {
    echo -e "${BLUE}Installing dependencies...${NC}"
    
    # Backend dependencies
    if [ -d "backend" ]; then
        echo "Installing Python dependencies..."
        cd backend
        pip install -r requirements.txt
        cd ..
    fi
    
    # Frontend dependencies
    if [ -d "frontend" ]; then
        echo "Installing Node dependencies..."
        cd frontend
        npm install
        cd ..
    fi
    
    echo -e "${GREEN}Dependencies installed successfully!${NC}"
}

# Setup database
setup_database() {
    echo -e "${BLUE}Setting up database...${NC}"
    
    # Check if PostgreSQL is running
    if ! pg_isready -h $DB_HOST -p $DB_PORT > /dev/null 2>&1; then
        echo -e "${RED}Error: PostgreSQL is not running.${NC}"
        echo "Please start PostgreSQL and run this script again."
        exit 1
    fi
    
    # Create database if it doesn't exist
    if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
        echo "Database '$DB_NAME' already exists."
    else
        echo "Creating database '$DB_NAME'..."
        createdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME
        
        # Initialize schema
        echo "Initializing database schema..."
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database/schema.sql
    fi
    
    echo -e "${GREEN}Database setup completed!${NC}"
}

# Run data ingestion
run_data_ingestion() {
    echo -e "${BLUE}Running data ingestion...${NC}"
    
    if [ -f "backend/run_complete_ingestion.py" ]; then
        cd backend
        python run_complete_ingestion.py
        cd ..
        echo -e "${GREEN}Data ingestion completed!${NC}"
    else
        echo -e "${RED}Error: Data ingestion script not found.${NC}"
        exit 1
    fi
}

# Main execution
case "$1" in
    install)
        install_dependencies
        ;;
    setup)
        setup_database
        ;;
    ingest)
        run_data_ingestion
        ;;
    all)
        install_dependencies
        setup_database
        run_data_ingestion
        ;;
    *)
        echo "Usage: $0 {install|setup|ingest|all}"
        echo "  install - Install project dependencies"
        echo "  setup   - Setup database"
        echo "  ingest  - Run data ingestion"
        echo "  all     - Perform all actions"
        exit 1
        ;;
esac

echo -e "${GREEN}Done!${NC}"
