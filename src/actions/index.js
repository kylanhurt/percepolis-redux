import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, PROTECTED_TEST } from './types';
import { API_URL, CLIENT_ROOT_URL } from '../constants/api';
import { SubmissionError } from 'redux-form';
import promise from 'promise';
import {store} from '../store';
import { connect } from 'react-redux';

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
          store.dispatch({ type: AUTH_USER });
          browserHistory.push('/');
          resolve(null);
        } else {
          if(response.data.success === false) {
            console.log('throwing submission error for loginUser');
            var errObj = { _error: "Invalid credentials. Please try again."};
            throw new SubmissionError(errObj);
            reject(new SubmissionError(errObj));
          } else {
            console.log('in non.data.success=false clause');
            var errObj = new SubmissionError({ _error: "Our server was unable to validate your email and password combo ath this time."});
            reject(errObj);
          }
        }          
      }).catch((error) => {
        console.log('error is: ', error);
        //errorHandler(dispatch, error, AUTH_ERROR)        
        if(error instanceof SubmissionError) reject(error);

      })
  })
}

export function registerUser({ email, password }) {
console.log('inside index.registerUser, beginning') 
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:8088/api/users', { email: email, password: password })
    .then(response => {
      console.log('response is: ' , response, 'response.data is: ', response.data, 'response.code is: ', response.code);
      if(response.data.success){
        console.log('registerUser response.data.success is true')
        cookie.save('token', response.data.token, { path: '/' });
        store.dispatch({ type: AUTH_USER });
        browserHistory.push('/');
        resolve();
      } else {
        if(response.data.code === 11000){ //duplicate email
          console.log('data code = 11000')
          var errObj = new SubmissionError({_error: 'User registration failed, email already exists.' }) //need to add store dispatch for failed user registration (for form feedback)
          reject(errObj);
        } else if (response.code === 2) {
          console.log('response.code = 2')
          var errObj = new SubmissionError({ email: 'Invalid email pattern.' })
          reject(errObj);
        }
      }
    }).catch((error) => {
      console.log('error is: ', error)
      //errorHandler(store.dispatch, error, AUTH_ERROR)      
      if(error instanceof SubmissionError) reject(error);

    });
  })
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
      //errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}