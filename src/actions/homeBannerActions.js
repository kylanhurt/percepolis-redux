import axios from 'axios';

//create custom onBlur handler instead of redux-form?

export function asyncValidate(data) {
	console.log('in homeBannerActions.asyncValidate, data is: ', data);
	return function(dispatch) {

		axios.get("http://localhost:8088/api/users/" + data.email)
			.then((response) => {
				dispatch({type: "VALIDATE_EMAIL_FULFILLED", payload: response.data})
			})
			.catch((err) => {
				dispatch({type: "VALIDATE_EMAIL_REJECTED", payload: err});
			})	
	}
}

export default asyncValidate;