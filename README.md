# Vite + React frontend and Express backend

This repository contains two folders:

- `frontend/` — a Vite + React app
- `backend/` — an Express.js app

Quick start (PowerShell):

1. Install dependencies in each folder:

```powershell
cd frontend; npm install
cd ..\backend; npm install
```

2. Start the backend and frontend (open two shells or use separate tabs):

```powershell
# Shell 1 — backend
cd backend
npm start

# Shell 2 — frontend
cd frontend
npm run dev
```

The frontend is configured to proxy `/api` to `http://localhost:3000` so `fetch('/api/hello')` from the frontend will reach the backend.

Notes:

- Requires Node.js and npm installed.
- If you want hot-reload for backend, run `npm run dev` in `backend` (depends on `nodemon`).
