# NCF Pocket Guide Creator API Verification Script (PowerShell)
# This script tests all API endpoints using PowerShell commands

# Configuration
$BaseUrl = "http://localhost:5000/api"
$OutDir = ".\api_test_results"
$AdminEmail = "admin@example.com"
$AdminPassword = "admin_password"

# Create output directory
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

Write-Host "Starting API verification for NCF Pocket Guide Creator" -ForegroundColor Yellow
Write-Host "==============================================="
Write-Host "Testing endpoints at $BaseUrl"
Write-Host "Saving results to $OutDir"
Write-Host "==============================================="

# Function to test an endpoint
function Test-Endpoint {
    param (
        [string]$Method,
        [string]$Endpoint,
        [string]$Description,
        [object]$Data = $null,
        [string]$AuthToken = $null
    )
    
    Write-Host "Testing $Method $Endpoint ($Description)... " -NoNewline
    
    # Build request parameters
    $headers = @{}
    
    if ($AuthToken) {
        $headers.Add("Authorization", "Bearer $AuthToken")
    }
    
    if ($Data -ne $null) {
        $headers.Add("Content-Type", "application/json")
    }
    
    # Create a safe filename from the endpoint
    $filename = $Endpoint -replace "/", "_" -replace "\?", "_"
    if ($Method -ne "GET") {
        $filename = "${Method}_${filename}"
    }
    
    # Execute the request
    try {
        $params = @{
            Method = $Method
            Uri = "$BaseUrl$Endpoint"
            Headers = $headers
            ContentType = "application/json"
        }
        
        if ($Data -ne $null) {
            $jsonData = $Data | ConvertTo-Json -Depth 5
            $params.Add("Body", $jsonData)
        }
        
        $result = Invoke-RestMethod @params
        
        # Save the response
        $result | ConvertTo-Json -Depth 5 | Out-File -FilePath "$OutDir\$filename.json"
        
        Write-Host "PASSED" -ForegroundColor Green
        return $result
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "FAILED" -ForegroundColor Red
        Write-Host "  Status: $statusCode - $($_.Exception.Message)" -ForegroundColor Red
        
        # Try to get response content even if it failed
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseContent = $reader.ReadToEnd()
            $reader.Close()
            $responseContent | Out-File -FilePath "$OutDir\$filename.error.txt"
        }
        catch {
            # Could not read response content
            "Error retrieving response content" | Out-File -FilePath "$OutDir\$filename.error.txt"
        }
        
        return $null
    }
}

# -------------------------------
# PUBLIC BIRD ENDPOINTS
# -------------------------------
Write-Host "`nTesting Public Bird Endpoints" -ForegroundColor Yellow

# Get birds grouped by type for a specific state
Test-Endpoint -Method "GET" -Endpoint "/birds/grouped?state=Mizoram" -Description "Get birds grouped by state"

# Get birds grouped by type for a specific district
Test-Endpoint -Method "GET" -Endpoint "/birds/grouped?state=Mizoram&district=Statewide" -Description "Get birds grouped by district"

# Get specific bird details
Test-Endpoint -Method "GET" -Endpoint "/birds/American%20Crow" -Description "Get specific bird details"

# -------------------------------
# GUIDE CREATION ENDPOINTS
# -------------------------------
Write-Host "`nTesting Guide Creation Endpoints" -ForegroundColor Yellow

# Create a new guide
$guideData = @{
    title = "Test Guide"
    state = "Mizoram"
    district = "Statewide"
    birds = @("American Crow", "American Goldfinch")
    includeScientificNames = $true
}

$guideResult = Test-Endpoint -Method "POST" -Endpoint "/guides/create" -Description "Create guide" -Data $guideData

if ($guideResult -ne $null -and $guideResult.guide_id) {
    # Get an existing guide
    Test-Endpoint -Method "GET" -Endpoint "/guides/$($guideResult.guide_id)" -Description "Get existing guide"
}
else {
    Write-Host "Skipping guide retrieval test - no guide ID available" -ForegroundColor Red
}

# -------------------------------
# AUTHENTICATION
# -------------------------------
Write-Host "`nTesting Authentication" -ForegroundColor Yellow

# Login to get token
$loginData = @{
    email = $AdminEmail
    password = $AdminPassword
}

$loginResult = Test-Endpoint -Method "POST" -Endpoint "/auth/login" -Description "Admin login" -Data $loginData

# -------------------------------
# ADMIN ENDPOINTS
# -------------------------------
Write-Host "`nTesting Admin Endpoints" -ForegroundColor Yellow

if ($loginResult -ne $null -and $loginResult.token) {
    $authToken = $loginResult.token
    
    # List all species
    Test-Endpoint -Method "GET" -Endpoint "/admin/species" -Description "List all species" -AuthToken $authToken
    
    # Get specific species details
    Test-Endpoint -Method "GET" -Endpoint "/admin/species/American%20Crow" -Description "Get admin species details" -AuthToken $authToken
    
    # Get database statistics
    Test-Endpoint -Method "GET" -Endpoint "/admin/statistics" -Description "Get DB statistics" -AuthToken $authToken
    
    # CSV upload test would require form data handling in PowerShell
    Write-Host "Note: CSV upload test not included - requires multipart form data" -ForegroundColor Yellow
}
else {
    Write-Host "Skipping admin endpoint tests - authentication failed" -ForegroundColor Red
}

Write-Host "`nAPI Verification Complete" -ForegroundColor Yellow
Write-Host "Check $OutDir directory for detailed responses"
