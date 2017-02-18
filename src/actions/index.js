import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import { AUTH_USER,  
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST } from './types';
import { API_URL, CLIENT_ROOT_URL } from '../constants/api';

export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data){
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
  console.log('errorMessage: ', errorMessage);
}

export function loginUser({ email, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/authenticate`, { email, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      browserHistory.push('/');
    })
    .catch((error) => {
      console.log('error is: ', error)
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
    }
  }

export function registerUser({ email, password }) {  
  return function(dispatch) {
    axios.post('http://localhost:8088/api/users', { email: email, password: password })
    .then(response => {
      console.log('response is: ', response);
      if(response.data.success){
        cookie.save('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
        browserHistory.push('/');
      } else {
        console.log('registerUser API error') //need to add store dispatch for failed user registration (for form feedback)
      }
    })
    .catch((error) => {
      console.log('error is: ', error)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser() {  
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });

    browserHistory.push('/');
  }
}

export function protectedTest() {  
  return function(dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      console.log('error is: ', error)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}