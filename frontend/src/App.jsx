import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { SocketProvider } from './context/SocketContext';
import store from './store/store'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Notifications from './components/Notifications'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateEvent from './pages/CreateEvent'
import EventDashboard from './pages/EventDashboard'
import EventDetails from './pages/EventDetails'
import EditEvent from './pages/EditEvent'
import About from './pages/About'
import Contact from './pages/Contact'
import Events from './pages/Events'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Separate the app content into a new component
const AppContent = () => {
  const user = localStorage.getItem('user');
  
  useEffect(() => {
    if (user) {
      store.dispatch({ type: 'CHECK_AUTH' });
    }
  }, []);

  return (
    <div data-theme="autumn">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<PrivateRoute guestAllowed={true}><Events /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createevent" element={<PrivateRoute guestAllowed={false}><CreateEvent /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute guestAllowed={false}><EventDashboard /></PrivateRoute>} />
          <Route path="/events/:id" element={<PrivateRoute guestAllowed={true}><EventDetails /></PrivateRoute>} />
          <Route path="/updateevent/:id" element={<PrivateRoute guestAllowed={false}><EditEvent /></PrivateRoute>} />
        </Routes>
        <ToastContainer position="top-right" />
        <Notifications />
      </Router>
    </div>
  );
};

// Private Route Component
const PrivateRoute = ({ children, guestAllowed = true }) => {
  const user = useSelector(state => state.user.user);
  const location = useLocation();
  
  useEffect(() => {
    if (user?.isGuest && !guestAllowed) {
      toast.error('This feature requires a full account. Please register or login.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'guest-restricted' // Prevent duplicate toasts
      });
    }
  }, [user, guestAllowed, location.pathname]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.isGuest && !guestAllowed) {
    // Special case for event details page
    if (location.pathname.startsWith('/events/')) {
      return children;
    }
    return <Navigate to="/" />;
  }
  
  return children;
};


// Main App component
const App = () => {
  return (
    <Provider store={store}>
      <SocketProvider>
        <AppContent />
        </SocketProvider>
    </Provider>
  );
};

export default App;