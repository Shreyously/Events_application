import { axiosInstance } from '../../lib/axios';
import { toast } from 'react-toastify';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS';
export const CHECK_AUTH_FAILURE = 'CHECK_AUTH_FAILURE';

// Action creators
export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    _id: user._id,  // Make sure _id is included
    name: user.name,
    email: user.email,
    ...(user.isGuest && { isGuest: user.isGuest }) 
  },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutUser = () => ({
  type: LOGOUT,
});

export const checkAuthSuccess = (user) => ({
  type: CHECK_AUTH_SUCCESS,
  payload: user,
});

export const checkAuthFailure = () => ({
  type: CHECK_AUTH_FAILURE,
});



export const register = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/user/register', userData);
    if (response.data) {
      dispatch(registerSuccess(response.data));
      toast.success('Registration successful!');
    }
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
    toast.error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/user/login', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(loginSuccess(response.data));
      toast.success('Login successful!');
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    toast.error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get('/user/logout');
    localStorage.removeItem('user');
    dispatch(logoutUser());
    toast.success('Logout successful!');
    window.location.href='/login';
  } catch (error) {
    console.error('Logout failed:', error);
    toast.error('Logout failed');
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/user/checkauth');
    if (response.data) {
      dispatch(checkAuthSuccess(response.data));
    }
  } catch (error) {
    dispatch(checkAuthFailure());
  }
};

export const guestLogin = () => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/user/guest-login');
    if (response.data) {
      localStorage.setItem('user', JSON.stringify({ ...response.data, isGuest: true }));
      dispatch(loginSuccess({ ...response.data, isGuest: true }));
      toast.success('Logged in as guest');
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Guest login failed'));
    toast.error(error.response?.data?.message || 'Guest login failed');
  }
};