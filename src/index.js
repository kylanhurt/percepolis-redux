import React from 'react';  
import ReactDOM from 'react-dom';  
import { Provider } from 'react-redux';   
import { Router, browserHistory } from 'react-router';  
import routes from './routes';  
import reducers from './reducers/index';  
import { AUTH_USER } from './actions/types';
import cookie from 'react-cookie';
import css from './style.less'
import axios from 'axios';
import {store} from './store';


// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';


const token = cookie.load('token');

if (token) {  
  store.dispatch({ type: "AUTH_USER" });
} else { //remove this clause
	store.dispatch({type: "UNAUTH_USER", payload: "unauth"}); //payload can be an OBJECT
}

/*store.dispatch({
	type: "FETCH_ENTITIES",
	payload: axios.get("http://localhost:8088/api/entity")
}) //need to know how to update store upon payload fulfillment */


ReactDOM.render(  
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.wrapper'));
