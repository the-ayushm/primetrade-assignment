# Quick Setup (Beginner Friendly)

This is a short setup guide written in simple steps.

## What you need
- Node.js (v14+)
- MongoDB (local) or MongoDB Atlas account
- npm or yarn

## Step 1: Backend
```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and update:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
```

Start backend:
```bash
npm run dev
```
Backend should run on http://localhost:5000

## Step 2: Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend should run on http://localhost:3000

## Step 3: Quick Test
1. Open http://localhost:3000
2. Register a user
3. Login
4. Create a task

## If something breaks
- MongoDB error: make sure MongoDB is running or Atlas IP is allowed
- Port error: change PORT in backend/.env
- CORS error: set CLIENT_URL=http://localhost:3000 in backend/.env

For more details, check the README files in backend and frontend.