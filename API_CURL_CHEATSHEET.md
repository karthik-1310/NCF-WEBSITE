# NCF Pocket Guide Creator API - cURL Cheat Sheet

This document provides curl commands for manually testing all API endpoints in the NCF Pocket Guide Creator application.

## Public Bird Endpoints

### Get Birds Grouped by State

```bash
curl -X GET "http://localhost:5000/api/birds/grouped?state=Mizoram" | jq
```

### Get Birds Grouped by District

```bash
curl -X GET "http://localhost:5000/api/birds/grouped?state=Mizoram&district=Statewide" | jq
```

### Get Specific Bird Details

```bash
curl -X GET "http://localhost:5000/api/birds/American%20Crow" | jq
```

## Guide Creation Endpoints

### Create a Guide

```bash
curl -X POST "http://localhost:5000/api/guides/create" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Test Guide",
    "state": "Mizoram",
    "district": "Statewide",
    "birds": ["American Crow", "American Goldfinch"],
    "includeScientificNames": true
  }' | jq
```

### Get Guide by ID

```bash
# Replace {guide_id} with an actual guide ID
curl -X GET "http://localhost:5000/api/guides/{guide_id}" | jq
```

### Download Guide PDF

```bash
# Replace {guide_id} with an actual guide ID
curl -X GET "http://localhost:5000/api/guides/{guide_id}/download" \
  -o guide.pdf
```

## Authentication

### Admin Login

```bash
curl -X POST "http://localhost:5000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin_password"
  }' | jq
```

## Admin Endpoints

After login, you'll receive a token. Use it in the following commands:

### List All Species

```bash
curl -X GET "http://localhost:5000/api/admin/species" \
  -H "Authorization: Bearer {your_token}" | jq
```

### Get Specific Species Details (Admin)

```bash
curl -X GET "http://localhost:5000/api/admin/species/American%20Crow" \
  -H "Authorization: Bearer {your_token}" | jq
```

### Get Database Statistics

```bash
curl -X GET "http://localhost:5000/api/admin/statistics" \
  -H "Authorization: Bearer {your_token}" | jq
```

### Upload CSV File

```bash
curl -X POST "http://localhost:5000/api/admin/upload-csv" \
  -H "Authorization: Bearer {your_token}" \
  -F "type=species" \
  -F "file=@/path/to/your/species.csv" | jq
```

## PowerShell Equivalents

If you're using PowerShell on Windows, here are equivalent commands:

### Get Birds Grouped by State

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/birds/grouped?state=Mizoram" -Method GET | ConvertTo-Json -Depth 5
```

### Admin Login

```powershell
$body = @{
    email = "admin@example.com"
    password = "admin_password"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
$token = $response.token

# Now use $token in subsequent requests
```

### List All Species (PowerShell)

```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/admin/species" -Method GET -Headers $headers | ConvertTo-Json -Depth 5
```

## Notes

- Replace `http://localhost:5000` with your actual API base URL if different
- The `jq` command is used to prettify JSON output; omit it if you don't have jq installed
- For PowerShell commands, the output is automatically formatted
- Replace placeholder values like `{your_token}` and `{guide_id}` with actual values
