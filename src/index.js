import React from 'react';  
import ReactDOM from 'react-dom';  
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from 'redux';  
import { Router, browserHistory } from 'react-router';  
import reduxThunk from 'redux-thunk';  
import createLogger from 'redux-logger';
import routes from './routes';  
import reducers from './reducers/index';  
import { AUTH_USER } from './actions/types';
import cookie from 'react-cookie';
import css from './style.less'
// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);  
const store = createStoreWithMiddleware(reducers);

store.subscribe(() => {
	console.log('store change (from index.js)', store.getState());
})

const token = cookie.load('token');

if (token) {  
  store.dispatch({ type: AUTH_USER });
} else { //remove this clause
	store.dispatch({type: "UNAUTH_USER", payload: "unauth"}); //payload can be an OBJECT
}

ReactDOM.render(  
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.wrapper'));
