# 🚀 NCF Pocket Guide Creator - Instructions to Run

## Quick Start Guide

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 14+** with npm
- **PostgreSQL 12+** (optional, uses SQLite by default)

---

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
# Navigate to project directory
cd "NCF WEBSITE"

# Install all dependencies (backend + frontend)
make install-all

# OR install separately:
make install           # Backend only
make install-frontend  # Frontend only
```

### 2. Setup Database

```bash
# Create database tables and initialize with sample data
make setup
```

---

## 🏃‍♂️ Running the Application

### Option 1: Run Both Servers (RECOMMENDED)

```bash
make run-dev
```

✅ This starts both backend (Flask) and frontend (React) servers simultaneously.

### Option 2: Run Servers Separately

**Terminal 1 - Backend Server:**

```bash
make run
# OR manually:
cd backend
python app.py
```

**Terminal 2 - Frontend Server:**

```bash
make run-frontend
# OR manually:
cd frontend
npm start
```

---

## 📱 Application URLs & Pages

### Frontend (React Application)

**Base URL:** http://localhost:3000 _(or http://localhost:3001 if 3000 is occupied)_

#### 🌐 Public Pages

| Page            | URL                           | Description                       |
| --------------- | ----------------------------- | --------------------------------- |
| **Home**        | http://localhost:3000/        | Landing page with app overview    |
| **About**       | http://localhost:3000/about   | Information about NCF and project |
| **Contact**     | http://localhost:3000/contact | Contact information and support   |
| **Explore**     | http://localhost:3000/explore | Browse and search bird database   |
| **User Guides** | http://localhost:3000/guides  | View created field guides         |

#### 🛠️ Guide Creator Workflow (6 Steps)

| Step                     | URL                                       | Description                     |
| ------------------------ | ----------------------------------------- | ------------------------------- |
| **1. Taxa Selection**    | http://localhost:3000/create/step/taxa    | Choose bird categories          |
| **2. Region Selection**  | http://localhost:3000/create/step/region  | Select state and district       |
| **3. Species Selection** | http://localhost:3000/create/step/species | **Drag & drop birds** ⭐        |
| **4. Name Guide**        | http://localhost:3000/create/step/name    | Set guide title and description |
| **5. Layout Editor**     | http://localhost:3000/create/step/layout  | Arrange and customize layout    |
| **6. Preview & Export**  | http://localhost:3000/create/step/preview | Preview and download PDF        |

#### 👨‍💼 Admin Panel

| Page                   | URL                                       | Description                   |
| ---------------------- | ----------------------------------------- | ----------------------------- |
| **Dashboard**          | http://localhost:3000/admin               | Admin overview and statistics |
| **Species Management** | http://localhost:3000/admin/species       | Manage bird species data      |
| **Image Management**   | http://localhost:3000/admin/images        | Manage bird images            |
| **Info Diamonds**      | http://localhost:3000/admin/info-diamonds | Manage information diamonds   |
| **PDF Settings**       | http://localhost:3000/admin/pdf           | Configure PDF export settings |

---

### Backend (Flask API)

**Base URL:** http://localhost:5000

#### 🐦 Bird Data APIs

| Method | Endpoint               | Full URL                                  | Description                          |
| ------ | ---------------------- | ----------------------------------------- | ------------------------------------ |
| `GET`  | `/api/birds/grouped`   | http://localhost:5000/api/birds/grouped   | Get birds grouped by type for region |
| `GET`  | `/api/birds/locations` | http://localhost:5000/api/birds/locations | Get available locations              |

**Example API Calls:**

```bash
# Get birds for Mizoram - Aizawl
curl "http://localhost:5000/api/birds/grouped?state=Mizoram&district=Aizawl"

# Get all available locations
curl "http://localhost:5000/api/birds/locations"
```

#### 👨‍💼 Admin APIs

| Method | Endpoint                    | Full URL                                                | Description                              |
| ------ | --------------------------- | ------------------------------------------------------- | ---------------------------------------- |
| `GET`  | `/api/admin/species`        | http://localhost:5000/api/admin/species                 | List all species with pagination         |
| `GET`  | `/api/admin/species/<name>` | http://localhost:5000/api/admin/species/House%20Sparrow | Get specific species details             |
| `GET`  | `/api/admin/statistics`     | http://localhost:5000/api/admin/statistics              | Get database statistics                  |
| `POST` | `/api/admin/upload-csv`     | http://localhost:5000/api/admin/upload-csv              | Upload CSV data (stub)                   |
| `POST` | `/api/admin/initialize-db`  | http://localhost:5000/api/admin/initialize-db           | **Initialize database with sample data** |

**Example Admin API Calls:**

```bash
# Get database statistics
curl "http://localhost:5000/api/admin/statistics"

# Initialize database with sample data
curl -X POST "http://localhost:5000/api/admin/initialize-db"

