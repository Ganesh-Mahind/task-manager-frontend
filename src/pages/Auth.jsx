import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js"
import { AuthContext } from "../context/AuthContext.jsx";
import { User, Mail, Lock, CheckSquare } from "lucide-react";
import toast from 'react-hot-toast';
import "../App.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async () => {
  
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isLogin && !name) {
      toast.error('Please enter your name');
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }


    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
   
        const res = await api.post("/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        toast.success('Welcome');
        navigate("/dashboard");
      } else {
    
        await api.post("/register", { name, email, password });
        toast.success('Account created successfully! Please login. ✨');
        setIsLogin(true);
        setName("");
        setPassword("");
      }
    } catch (error) {
     
      if (error.response) {
 
        const errorMessage = error.response.data?.message || error.response.data?.error;
        
        if (error.response.status === 400) {
          toast.error(errorMessage || 'Invalid credentials');
        } else if (error.response.status === 401) {
          toast.error('Invalid email or password');
        } else if (error.response.status === 409) {
          toast.error('Email already exists. Please login.');
        } else if (error.response.status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error(errorMessage || 'Something went wrong');
        }
      } else if (error.request) {
   
        toast.error('Network error. Please check your connection.');
      } else {

        toast.error('An unexpected error occurred');
      }
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50 flex flex-col items-center justify-center px-4">
     

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-center mb-1">
          {isLogin ? "Welcome back" : "Create an account"}
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          {isLogin
            ? "Enter your credentials to access your tasks"
            : "Get started with your free account"}
        </p>

        {!isLogin && (
          <div className="mb-4">
            <label className="text-sm font-medium">Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                value={name}
                className="w-full border rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-emerald-400 outline-none"
                placeholder="John Doe"
                onChange={e => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="text-sm font-medium">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={email}
              type="email"
              className="w-full border rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-emerald-400 outline-none"
              placeholder="you@example.com"
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}

            />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              value={password}
              type="password"
              className="w-full border rounded-lg py-2 pl-10 pr-3 focus:ring-2 focus:ring-emerald-400 outline-none"
              placeholder="••••••••"
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          onClick={submit}
          disabled={isLoading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {isLogin ? 'Signing in...' : 'Creating account...'}
            </>
          ) : (
            <>{isLogin ? "Sign In" : "Create Account"}</>
          )}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={handleToggleMode}
            className="text-emerald-600 cursor-pointer font-semibold hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-6 text-center">
       Task Mangement Assignment 
      </p>
    </div>
  );
}