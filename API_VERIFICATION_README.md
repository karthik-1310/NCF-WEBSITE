# API Verification Scripts

These scripts verify that all API endpoints in the NCF Pocket Guide Creator application are working correctly.

## Available Scripts

### 1. Bash Script (Linux/Mac)

```bash
# Make it executable
chmod +x verify_api.sh

# Run the script
./verify_api.sh
```

### 2. Python Script (Cross-platform)

```bash
# Install dependencies
pip install requests colorama

# Run the script
python verify_api.py
```

### 3. PowerShell Script (Windows)

```powershell
# Run the script
.\verify_api.ps1
```

## What These Scripts Do

Each script tests all the API endpoints in the NCF Pocket Guide Creator application:

1. **Public Bird Endpoints**

   - GET /api/birds/grouped?state=Mizoram
   - GET /api/birds/grouped?state=Mizoram&district=Statewide
   - GET /api/birds/American%20Crow

2. **Guide Creation Endpoints**

   - POST /api/guides/create
   - GET /api/guides/{guide_id}

3. **Authentication**

   - POST /api/auth/login

4. **Admin Endpoints** (requires authentication)
   - GET /api/admin/species
   - GET /api/admin/species/American%20Crow
   - GET /api/admin/statistics

## Results

All scripts save the API responses to an `api_test_results` directory for inspection.

## Configuration

You can modify the following settings at the top of each script:

- `BASE_URL`: The base URL of the API (default: http://localhost:5000/api)
- `OUT_DIR`: The directory to save API responses (default: ./api_test_results)
- `ADMIN_EMAIL`: Admin email for authentication tests
- `ADMIN_PASSWORD`: Admin password for authentication tests

## Troubleshooting

If tests fail, check:

1. The backend server is running
2. The database has been properly initialized with data
3. The admin credentials are correct
4. The `api_test_results` directory for detailed error messages
