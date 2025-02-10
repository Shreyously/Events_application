import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    CHECK_AUTH_SUCCESS,
    CHECK_AUTH_FAILURE,
  } from '../actions/userActions';
  
  const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          error: null,
        };
      case REGISTER_FAILURE:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          error: action.payload,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          error: action.payload,
        };
      case LOGOUT:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          error: null,
        };
      case CHECK_AUTH_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          error: null,
        };
      case CHECK_AUTH_FAILURE:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;