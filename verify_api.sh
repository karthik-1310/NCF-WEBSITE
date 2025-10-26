#!/bin/bash

# NCF Pocket Guide Creator API Verification Script
# This script tests all API endpoints with curl commands

# Configuration
BASE_URL="http://localhost:5000/api"
OUT_DIR="./api_test_results"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin_password"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create output directory
mkdir -p $OUT_DIR

echo -e "${YELLOW}Starting API verification for NCF Pocket Guide Creator${NC}"
echo "==============================================="
echo "Testing endpoints at $BASE_URL"
echo "Saving results to $OUT_DIR"
echo "==============================================="

# Function to test an endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    local auth_token=$5
    
    echo -n "Testing $method $endpoint ($description)... "
    
    # Build curl command based on method and whether data/auth is needed
    cmd="curl -s -X $method \"$BASE_URL$endpoint\""
    
    if [ ! -z "$data" ]; then
        cmd="$cmd -H \"Content-Type: application/json\" -d '$data'"
    fi
    
    if [ ! -z "$auth_token" ]; then
        cmd="$cmd -H \"Authorization: Bearer $auth_token\""
    fi
    
    # Create a safe filename from the endpoint
    filename=$(echo "$endpoint" | sed 's/\//_/g' | sed 's/?/_/g')
    if [ "$method" != "GET" ]; then
        filename="${method}_${filename}"
    fi
    
    # Execute the curl command and save output
    result=$(eval $cmd)
    echo $result > "$OUT_DIR/${filename}.json"
    
    # Check if we got a valid JSON response
    if echo $result | jq . >/dev/null 2>&1; then
        # Check for error in the response
        error=$(echo $result | jq -r '.error // empty')
        if [ -z "$error" ]; then
            echo -e "${GREEN}PASSED${NC}"
        else
            echo -e "${RED}FAILED${NC} (Error: $error)"
        fi
    else
        echo -e "${RED}FAILED${NC} (Invalid JSON response)"
    fi
}

# -------------------------------
# PUBLIC BIRD ENDPOINTS
# -------------------------------
echo -e "\n${YELLOW}Testing Public Bird Endpoints${NC}"

# Get birds grouped by type for a specific state
test_endpoint "GET" "/birds/grouped?state=Mizoram" "Get birds grouped by state"

# Get birds grouped by type for a specific district
test_endpoint "GET" "/birds/grouped?state=Mizoram&district=Statewide" "Get birds grouped by district"

# Get specific bird details
test_endpoint "GET" "/birds/American%20Crow" "Get specific bird details"

# -------------------------------
# GUIDE CREATION ENDPOINTS
# -------------------------------
echo -e "\n${YELLOW}Testing Guide Creation Endpoints${NC}"

# Create a new guide
GUIDE_DATA='{
    "title": "Test Guide",
    "state": "Mizoram",
    "district": "Statewide",
    "birds": ["American Crow", "American Goldfinch"],
    "includeScientificNames": true
}'
test_endpoint "POST" "/guides/create" "Create guide" "$GUIDE_DATA"

# Get the created guide ID from the result
GUIDE_ID=$(cat "$OUT_DIR/_guides_create.json" | jq -r '.guide_id // empty')

if [ ! -z "$GUIDE_ID" ]; then
    # Get an existing guide
    test_endpoint "GET" "/guides/$GUIDE_ID" "Get existing guide"
else
    echo -e "${RED}Skipping guide retrieval test - no guide ID available${NC}"
fi

# -------------------------------
# AUTHENTICATION
# -------------------------------
echo -e "\n${YELLOW}Testing Authentication${NC}"

# Login to get token
LOGIN_DATA="{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}"
test_endpoint "POST" "/auth/login" "Admin login" "$LOGIN_DATA"

# Extract token from login response
AUTH_TOKEN=$(cat "$OUT_DIR/POST__auth_login.json" | jq -r '.token // empty')

# -------------------------------
# ADMIN ENDPOINTS
# -------------------------------
echo -e "\n${YELLOW}Testing Admin Endpoints${NC}"

if [ -z "$AUTH_TOKEN" ]; then
    echo -e "${RED}Skipping admin endpoint tests - authentication failed${NC}"
else
    # List all species
    test_endpoint "GET" "/admin/species" "List all species" "" "$AUTH_TOKEN"
    
    # Get specific species details
    test_endpoint "GET" "/admin/species/American%20Crow" "Get admin species details" "" "$AUTH_TOKEN"
    
    # Get database statistics
    test_endpoint "GET" "/admin/statistics" "Get DB statistics" "" "$AUTH_TOKEN"
    
    # Test CSV upload (this would need a real file for actual testing)
    echo -e "${YELLOW}Note: CSV upload test not included - requires multipart form data${NC}"
fi

echo -e "\n${YELLOW}API Verification Complete${NC}"
echo "Check $OUT_DIR directory for detailed responses"
