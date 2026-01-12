# Task Manager Frontend

A modern, responsive task management application built with React and Vite. This frontend application provides a clean and intuitive interface for managing tasks with user authentication.

## 🚀 Tech Stack

### Core Technologies
- **React 19.2.0** - Modern React with latest features
- **Vite 7.2.4** - Fast build tool and development server
- **React Router DOM 7.12.0** - Client-side routing
- **Tailwind CSS 4.1.18** - Utility-first CSS framework

### Additional Libraries
- **Axios 1.13.2** - HTTP client for API requests
- **Lucide React 0.562.0** - Beautiful icon library
- **React Hot Toast 2.6.0** - Elegant toast notifications
- **ESLint 9.39.1** - Code linting and formatting

## 📋 Features

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes with private route components
- Persistent login using localStorage

### Task Management
- Create, read, update, and delete tasks
- Mark tasks as pending or completed
- Filter tasks by status (all, pending, completed)
- Edit task titles and descriptions inline
- Real-time task updates

### User Experience
- Responsive design for all screen sizes
- Toast notifications for user feedback
- Loading states for async operations
- Clean and modern UI with Tailwind CSS
- Smooth transitions and hover effects

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Ensure the backend API is running on `http://localhost:5000`
   - The API base URL is configured in `src/api/api.js`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🌐 API Endpoints

The frontend communicates with a backend API at `http://localhost:5000/api`

### Authentication Endpoints
- `POST /login` - User login
  - Request: `{ email, password }`
  - Response: `{ token }`

- `POST /register` - User registration
  - Request: `{ name, email, password }`
  - Response: Success message

### Task Management Endpoints
- `GET /tasks` - Get all user tasks
  - Headers: `Authorization: Bearer <token>`
  - Response: Array of task objects

- `POST /tasks` - Create new task
  - Headers: `Authorization: Bearer <token>`
  - Request: `{ title, description }`
  - Response: Created task object

- `PUT /tasks/:id` - Update task
  - Headers: `Authorization: Bearer <token>`
  - Request: `{ title?, description?, status? }`
  - Response: Updated task object

- `DELETE /tasks/:id` - Delete task
  - Headers: `Authorization: Bearer <token>`
  - Response: Success message

## 📁 Project Structure

```
src/
├── api/
│   └── api.js              # Axios instance with base URL
├── context/
│   └── AuthContext.jsx     # Authentication context and provider
├── pages/
│   ├── Auth.jsx           # Login and registration page
│   └── Dashboard.jsx      # Main task management dashboard
├── assets/
│   └── react.svg          # React logo
├── App.css                # Global styles
├── App.jsx                # Main app component with routing
└── main.jsx               # App entry point
```

## 🎨 UI Components

### Authentication Page
- Toggle between login and registration forms
- Form validation with error messages
- Loading states during API calls
- Responsive form design

### Dashboard
- Task creation form with title and description
- Task list with status indicators
- Filter buttons for task status
- Inline editing capabilities
- Action buttons for each task (edit, delete, toggle status)
- User logout functionality

## 🔧 Configuration

### Vite Configuration
- React plugin for fast refresh
- Tailwind CSS plugin for styling
- Development server configuration

### ESLint Configuration
- React hooks plugin
- React refresh plugin
- Modern JavaScript rules

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist` folder, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- **Backend API** - The corresponding backend server for this frontend application
- **Full Stack Task Manager** - Complete MERN stack application

---

**Note**: This frontend application requires a running backend API server to function properly. Make sure the backend is configured and running before starting the frontend development server.