# Get all species (first 10)
curl "http://localhost:5000/api/admin/species?page=1&per_page=10"
```

---

## 🗄️ Database Initialization (IMPORTANT!)

**The database starts empty. You need to populate it with sample data:**

### Option 1: Web Interface (EASIEST) ⭐

1. Start both servers: `make run-dev`
2. Go to: http://localhost:3000/create/step/species
3. Click **"Initialize DB"** button
4. Database will be populated with sample data for Mizoram districts

### Option 2: API Call

```bash
curl -X POST "http://localhost:5000/api/admin/initialize-db"
```

### Option 3: Command Line

```bash
make setup
```

---

## � Check Database Contents

### Quick Database Check

```bash
# Simple check - shows table counts and sample data
cd backend && python simple_db_check.py
```

**Example Output:**

```
=== DATABASE CONTENTS ===
📁 Database: ../instance/pocketguide.db

📊 Tables Found: 3
   • species: 10 records
   • frequency: 20 records
   • illustrations: 5 records

🦅 Sample Species:
   1. House Sparrow (Passer domesticus) - Passerine
   2. Red-vented Bulbul (Pycnonotus cafer) - Passerine
   3. Common Myna (Acridotheres tristis) - Passerine

🗺️ Sample Locations:
   • Mizoram - Aizawl
   • Mizoram - Lunglei
```

### Detailed Database Check

```bash
# Comprehensive check - shows structure, columns, and statistics
cd backend && python check_database.py
```

### API-based Check

```bash
# Get database statistics via API
curl "http://localhost:5000/api/admin/statistics"
```

**Common Database States:**

- **Empty Database:** "No tables found" → Run initialization
- **Tables but No Data:** "0 records" in all tables → Click "Initialize DB" button
- **Partial Data:** Some tables have records → Good to go!

---

## �🛠️ Development Commands

### Backend Commands

```bash
# Run backend server
make run
cd backend && python app.py

# Check what's currently in the database
cd backend && python simple_db_check.py

# Check database with detailed analysis (requires SQLAlchemy)
cd backend && python check_database.py

# Reset database completely
make reset-db

# Validate data in database
make validate
cd backend && python validate_data.py

# Test database connection
cd backend && python test_db.py
```

### Frontend Commands

```bash
# Run frontend development server
make run-frontend
cd frontend && npm start

# Build for production
make build
cd frontend && npm run build

# Run tests
cd frontend && npm test
```

### Combined Commands

```bash
# Install all dependencies (backend + frontend)
make install-all

# Run both servers simultaneously
make run-dev

# Clean up temporary files
make clean

# View all available commands
make help
```

---

## 🎯 Complete Workflow Testing

**Follow this step-by-step to test the entire application:**

1. **Start Servers:**

   ```bash
   make run-dev
   ```

2. **Initialize Database:**

   - Go to: http://localhost:3000/create/step/species
   - Click **"Initialize DB"** button

3. **Test the Creator Workflow:**

   - **Step 1:** http://localhost:3000/create/step/taxa → Select "Birds"
   - **Step 2:** http://localhost:3000/create/step/region → Select "Mizoram" → "Aizawl"
   - **Step 3:** http://localhost:3000/create/step/species → **Drag & drop birds** ⭐
   - **Step 4:** http://localhost:3000/create/step/name → Name your guide
   - **Step 5:** http://localhost:3000/create/step/layout → Customize layout
   - **Step 6:** http://localhost:3000/create/step/preview → Export PDF

4. **Test Admin Panel:**
   - Go to: http://localhost:3000/admin
   - Check statistics and manage data

---

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Frontend automatically finds next available port (3001, 3002, etc.)
# Backend: Change port in backend/app.py if needed
```

### Database Empty Error

```bash
# Use the "Initialize DB" button in the species selection page
# OR run: curl -X POST "http://localhost:5000/api/admin/initialize-db"
```

### Module Not Found Errors

```bash
# Backend: Reinstall dependencies
cd backend && pip install -r requirements.txt

# Frontend: Reinstall node modules
cd frontend && rm -rf node_modules && npm install
```

### Python Virtual Environment Issues

```bash
# Activate virtual environment (if using one)
# Windows:
.venv\Scripts\activate

# macOS/Linux:
source .venv/bin/activate
```

---

## 🔧 Environment Configuration

### Backend (.env file)

```bash
# Database Configuration
DATABASE_URL=sqlite:///pocketguide.db
# OR for PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost:5432/ncf_birds

# Flask Settings
FLASK_DEBUG=true
FLASK_ENV=development
```

### Frontend (.env file)

```bash
# API Configuration
REACT_APP_API_URL=/api
PORT=3000
```

---

## 📞 Support & Logs

### Check Logs

- **Backend logs:** `backend.log` file
- **Frontend logs:** Browser console (F12)

### Common Commands

```bash
# View all available commands
make help

# Validate everything is working
make validate

# Reset and start fresh
make reset-db
make setup
```

---

## 🎉 Success!

If everything is working correctly, you should see:

- **Frontend:** http://localhost:3000 showing the landing page
- **Backend:** http://localhost:5000/api/admin/statistics returning database statistics
- **Species Selection:** Drag and drop functionality working with real bird data

**Ready to create your custom bird field guide!** 🐦

---

_Last Updated: September 25, 2025_
