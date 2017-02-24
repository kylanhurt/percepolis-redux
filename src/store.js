import {applyMiddleware, createStore, compose} from 'redux';
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers/index';

const logger = createLogger();
const createStoreWithMiddleware = compose(applyMiddleware(promise(), reduxThunk, logger))(createStore);  
export const store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
