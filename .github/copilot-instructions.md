# Copilot Instructions: Pocket Guide Creator

## Project Architecture

- **Monorepo Structure:**
  - `backend/`: Flask API, data ingestion, validation, and admin scripts.
  - `frontend/`: React app for user and admin UI.
  - `data/`: CSV files for species, frequency, and image inventory (used by backend ingestion).
  - Docker and Makefile scripts for orchestration.

## Data Flow & Integration

- **Data Ingestion:**
  - Ingests CSVs (`species.csv`, `frequency_birds.csv`, `google_drive_inventory.csv`) via `backend/run_complete_ingestion.py` and `backend/ingest_data_complete.py`.
  - Maps images from Google Drive links to species records.
  - All ingestion scripts require the Flask app context and commit to PostgreSQL.
- **API:**
  - Main endpoint: `/api/birds/grouped?state=...&district=...` returns birds grouped by type for a region.
  - Admin endpoints: `/api/admin/species`, `/api/admin/upload-csv` (CSV upload not fully implemented).
- **Frontend:**
  - Uses React Router, MUI, and Context for state management (`GuideContext`).
  - Drag-and-drop bird selection, PDF generation via `jsPDF`.
  - API calls via `frontend/src/services/api.js` (with interceptors and error handling).

## Developer Workflows

- **Local Setup:**
  - Use `make install` and `make setup` for dependencies and DB/data ingestion.
  - Start servers: `make run` (spawns backend and frontend in separate terminals).
  - Validate data: `python backend/validate_data.py`.
- **Docker:**
  - `docker-compose up --build` runs all services, including ingestion.
  - Data ingestion runs automatically via the `data-ingestion` service.
- **Testing:**
  - Minimal test data: `python backend/scripts/create_test_data.py`.
  - Data validation: `python backend/validate_data.py`.
- **Environment:**
  - All secrets/configs in `.env` files (see `.env.example` for required variables).

## Conventions & Patterns

- **Backend:**
  - SQLAlchemy models mirror schema in `database/schema.sql`.
  - All ingestion and validation scripts require explicit `app.app_context()`.
  - Data ingestion is idempotent but not incremental (re-ingestion overwrites data).
- **Frontend:**
  - State managed via `GuideContext` (see `frontend/src/contexts/GuideContext.js`).
  - Bird grouping and drag-and-drop logic in `Workspace.js`.
  - PDF generation in `services/pdfService.js`.
- **Admin Panel:**
  - Accessible at `/admin` (see `AdminDashboard.js`).
  - CSV upload UI present but backend endpoint is a stub.

## Integration Points

- **PostgreSQL:**
  - Connection string in `.env` and Docker Compose.
- **Google Drive:**
  - Image links must be public; mapped via CSV and used in frontend.
- **Docker Compose:**
  - Orchestrates `postgres`, `backend`, `frontend`, and `data-ingestion`.

## Examples

- **Ingest Data:**
  ```bash
  python backend/run_complete_ingestion.py
  ```
- **API Query:**
  ```bash
  curl http://localhost:5000/api/birds/grouped?state=Mizoram
  ```
- **Frontend API Usage:**
  See `frontend/src/services/api.js` for axios patterns and error handling.

---

If any section is unclear or missing details, please specify which workflows, conventions, or integration points need further documentation.
