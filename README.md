# Mya Oro — Full-Stack E-commerce Platform

Full-stack e-commerce web application for **Mya Oro**, an Italian jewelry store.
Live site: **[myaoro.com](https://myaoro.com)**

Built end-to-end: a React + TypeScript storefront and admin dashboard, backed by a REST API in Express + TypeScript and a MySQL database.

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express, TypeScript |
| Database | MySQL (`mysql2`, raw SQL with transactions) |
| Auth & security | JWT authentication, bcrypt password hashing, role-based access (customer / admin) |
| Validation | Zod schemas, express-validator |
| Other | Multer (image uploads), Faker (seed data) |

## Features

**Storefront**
- Product catalog with categories, filters and product detail pages
- Cart, wishlist and multi-step checkout (address → payment → confirmation)
- Customer accounts: registration, login, profile, saved addresses and order history
- Protected routes with redirect back to the last page after login

**Admin dashboard**
- Management of products, categories, inventory, clients, orders and promotions
- Dashboard with recent orders

**Backend highlights**
- Order creation runs in a **database transaction**: the order and its items are committed or rolled back together
- Order totals are **recalculated on the server** from the cart stored in the database, never trusted from the client
- Order history is fetched in a **single query with JSON aggregation** (no N+1 queries)
- Request bodies validated with Zod before any write

## Project structure

```
backend/
  src/
    controllers/   # request handlers
    models/        # SQL data access
    routes/        # REST endpoints (/api/users, /api/products, /api/orders, ...)
    middleware/    # auth + role checks, error handling
    validators/    # request validation
    migrations/    # table creation scripts
    seed.ts        # sample data
frontend/
  src/
    pages/client/  # storefront pages
    pages/admin/   # admin dashboard
    components/
    api/           # Axios client
```

## Getting started

**Requirements:** Node.js, npm and a MySQL server.

1. Create `backend/.env`:
   ```
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=myaoro
   JWT_SECRET=a_long_random_secret
   FRONTEND_URL=http://localhost:5173
   PORT=3000
   ```
2. Install and run the backend:
   ```bash
   cd backend
   npm install
   npm run seed   # optional: sample data
   npm run dev
   ```
3. Install and run the frontend (in a second terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` and calls the API at `http://localhost:3000` by default (set `VITE_API_BASE_URL` in `frontend/.env` to change it).

## Notes

- The production site at [myaoro.com](https://myaoro.com) processes real payments with **Stripe and PayPal**. In this public repository the payment step is **simulated** (no provider keys or payment integration code are included), so the checkout confirms or fails the payment locally.
- Planned improvements: store money as integer cents, move cart clearing into the order transaction, and set the order status from the payment result.

## Author

**Mohamed Zoubir** — Full Stack Developer
[mzoubir.is-a.dev](https://mzoubir.is-a.dev) · [GitHub](https://github.com/mdzoubir) · [LinkedIn](https://www.linkedin.com/in/mohamed-zoubir)
