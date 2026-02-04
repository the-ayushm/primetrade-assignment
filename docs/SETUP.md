# Quick Setup Guide

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js (v14+) installed - Check with `node --version`
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] npm or yarn package manager
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## Setup Steps

### 1. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod

# MongoDB will run on mongodb://localhost:27017
```

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster (Free tier available)
4. Get connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/primetrade_db`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your database connection
# Use your preferred editor (nano, vim, or VS Code)
nano .env

# Update these values in .env:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key_minimum_32_characters

# Start backend server
npm run dev

# Server should start on http://localhost:5000
# You should see: "✅ MongoDB Connected"
```

### 3. Frontend Setup

```bash
# Open a new terminal window
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev

# Frontend should start on http://localhost:3000
```

### 4. Test the Application

1. Open browser to `http://localhost:3000`
2. Click "Sign up" to create an account
3. Fill in registration form
4. You'll be redirected to dashboard
5. Try creating a task!

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
```bash
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Make sure MongoDB is running: `mongod`
2. Check connection string in .env
3. For Atlas, check if IP is whitelisted
```

### Issue: Port Already in Use
```bash
Error: Port 5000 is already in use

Solution:
# Change port in backend/.env
PORT=5001

# Then update frontend API URL in:
# frontend/src/services/api.js
baseURL: 'http://localhost:5001/api/v1'
```

### Issue: npm install fails
```bash
Solution:
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: CORS Error
```bash
Access to XMLHttpRequest blocked by CORS

Solution:
# Check backend/.env has correct CLIENT_URL
CLIENT_URL=http://localhost:3000

# Restart backend server
```

## Verification Checklist

After setup, verify:
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] MongoDB connected (check backend console)
- [ ] Can access Swagger docs at http://localhost:5000/api-docs
- [ ] Can register new user
- [ ] Can login
- [ ] Can create tasks
- [ ] Can view tasks in dashboard

## API Testing

### Using Swagger UI
1. Go to http://localhost:5000/api-docs
2. Try the `/auth/register` endpoint
3. Copy the token from response
4. Click "Authorize" button at top
5. Paste token as: `Bearer <your_token>`
6. Try protected endpoints

### Using Postman
1. Import `PrimeTrade_API_Collection.postman_collection.json`
2. Use "Register User" request
3. Token will be automatically saved
4. Try other requests

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get Tasks (replace <TOKEN>)
curl http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer <TOKEN>"
```

## Production Deployment Checklist

Before deploying to production:
- [ ] Change JWT_SECRET to strong random value
- [ ] Set NODE_ENV=production
- [ ] Use production MongoDB instance
- [ ] Enable HTTPS/SSL
- [ ] Set up proper CORS origins
- [ ] Configure rate limiting
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Review security settings

## Getting Help

If you encounter issues:
1. Check the error message in console
2. Review this troubleshooting guide
3. Check backend/frontend README files
4. Review API documentation
5. Check MongoDB connection

## Next Steps

After successful setup:
1. Explore the API using Swagger docs
2. Test all endpoints with Postman
3. Create sample tasks
4. Try admin features (create admin user)
5. Review the code structure
6. Read SCALABILITY.md for architecture details

## Development Tips

```bash
# Backend hot reload
npm run dev  # Uses nodemon

# Frontend hot reload
npm run dev  # Vite auto-reloads

# View logs
# Backend: Check terminal where server is running
# Frontend: Check browser console (F12)

# Database inspection
# Use MongoDB Compass or Studio 3T
# Connect to your MongoDB URI
```

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000                                    # Server port
NODE_ENV=development                          # Environment
MONGODB_URI=mongodb://localhost:27017/primetrade_db  # Database
JWT_SECRET=your_secret_key_here              # JWT secret
JWT_EXPIRE=7d                                # Token expiration
CLIENT_URL=http://localhost:3000             # Frontend URL
```

No environment variables needed for frontend (using Vite proxy).

---

**Ready to start?** Run the commands above and you'll be up and running in minutes!

For detailed information, see:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Scalability: `SCALABILITY.md`
- Main README: `README.md`