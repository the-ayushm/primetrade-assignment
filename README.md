# PrimeTrade Task Manager - Full Stack MERN Application

A secure, scalable task management system built with MongoDB, Express, React, Node.js (MERN), and Tailwind CSS, featuring JWT authentication and role-based access control.

## Assignment Overview

This project is a complete implementation of the Backend Developer Internship assignment for PrimeTrade, featuring:

- Scalable REST API with authentication & role-based access
- Modern React frontend with Tailwind CSS
- Complete CRUD operations for tasks
- Comprehensive API documentation
- Production-ready code structure
- Security best practices

## Features

### Backend (Node.js + Express + MongoDB)
- User registration & login with JWT authentication
- Password hashing with bcrypt
- Role-based access control (User & Admin)
- CRUD APIs for tasks
- API versioning (v1)
- Comprehensive error handling
- Input validation & sanitization
- Rate limiting for security
- Swagger API documentation
- Database indexing for performance

### Frontend (React + Tailwind CSS)
- User authentication (Login/Register)
- Protected dashboard with JWT
- Complete task management (Create, Read, Update, Delete)
- Task filtering by status
- Real-time statistics
- Admin user management page
- Responsive design
- Toast notifications
- Modern UI with animations

### Security & Scalability
- Secure JWT token handling
- Input sanitization & validation
- Scalable project structure
- Environment-based configuration
- Error logging
- CORS configuration

## Tech Stack

### Backend
- Node.js runtime
- Express.js framework
- MongoDB with Mongoose ODM
- JWT authentication
- bcryptjs for password hashing
- Helmet for security headers
- Express Rate Limit for protection
- Express Validator for input validation
- Swagger for API documentation

### Frontend
- React 18
- Vite build tool
- Tailwind CSS 3.4
- React Router DOM v6
- Axios for HTTP requests
- React Hot Toast for notifications
- Lucide React for icons

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd primetrade-assignment
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/primetrade_db

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/primetrade_db

# Start the server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Swagger Documentation
Access interactive API documentation at: **http://localhost:5000/api-docs**

### Quick API Reference

#### Authentication Endpoints
```
POST   /api/v1/auth/register  - Register new user
POST   /api/v1/auth/login     - Login user
GET    /api/v1/auth/me        - Get current user (Protected)
GET    /api/v1/auth/users     - Get all users (Admin only)
```

#### Task Endpoints
```
GET    /api/v1/tasks          - Get all tasks (Protected)
POST   /api/v1/tasks          - Create task (Protected)
GET    /api/v1/tasks/:id      - Get single task (Protected)
PUT    /api/v1/tasks/:id      - Update task (Protected)
DELETE /api/v1/tasks/:id      - Delete task (Protected)
GET    /api/v1/tasks/stats    - Get task statistics (Protected)
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, validated),
  password: String (required, hashed, min 6 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  title: String (required, max 100 chars),
  description: String (required, max 500 chars),
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 📁 Project Structure

```
primetrade-assignment/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskModal.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Users.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .gitignore
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── README.md
```

## 🔐 Security Features

1. **Authentication**
   - JWT-based authentication
   - Secure password hashing (bcrypt with 10 rounds)
   - Token expiration (7 days)

2. **Authorization**
   - Role-based access control
   - Protected routes
   - User-specific data access

3. **Input Validation**
   - Server-side validation
   - Sanitization to prevent injection
   - Custom validation rules

4. **Security Headers**
   - Helmet middleware
   - CORS configuration
   - Rate limiting (100 requests/15 minutes)

## 🚀 Scalability Considerations

### Current Implementation
- **Modular Architecture**: Separation of concerns with MVC pattern
- **Database Indexing**: Optimized queries with indexes
- **Environment Configuration**: Environment-based settings
- **API Versioning**: Support for future API versions

### Future Scalability Enhancements

1. **Microservices Architecture**
   - Separate auth and task services
   - API Gateway for routing
   - Service mesh for communication

2. **Caching Strategy**
   - Redis for session management
   - Cache frequently accessed data
   - Reduce database load

3. **Load Balancing**
   - Horizontal scaling with multiple instances
   - Nginx or cloud load balancers
   - Session persistence

4. **Database Optimization**
   - Read replicas for scaling reads
   - Sharding for large datasets
   - Connection pooling
   - MongoDB Atlas auto-scaling

5. **Containerization & Orchestration**
   - Docker containers for consistency
   - Kubernetes for orchestration
   - Auto-scaling based on load

6. **CI/CD Pipeline**
   - Automated testing
   - Continuous deployment
   - Blue-green deployments

7. **Monitoring & Logging**
   - Application performance monitoring (APM)
   - Centralized logging (ELK stack)
   - Error tracking (Sentry)

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm install --save-dev jest supertest
npm test
```

### Frontend Testing
```bash
cd frontend
npm install --save-dev vitest @testing-library/react
npm test
```

## 🐳 Docker Deployment

### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
  
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

## 📊 Demo Credentials

### Admin User
- Email: `admin@primetrade.com`
- Password: `admin123`

### Regular User
- Email: `user@primetrade.com`
- Password: `user123`

*Note: Create these users after starting the application*

## 🎯 Assignment Requirements Checklist

### Backend ✅
- [x] User registration & login APIs
- [x] Password hashing
- [x] JWT authentication
- [x] Role-based access (user vs admin)
- [x] CRUD APIs for tasks
- [x] API versioning
- [x] Error handling
- [x] Input validation
- [x] API documentation (Swagger)
- [x] Database schema (MongoDB)

### Frontend ✅
- [x] Built with React.js
- [x] Register & login UI
- [x] Protected dashboard (JWT required)
- [x] CRUD operations UI for tasks
- [x] Error/success messages from API

### Security & Scalability ✅
- [x] Secure JWT token handling
- [x] Input sanitization & validation
- [x] Scalable project structure
- [x] Scalability documentation

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/primetrade_db
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

- Ayush Kesharwani
- Email: ayushml1247@gmail.com


## 🙏 Acknowledgments

- PrimeTrade for the internship opportunity
- MongoDB documentation
- React and Tailwind CSS communities
- Express.js framework


**Built with ❤️ for PrimeTrade Backend Developer Internship Assignment**