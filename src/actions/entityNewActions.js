import axios from 'axios';
import API_URL from '../constants/api';
import {PRESUBMIT_ENTITY_PENDING, PRESUBMIT_ENTITY_FULFILLED, PRESUBMIT_ENTITY_REJECTED} from './types';
import { SubmissionError } from 'redux-form';
import promise from 'promise';
import {store} from '../store';
import { connect } from 'react-redux';

export function preSubmit({entityName, email}) {
  store.dispatch({type: "PRESUBMIT_ENTITY_PENDING"});	
  return new Promise((resolve, reject) => {
	  axios.post("http://localhost:8088/api/entity", {name: entityName, email}) 
      .then(response => {
		console.log('response is');        
      }).catch((error) => {
        console.log('error is: ', error);     
        if(error instanceof SubmissionError) reject(error);

      })
  })
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