import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (

    <><Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#333',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }} /><AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard"
              element={<PrivateRoute>
                <Dashboard />
              </PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider></>
  );
}
