import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  LogOut,
  User,
  Menu,
  X,
  Info,
  Contact,
  Users,
  Plus,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";

function Navbar() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleRedirectToLogin = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 px-4 py-3 flex justify-between items-center transition-all duration-300">
        {/* Brand & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden transition-transform duration-200 hover:rotate-180"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link 
            to="/" 
            className="text-xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
           <CalendarDays className="text-blue-600 h-10 w-10" />




 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EventX
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          {[
            { to: "/about", icon: Info, text: "About" },
            { to: "/contact", icon: Contact, text: "Contact" },
            { to: "/events", icon: Users, text: "Events", requiresAuth: true },
            { to: "/dashboard", icon: LayoutDashboard, text: "Dashboard", authOnly: true },
            { to: "/createevent", icon: Plus, text: "Create Event", authOnly: true },
          ].map(({ to, icon: Icon, text, authOnly, requiresAuth }) => {
            if (authOnly && !authUser) return null;
            const Component = requiresAuth && !authUser ? 'button' : Link;
            const props = requiresAuth && !authUser 
              ? { onClick: handleRedirectToLogin }
              : { to };
            
            return (
              <Component
                key={text}
                {...props}
                className="hover:text-blue-500 flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="relative">
                  {text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                </span>
              </Component>
            );
          })}
        </div>

        {/* Authentication Section */}
        <div className="hidden md:flex items-center gap-4">
          {authUser ? (
            <div className="relative group">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white transform transition-all duration-200 hover:scale-110 hover:shadow-lg">
                {authUser.name?.charAt(0).toUpperCase() || "A"}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-red-600 transition-colors duration-200 rounded-lg"
                >
                  <LogOut size={18} />
                  <span className="relative">
                    Logout
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <button 
                onClick={handleRedirectToLogin} 
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
              >
                <User size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="relative">
                  Login
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                </span>
              </button>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transform hover:translate-y-[-2px] transition-all duration-200"
              >
                <UserPlus size={18} />
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu - Moved outside nav and fixed positioning */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="p-4 space-y-4 mt-16">
              {[
                { to: "/about", icon: Info, text: "About" },
                { to: "/contact", icon: Contact, text: "Contact" },
                { to: "/events", icon: Users, text: "Events", requiresAuth: true },
                { to: "/dashboard", icon: LayoutDashboard, text: "Dashboard", authOnly: true },
                { to: "/createevent", icon: Plus, text: "Create Event", authOnly: true },
              ].map(({ to, icon: Icon, text, authOnly, requiresAuth }) => {
                if (authOnly && !authUser) return null;
                const Component = requiresAuth && !authUser ? 'button' : Link;
                const props = requiresAuth && !authUser 
                  ? { onClick: handleRedirectToLogin }
                  : { to, onClick: () => setIsMobileMenuOpen(false) };

                return (
                  <Component
                    key={text}
                    {...props}
                    className="w-full flex items-center gap-2 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <Icon size={18} className="text-blue-600" />
                    {text}
                  </Component>
                );
              })}
              
              {authUser ? (
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 p-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={handleRedirectToLogin}
                    className="w-full flex items-center gap-2 p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <User size={18} className="text-blue-600" />
                    Login
                  </button>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center gap-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    <UserPlus size={18} />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;