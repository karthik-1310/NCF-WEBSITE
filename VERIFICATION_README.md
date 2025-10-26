# NCF Pocket Guide Creator - API Verification Tools

This package contains several tools to verify that the NCF Pocket Guide Creator API endpoints are working correctly.

## Available Verification Tools

### 1. Command-Line Tools

#### Bash Script (Linux/Mac)

```bash
./verify_api.sh
```

#### PowerShell Script (Windows)

```powershell
.\verify_api.ps1
```

#### Python Script (Cross-platform)

```bash
python verify_api.py
```

### 2. GUI Tool

```bash
python api_verifier_gui.py
```

### 3. Quick Start (Windows)

Simply run the batch file:

```
verify_api.bat
```

## What Gets Verified

These tools test all API endpoints in the application:

1. **Public Bird Endpoints**

   - Birds grouped by state
   - Birds grouped by district
   - Individual bird details

2. **Guide Creation**

   - Guide creation
   - Guide retrieval

3. **Admin Functions** (with authentication)
   - Login
   - List all species
   - Get species details
   - Database statistics

## Documentation

For more details, see:

- [API Verification README](./API_VERIFICATION_README.md) - Detailed usage instructions
- [API cURL Cheatsheet](./API_CURL_CHEATSHEET.md) - Manual API testing with curl commands

## Requirements

- For Python script: `requests`, `colorama`
- For GUI tool: `tkinter`, `requests`

## Installation

```bash
pip install requests colorama
```

## Results

All verification tools save API responses to the `api_test_results` directory for inspection.
