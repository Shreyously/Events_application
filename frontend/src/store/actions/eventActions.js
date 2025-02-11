import { toast } from 'react-toastify';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';
export const GET_EVENT_BY_ID_SUCCESS = 'GET_EVENT_BY_ID_SUCCESS';
export const GET_EVENT_BY_ID_FAILURE = 'GET_EVENT_BY_ID_FAILURE';
export const JOIN_EVENT_SUCCESS = 'JOIN_EVENT_SUCCESS';
export const JOIN_EVENT_FAILURE = 'JOIN_EVENT_FAILURE';
export const LEAVE_EVENT_SUCCESS = 'LEAVE_EVENT_SUCCESS';
export const LEAVE_EVENT_FAILURE = 'LEAVE_EVENT_FAILURE';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

// Action Creators
export const getEventsSuccess = (events) => ({
  type: GET_EVENTS_SUCCESS,
  payload: events,
});

export const getEventsFailure = (error) => ({
  type: GET_EVENTS_FAILURE,
  payload: error,
});

export const createEventSuccess = (event) => ({
  type: CREATE_EVENT_SUCCESS,
  payload: event,
});

export const createEventFailure = (error) => ({
  type: CREATE_EVENT_FAILURE,
  payload: error,
});

export const getEventByIdSuccess = (event) => ({
  type: GET_EVENT_BY_ID_SUCCESS,
  payload: event,
});

export const getEventByIdFailure = (error) => ({
  type: GET_EVENT_BY_ID_FAILURE,
  payload: error,
});

export const joinEventSuccess = (event) => ({
  type: JOIN_EVENT_SUCCESS,
  payload: event,
});

export const joinEventFailure = (error) => ({
  type: JOIN_EVENT_FAILURE,
  payload: error,
});

export const leaveEventSuccess = (event) => ({
  type: LEAVE_EVENT_SUCCESS,
  payload: event,
});

export const leaveEventFailure = (error) => ({
  type: LEAVE_EVENT_FAILURE,
  payload: error,
});

export const updateEventSuccess = (event) => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: event,
});

export const updateEventFailure = (error) => ({
  type: UPDATE_EVENT_FAILURE,
  payload: error,
});

export const deleteEventSuccess = () => ({
  type: DELETE_EVENT_SUCCESS,
});

export const deleteEventFailure = (error) => ({
  type: DELETE_EVENT_FAILURE,
  payload: error,
});

// Async Actions (using thunk)
import { axiosInstance } from '../../lib/axios'; // Adjust the path as needed

export const getAllEvents = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/events/getevents'); // Remove localhost:5000 since it's in baseURL
    dispatch(getEventsSuccess(response.data));
  } catch (error) {
    dispatch(getEventsFailure(error.message || 'Failed to fetch events'));
  }
};


export const createEvent = (eventData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/events/createevent', eventData);
    dispatch(createEventSuccess(response.data));
    toast.success('Event created successfully');
  } catch (error) {
    console.error('Create event error:', error.response?.data || error.message);
    dispatch(createEventFailure(error.response?.data?.message || 'Failed to create event'));
    toast.error(error.response?.data?.message || 'Failed to create event');
  }
};

export const getEventById = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/events/${id}`); // Replace with your API endpoint
    dispatch(getEventByIdSuccess(response.data));
  } catch (error) {
    dispatch(getEventByIdFailure(error.message || 'Failed to fetch event'));
  }
};

export const joinEvent = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/events/${id}/join`);
    dispatch(joinEventSuccess(response.data));
    toast.success('Successfully joined event');
  } catch (error) {
    console.error('Join event error:', error);
    const errorMessage = error.response?.data?.message || 'Failed to join event';
    dispatch(joinEventFailure(errorMessage));
    toast.error(errorMessage);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
};

export const leaveEvent = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/events/${id}/leave`); // Replace with your API endpoint
    dispatch(leaveEventSuccess(response.data));
    toast.success('Successfully left event');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to leave event';
    dispatch(leaveEventFailure(errorMessage));
    toast.error(errorMessage);
    // Don't redirect on error
    return Promise.reject(error);
  }
};

export const updateEvent = (id, eventData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/events/${id}/update`, eventData); // Replace with your API endpoint
    dispatch(updateEventSuccess(response.data));
    toast.success('Event updated successfully');
  } catch (error) {
    dispatch(updateEventFailure(error.message || 'Failed to update event'));
    toast.error(error.response?.data?.message || 'Failed to update event');
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/events/${id}/delete`);
    dispatch(deleteEventSuccess());
    toast.success('Event deleted successfully');
  } catch (error) {
    dispatch(deleteEventFailure(error.message || 'Failed to delete event'));
    toast.error(error.response?.data?.message || 'Failed to delete event');
  }
};