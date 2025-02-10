import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login, guestLogin } from '../store/actions/userActions';

function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (!formData.password.trim()) {
      toast.error('Password is required');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(login(formData));
        navigate('/');
      } catch (error) {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  const handleGuestLogin = async () => {
    try {
      await dispatch(guestLogin());
      navigate('/');
    } catch (error) {
      toast.error('Guest login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
        {/* Image Section */}
        <div className="hidden md:block relative h-full min-h-[600px]">
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-pink-900/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 p-6">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 animate-pulse">
                EventX
              </h1>
              <p className="text-lg text-gray-300 max-w-md mx-auto">
                Your gateway to extraordinary experiences
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Welcome Back!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter your credentials to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-lg 
        hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
        disabled:opacity-50 disabled:cursor-not-allowed 
        transform hover:-translate-y-0.5 active:translate-y-0 
        transition-all duration-200 
        hover:animate-gradient-x"
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Signing in...
        </span>
      ) : (
        'Sign in'
      )}
    </button>

    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">Or</span>
      </div>
    </div>

    <button
      type="button"
      onClick={handleGuestLogin}
      className="w-full py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
    >
      Continue as Guest
    </button>
  </div>

  <div className="text-center">
    <Link 
      to="/forgot-password"
      className="text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors duration-200"
    >
      Forgot your password?
    </Link>
  </div>

  <div className="text-center text-sm text-gray-600">
    Don't have an account?{' '}
    <Link 
      to="/register" 
      className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors duration-200"
    >
      Sign up now
    </Link>
  </div>
</form>
        </div>
      </div>
    </div>
  );
}

export default Login;