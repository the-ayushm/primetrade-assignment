# PrimeTrade Task Manager – Backend Internship Assignment

This repository contains my submission for the PrimeTrade Backend Developer Internship assignment.

The project focuses on building a secure, modular backend with JWT authentication and a minimal React frontend to demonstrate API integration.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- Zod for input validation

### Frontend
- React 18
- Vite
- Axios
- React Router

---

## Features

### Backend
- User registration and login
- Secure password hashing
- JWT-based authentication (Bearer token)
- Role-based access control (user/admin)
- CRUD operations for tasks
- Ownership enforcement (users can access only their own tasks)
- Input validation using Zod
- Centralized error handling
- Clean modular architecture (controllers, services, routes)

### Frontend
- Register and login pages
- Protected routes using JWT
- Dashboard after login
- Task management UI (create, view, update, delete)
- Basic error and success messages

> Note: The frontend is intentionally minimal to demonstrate backend functionality.

---

## Project Structure

assignment/
├── .git/
├── .gitignore
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── src/
│       ├── config/
│       │   ├── database.js
│       │   └── swagger.js
│       ├── controllers/
│       │   ├── authController.js
│       │   └── taskController.js
│       ├── middleware/
│       │   ├── auth.js
│       │   ├── errorHandler.js
│       │   └── validation.js
│       ├── models/
│       │   ├── Task.js
│       │   └── User.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   └── taskRoutes.js
│       ├── utils/
│       │   └── apiResponse.js
│       └── server.js
├── docs/
├── frontend/
│   ├── .env.local
│   ├── .env.production
│   ├── .gitignore
│   ├── index.html
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskModal.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Users.jsx
│   │   └── services/
│   │       └── api.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── PrimeTrade_API_Collection.postman_collection.json
└── README.md


---

## Setup & Usage

Detailed setup instructions are available here:
- 📄 `docs/SETUP.md`

---

## API Overview

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- GET `/api/tasks/:id`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

All protected routes require:
Authorization: Bearer <JWT_TOKEN>


---

## Scalability Notes

A short scalability discussion is available in:
- 📄 `docs/SCALABILITY.md`

It explains how the current stateless and modular design can scale using caching, load balancing, and database replication if needed.

---

## Author

**Ayush Kesharwani**  
Backend Developer Intern Applicant  
Email: ayushml1247@gmail.com

---

This project is built as part of the PrimeTrade Backend Developer Internship assignment.


