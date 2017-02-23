import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, PROTECTED_TEST } from './types';
import { API_URL, CLIENT_ROOT_URL } from '../constants/api';
import { SubmissionError } from 'redux-form';
import promise from 'promise';

//const config = { validateStatus: function(status) {return (status >= 200 && status < 300) || status === 401}};

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
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/authenticate`, { email, password })
        .then(response => {
          if(response.data.token){
            console.log('in response.token clause of loginUser')
            cookie.save('token', response.data.token, { path: '/' });
            dispatch({ type: AUTH_USER });
            browserHistory.push('/');
            resolve(null);
          } else {
            if(response.data.success === false) {
              //console.log('throwing submission error for loginUser');
              var errObj = { email: "Invalid email and password combo", _error: "That email and password combination did not work. Please try again."};
              throw new SubmissionError(errObj);
              //reject(new SubmissionError(errObj));
            } else {
              throw new SubmissionError({ _error: "Our server was unable to validate your email and password combo ath this time."});
            }
          }          
        }).catch((error) => {
          console.log('error is: ', error);
          if(error instanceof SubmissionError) throw error;
          throw new SubmissionError(error);
        })

    })
  }
      /*


      axios.post(`${API_URL}/authenticate`, { email, password })
      .then(response => {
        console.log('status is: ', status, ' response is: ', response);
        if(response.data.token){
          console.log('in response.token clause of loginUser')
          cookie.save('token', response.data.token, { path: '/' });
          dispatch({ type: AUTH_USER });
          browserHistory.push('/');
        } else {
          if(response.data.success === false) {
            console.log('throwing submission error for loginUser');
            var errObj = { email: "Invalid email and password combo", _error: "That email and password combination did not work. Please try again."};
            throw (errObj)
          }
        }
      })
      .catch((error) => {
        console.log('error is: ', error, 'status is: ', status)
        resolve(new SubmissionError(error));
      })*/


export function registerUser({ email, password }) {  
  return function(dispatch) {
    axios.post('http://localhost:8088/api/users', { email: email, password: password })
    .then(response => {
      if(response.data.success){
        cookie.save('token', response.data.token, { path: '/' });
        dispatch({ type: AUTH_USER });
        browserHistory.push('/');
      } else {
        if(response.code === 11000){ //duplicate email
          throw new SubmissionError({ email: 'Email already exists.', _error: 'User registration failed.' }) //need to add store dispatch for failed user registration (for form feedback)
        } else if (response.code === 2) {
          throw new SubmissionError({ email: 'Invalid email pattern.', _error: 'Please insert a valid email.' })
        }
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