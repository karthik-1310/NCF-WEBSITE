#!/usr/bin/env python

"""
NCF Pocket Guide Creator API Verification Script

This script tests all API endpoints using the requests library.
Run it after starting the backend server to verify that all endpoints are working correctly.
"""

import requests
import json
import os
import sys
from datetime import datetime
try:
    from colorama import init, Fore, Style
    has_colorama = True
    # Initialize colorama for Windows
    init()
except ImportError:
    has_colorama = False

# Configuration
BASE_URL = "http://localhost:5000/api"
OUT_DIR = "./api_test_results"
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "admin_password"

# Create output directory if it doesn't exist
os.makedirs(OUT_DIR, exist_ok=True)

# Helper function to print colored output
def print_color(text, color=None, bold=False):
    if has_colorama:
        color_code = getattr(Fore, color.upper()) if color else ''
        bold_code = Style.BRIGHT if bold else ''
        print(f"{bold_code}{color_code}{text}{Style.RESET_ALL}")
    else:
        print(text)

def test_endpoint(method, endpoint, description, data=None, auth_token=None, files=None):
    """Test an API endpoint and save the result"""
    print(f"Testing {method} {endpoint} ({description})... ", end="")
    
    # Build the request parameters
    url = f"{BASE_URL}{endpoint}"
    headers = {}
    
    if auth_token:
        headers["Authorization"] = f"Bearer {auth_token}"
    
    # Make the request based on the method
    try:
        if method == "GET":
            response = requests.get(url, headers=headers, timeout=10)
        elif method == "POST":
            if files:
                response = requests.post(url, headers=headers, data=data, files=files, timeout=10)
            else:
                headers["Content-Type"] = "application/json"
                response = requests.post(url, headers=headers, json=data, timeout=10)
        elif method == "PUT":
            headers["Content-Type"] = "application/json"
            response = requests.put(url, headers=headers, json=data, timeout=10)
        elif method == "DELETE":
            response = requests.delete(url, headers=headers, timeout=10)
        else:
            print_color(f"FAILED", "red")
            print(f"  Unsupported method: {method}")
            return None
        
        # Create a safe filename from the endpoint
        safe_endpoint = endpoint.replace("/", "_").replace("?", "_")
        filename = f"{method}_{safe_endpoint}.json" if method != "GET" else f"{safe_endpoint}.json"
        
        # Save the response content
        try:
            result = response.json()
            with open(os.path.join(OUT_DIR, filename), "w") as f:
                json.dump(result, f, indent=2)
            
            # Check if there's an error in the response
            if "error" in result:
                print_color("FAILED", "red")
                print(f"  Error: {result['error']}")
            else:
                print_color("PASSED", "green")
            
            return result
            
        except ValueError:
            # Response was not JSON
            with open(os.path.join(OUT_DIR, filename), "w") as f:
                f.write(response.text)
            
            if response.status_code >= 200 and response.status_code < 300:
                print_color("PASSED", "green")
                print(f"  (Non-JSON response, status code: {response.status_code})")
                return response.text
            else:
                print_color("FAILED", "red")
                print(f"  Status code: {response.status_code}")
                return None
                
    except requests.exceptions.RequestException as e:
        print_color("FAILED", "red")
        print(f"  Exception: {str(e)}")
        return None

def main():
    print_color("\nNCF Pocket Guide Creator API Verification", "yellow", bold=True)
    print("=" * 50)
    print(f"Testing endpoints at {BASE_URL}")
    print(f"Saving results to {OUT_DIR}")
    print("=" * 50)
    
    # -------------------------------
    # PUBLIC BIRD ENDPOINTS
    # -------------------------------
    print_color("\nTesting Public Bird Endpoints", "yellow", bold=True)
    
    # Get birds grouped by type for a specific state
    test_endpoint("GET", "/birds/grouped?state=Mizoram", "Get birds grouped by state")
    
    # Get birds grouped by type for a specific district
    test_endpoint("GET", "/birds/grouped?state=Mizoram&district=Statewide", "Get birds grouped by district")
    
    # Get specific bird details
    test_endpoint("GET", "/birds/American%20Crow", "Get specific bird details")
    
    # -------------------------------
    # GUIDE CREATION ENDPOINTS
    # -------------------------------
    print_color("\nTesting Guide Creation Endpoints", "yellow", bold=True)
    
    # Create a new guide
    guide_data = {
        "title": "Test Guide",
        "state": "Mizoram",
        "district": "Statewide",
        "birds": ["American Crow", "American Goldfinch"],
        "includeScientificNames": True
    }
    guide_result = test_endpoint("POST", "/guides/create", "Create guide", guide_data)
    
    if guide_result and "guide_id" in guide_result:
        # Get the created guide
        guide_id = guide_result["guide_id"]
        test_endpoint("GET", f"/guides/{guide_id}", "Get existing guide")
    else:
        print_color("Skipping guide retrieval test - no guide ID available", "red")
    
    # -------------------------------
    # AUTHENTICATION
    # -------------------------------
    print_color("\nTesting Authentication", "yellow", bold=True)
    
    # Login to get token
    login_data = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
    login_result = test_endpoint("POST", "/auth/login", "Admin login", login_data)
    
    # -------------------------------
    # ADMIN ENDPOINTS
    # -------------------------------
    print_color("\nTesting Admin Endpoints", "yellow", bold=True)
    
    if login_result and "token" in login_result:
        auth_token = login_result["token"]
        
        # List all species
        test_endpoint("GET", "/admin/species", "List all species", auth_token=auth_token)
        
        # Get specific species details
        test_endpoint("GET", "/admin/species/American%20Crow", "Get admin species details", auth_token=auth_token)
        
        # Get database statistics
        test_endpoint("GET", "/admin/statistics", "Get DB statistics", auth_token=auth_token)
        
        # CSV upload test would be more complex, requiring file handling
        print_color("Note: CSV upload test not included - requires multipart form data", "yellow")
    else:
        print_color("Skipping admin endpoint tests - authentication failed", "red")
    
    print_color("\nAPI Verification Complete", "yellow", bold=True)
    print(f"Check {OUT_DIR} directory for detailed responses")

if __name__ == "__main__":
    main()
