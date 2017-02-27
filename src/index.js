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
const userEmail = cookie.load('email');

if (token) {  
	console.log('there IS a token')
  store.dispatch({ type: "AUTH_USER", payload: userEmail });
} else { //remove this clause
	console.log('there is no token')
	store.dispatch({type: "UNAUTH_USER"}); //payload can be an OBJECT
}



ReactDOM.render(  
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.wrapper'));
