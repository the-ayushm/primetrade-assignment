# PrimeTrade Task Manager - Frontend

A modern, responsive React application with Tailwind CSS for managing tasks with authentication and role-based access.

## 🚀 Features

- ✅ User authentication (Login/Register)
- ✅ Protected routes with JWT
- ✅ Role-based UI (User & Admin views)
- ✅ Complete task CRUD operations
- ✅ Task filtering and statistics
- ✅ Responsive design with Tailwind CSS
- ✅ Toast notifications
- ✅ Modern UI/UX with animations
- ✅ Admin user management dashboard

## 🛠️ Technologies

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## 🛠️ Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── ProtectedRoute.jsx   # Route protection
│   │   ├── TaskCard.jsx         # Task display card
│   │   └── TaskModal.jsx        # Task create/edit modal
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication state
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── Dashboard.jsx        # Task dashboard
│   │   └── Users.jsx            # User management (Admin)
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 UI Components

### Pages

1. **Login** - User authentication
2. **Register** - New user registration
3. **Dashboard** - Task management interface
4. **Users** - Admin-only user management

### Components

1. **Navbar** - Navigation with user info
2. **TaskCard** - Individual task display
3. **TaskModal** - Create/edit task form
4. **ProtectedRoute** - Route authentication wrapper

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token stored in localStorage
3. Token sent with all API requests
4. Auto-redirect on token expiration
5. Protected routes check authentication

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🎨 Tailwind Configuration

Custom colors and animations defined in `tailwind.config.js`:

```javascript
primary: {
  50-900: Blue color palette
}

Animations:
- fade-in
- slide-up
```

## 🔄 API Integration

API service located in `src/services/api.js`:

```javascript
// Authentication
authAPI.register(userData)
authAPI.login(credentials)
authAPI.getProfile()
authAPI.getAllUsers()

// Tasks
taskAPI.getTasks(params)
taskAPI.getTask(id)
taskAPI.createTask(taskData)
taskAPI.updateTask(id, taskData)
taskAPI.deleteTask(id)
taskAPI.getStats()
```

## 🎯 Features in Detail

### Dashboard
- Task statistics cards
- Filter tasks by status
- Create new tasks
- Edit existing tasks
- Delete tasks
- Pagination support

### Task Management
- Create tasks with:
  - Title
  - Description
  - Status (Pending/In Progress/Completed)
  - Priority (Low/Medium/High)
  - Due date
- Edit and update tasks
- Delete tasks with confirmation

### User Management (Admin)
- View all registered users
- User details (name, email, role)
- User statistics
- Active/inactive status

## 🎨 Custom Tailwind Classes

Defined in `index.css`:

```css
.btn-primary    - Primary button style
.btn-secondary  - Secondary button style
.btn-danger     - Danger button style
.input-field    - Input field style
.card           - Card container style
.badge-*        - Status/priority badges
```

## 🔒 Security Features

1. **Token Management**
   - Secure storage in localStorage
   - Automatic token refresh
   - Token expiration handling

2. **Protected Routes**
   - Authentication check
   - Role-based access
   - Automatic redirects

3. **Input Validation**
   - Client-side validation
   - Error message display
   - Form sanitization

## 🚀 Performance Optimizations

1. **Code Splitting**
   - Route-based splitting
   - Lazy loading components

2. **Asset Optimization**
   - Vite build optimization
   - CSS purging with Tailwind

3. **State Management**
   - Context API for global state
   - Minimal re-renders

## 🎨 Design System

### Colors
- Primary: Blue (#3b82f6)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)
- Gray: Neutral shades

### Typography
- Font Family: System fonts
- Headings: Bold
- Body: Regular

## 📦 Dependencies

### Core
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.21.1

### UI & Styling
- tailwindcss: ^3.4.1
- lucide-react: ^0.303.0
- react-hot-toast: ^2.4.1

### HTTP & API
- axios: ^1.6.5

### Dev Dependencies
- vite: ^5.0.11
- @vitejs/plugin-react: ^4.2.1
- autoprefixer: ^10.4.16
- postcss: ^8.4.33

## 🔧 Configuration Files

### vite.config.js
```javascript
- React plugin
- Port configuration (3000)
- API proxy to backend
```

### tailwind.config.js
```javascript
- Content paths
- Custom theme extensions
- Custom animations
```

### postcss.config.js
```javascript
- Tailwind CSS
- Autoprefixer
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Change port in vite.config.js or use:
npm run dev -- --port 3001
```

### API connection issues
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API endpoints

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Future Enhancements

1. **Features**
   - Real-time updates with WebSockets
   - Task comments and attachments
   - Task categories and tags
   - Advanced filtering and search
   - Export tasks to CSV/PDF

2. **Performance**
   - Implement virtual scrolling
   - Add service workers for PWA
   - Optimize bundle size

3. **UX Improvements**
   - Dark mode support
   - Keyboard shortcuts
   - Drag-and-drop task ordering
   - Advanced animations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## 👨‍💻 Author

Ayush Kesharwani
