import axios from 'axios';
import API_URL from '../constants/api';

//create custom onBlur handler instead of redux-form?

export function asyncValidate(data) {
	console.log('in homeBannerActions.asyncValidate, data is: ');
	console.log(data);
	return function(dispatch) {

		axios.get(API_URL + "users/" + data.email)
			.then((response) => {
				dispatch({type: "VALIDATE_EMAIL_FULFILLED", payload: response.data})
			})
			.catch((err) => {
				dispatch({type: "VALIDATE_EMAIL_REJECTED", payload: err});
			})	
	}
}

export default asyncValidate;