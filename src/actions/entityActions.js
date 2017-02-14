import axios from 'axios';

export function fetchEntities() {
	return function(dispatch) {
		axios.get("http://localhost:8088/api/entity")
			.then((response) => {
				dispatch({type: FETCH_ENTITIES_FULFILLED, payload: response.data})
			})
			.catch((err) => {
				dispatch({type: "FETCH_ENTITIES_REJECTED", payload: err})
			})	
	}
}