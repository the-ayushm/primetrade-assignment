# PrimeTrade Task Manager - Backend API

A secure, scalable REST API built with Node.js, Express, and MongoDB featuring JWT authentication and role-based access control.

## Features

### Authentication & Security
- User registration and login with JWT authentication
- Password hashing using bcrypt
- Role-based access control (User & Admin)
- Protected routes with middleware
- Input validation and sanitization
- Rate limiting to prevent abuse
- Security headers with Helmet

### Task Management (CRUD)
- Create, read, update, and delete tasks
- Task filtering by status and priority
- Pagination support
- Task statistics and analytics
- User-specific task access

### API Features
- RESTful API design
- API versioning (v1)
- Comprehensive error handling
- Request logging with Morgan
- CORS configuration
- Swagger API documentation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/primetrade_db
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

For MongoDB Atlas (cloud database):
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/primetrade_db
```

4. Start the server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on http://localhost:5000

## API Documentation

### Swagger Documentation
Access interactive API documentation at: `http://localhost:5000/api-docs`

### API Endpoints

#### Authentication

**Register User**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Login User**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User**
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

**Get All Users (Admin Only)**
```http
GET /api/v1/auth/users
Authorization: Bearer <token>
```

#### Tasks

**Create Task**
```http
POST /api/v1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend API",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

**Get All Tasks**
```http
GET /api/v1/tasks?status=pending&priority=high&page=1&limit=10
Authorization: Bearer <token>
```

**Get Single Task**
```http
GET /api/v1/tasks/:id
Authorization: Bearer <token>
```

**Update Task**
```http
PUT /api/v1/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

**Delete Task**
```http
DELETE /api/v1/tasks/:id
Authorization: Bearer <token>
```

**Get Task Statistics**
```http
GET /api/v1/tasks/stats
Authorization: Bearer <token>
```

## Database Schema

### User Model
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

### Task Model
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

## Project Structure

```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── swagger.js           # API documentation config
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── taskController.js    # Task CRUD operations
├── middleware/
│   ├── auth.js             # JWT verification & authorization
│   ├── errorHandler.js     # Error handling
│   └── validation.js       # Input validation
├── models/
│   ├── User.js             # User schema
│   └── Task.js             # Task schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   └── taskRoutes.js       # Task endpoints
├── .env                     # Environment variables
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
└── server.js               # Application entry point
```

## Security Features

1. **Password Security**
   - Passwords hashed with bcrypt (10 salt rounds)
   - Never stored in plain text

2. **JWT Authentication**
   - Secure token generation
   - Token expiration (7 days default)
   - Token verification on protected routes

3. **Input Validation**
   - Server-side validation using express-validator
   - Sanitization to prevent injection attacks

4. **Rate Limiting**
   - 100 requests per 15 minutes per IP
   - Prevents brute force attacks

5. **Security Headers**
   - Helmet middleware for HTTP headers
   - CORS configuration

## Scalability Considerations

### Current Architecture
- Modular MVC structure
- Separation of concerns
- Environment-based configuration
- Database indexing for performance

### Future Enhancements
1. **Microservices Architecture**
   - Separate auth and task services
   - API Gateway for routing
   - Service discovery

2. **Caching**
   - Redis for session management
   - Cache frequently accessed data
   - Reduce database queries

3. **Load Balancing**
   - Horizontal scaling with multiple instances
   - Nginx or AWS ELB for distribution
   - Session persistence

4. **Database Optimization**
   - Read replicas for scaling reads
   - Sharding for large datasets
   - Connection pooling

5. **Deployment**
   - Docker containerization
   - Kubernetes orchestration
   - CI/CD pipeline
   - Cloud deployment (AWS, Azure, GCP)

## Testing

Create test files in a `tests/` directory:

```bash
npm install --save-dev jest supertest
```

## Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Run with Docker:
```bash
docker build -t primetrade-backend .
docker run -p 5000:5000 --env-file .env primetrade-backend
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | Token expiration | 7d |
| CLIENT_URL | Frontend URL for CORS | http://localhost:3000 |

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Author

Ayush Kesharwani
