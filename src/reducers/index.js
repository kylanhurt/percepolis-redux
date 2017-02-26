import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';  
import authReducer from './auth_reducer';
import entityReducer from './entity_reducer';
import entityNewReducer from './entity_new_reducer';

const rootReducer = combineReducers({  
  auth: authReducer,
  form: formReducer,
  entity: entityReducer,
  entityNew: entityNewReducer
});

export default rootReducer; 