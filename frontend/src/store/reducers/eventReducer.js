import {
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAILURE,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAILURE,
    GET_EVENT_BY_ID_SUCCESS,
    GET_EVENT_BY_ID_FAILURE,
    JOIN_EVENT_SUCCESS,
    JOIN_EVENT_FAILURE,
    LEAVE_EVENT_SUCCESS,
    LEAVE_EVENT_FAILURE,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAILURE,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAILURE,
  } from '../actions/eventActions';
  
  const initialState = {
    events: [],
    error: null,
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EVENTS_SUCCESS:
        return {
          ...state,
          events: action.payload,
          error: null,
        };
      case GET_EVENTS_FAILURE:
        return {
          ...state,
          events: [],
          error: action.payload,
        };
      case CREATE_EVENT_SUCCESS:
        return {
          ...state,
          events: [...state.events, action.payload],
          error: null,
        };
      case CREATE_EVENT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case GET_EVENT_BY_ID_SUCCESS:
        return {
          ...state,
          events: [action.payload], // Or handle differently if you expect multiple events
          error: null,
        };
      case GET_EVENT_BY_ID_FAILURE:
        return {
          ...state,
          events: [],
          error: action.payload,
        };
      case JOIN_EVENT_SUCCESS:
      case LEAVE_EVENT_SUCCESS:
      case UPDATE_EVENT_SUCCESS:
        // Assuming the API returns the updated event list
        return {
          ...state,
          events: action.payload,
          error: null,
        };
      case JOIN_EVENT_FAILURE:
      case LEAVE_EVENT_FAILURE:
      case UPDATE_EVENT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_EVENT_SUCCESS:
        // Assuming the API returns the updated event list, or you filter it manually
        return {
          ...state,
          events: state.events.filter(event => event.id !== action.payload), // Adjust based on your API
          error: null,
        };
      case DELETE_EVENT_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default eventReducer;