import axios from 'axios';
import API_URL from '../constants/api';
import {PRESUBMIT_ENTITY_PENDING, PRESUBMIT_ENTITY_FULFILLED, PRESUBMIT_ENTITY_REJECTED} from './types';
import { SubmissionError } from 'redux-form';
import promise from 'promise';
import {store} from '../store';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

const token = cookie.load('token');

export function preSubmit({entityName, email}) {
	console.log('in entityNewActions.preSubmit, token is: ', token);
  store.dispatch({type: "PRESUBMIT_ENTITY_PENDING"});	
  if(!email) {
  	email = store.getState().auth.email;
  }
  return new Promise((resolve, reject) => {
	  axios.post("http://localhost:8088/api/entity", {name: entityName, email, token}) 
      .then(response => {
      	console.log('response is:', response);
		if(response.data.success) {
			store.dispatch({type: "PRESUBMIT_ENTITY_FULFILLED", payload: {entityName, email}})   
			resolve();
		} else {
        	store.dispatch({type: "PRESUBMIT_ENTITY_REJECTED"});
        	var errObj = new SubmissionError({ _error: response.data.message })
        	reject(errObj);
		}
      }).catch((error) => {
      	console.log('Error: ', error);
        store.dispatch({type: "PRESUBMIT_ENTITY_REJECTED"});
        if(error instanceof SubmissionError) reject(error);

      })
  })
}

export function save({}) {
	
}

export function preSubmitOld({entityName, email}) {
	console.log('inside entityNewActions.preSubmit');
	return function(dispatch) {
			dispatch({type: "PRESUBMIT_ENTITY_PENDING"});
			axios.post(API_URL + "/entity", {name: entityName, email}) 
			.then((response) => {
				dispatch({type: "PRESUBMIT_ENTITY_FULFILLED", payload: response.data})
			})
			.catch((err) => {
				dispatch({type: "PRESUBMIT_ENTITY_REJECTED", payload: err})
			})	
	}
}

export function skip() {
	return true /*function(dispatch) {
			dispatch({type: "FETCH_ENTITIES_PENDING"});
			axios.get("http://localhost:8088/api/entity") 
			.then((response) => {
				dispatch({type: "FETCH_ENTITIES_FULFILLED", payload: response.data})
			})
			.catch((err) => {
				dispatch({type: "FETCH_ENTITIES_REJECTED", payload: err})
			})	
	}*/
}