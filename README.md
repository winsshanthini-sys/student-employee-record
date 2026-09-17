# Roster — Student & Employee Record Manager

A CRUD mini web application: **React** (Vite) frontend + **Django REST Framework** backend, SQLite database.

## Project structure
```
mini-web-app/
├── backend/     Django + DRF REST API (port 8000)
└── frontend/    React app (port 5173)
```

## 1. Backend setup (Django)

Open a terminal in VS Code, then:

```bash
cd backend
python -m venv venv

# Activate the virtual environment
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS / Linux

pip install -r requirements.txt

python manage.py makemigrations records
python manage.py migrate

python manage.py runserver
```

The API is now live at **http://127.0.0.1:8000/api/records/**
(Optional: `python manage.py createsuperuser` to log into `/admin/` and view records there too.)

## 2. Frontend setup (React)

Open a **second** terminal (keep the backend running in the first one):

```bash
cd frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**

## How it works
- `backend/records/models.py` — the `Record` model (full name, type, ID number, dept/class, email, join date)
- `backend/records/views.py` — a `ModelViewSet` giving you full CRUD + `?search=` and `?record_type=` filtering
- `frontend/src/api.js` — fetch calls to the Django API
- `frontend/src/App.jsx` — main state/data flow
- `frontend/src/components/RecordForm.jsx` — add/edit form
- `frontend/src/components/RecordTable.jsx` — search, filter, table, edit/delete buttons

## API endpoints
| Method | URL                         | Action              |
|--------|------------------------------|---------------------|
| GET    | /api/records/                | List all records    |
| POST   | /api/records/                | Create a record     |
| GET    | /api/records/{id}/           | Retrieve one record |
| PUT    | /api/records/{id}/           | Update a record     |
| DELETE | /api/records/{id}/           | Delete a record     |

## Notes
- CORS is pre-configured in `backend/config/settings.py` to allow `localhost:5173` to call the API.
- The database is SQLite (`backend/db.sqlite3`), created automatically on first migrate — no separate DB server needed.
