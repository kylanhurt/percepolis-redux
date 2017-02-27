import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, PROTECTED_TEST, VALIDATE_EMAIL_FULFILLED } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false, duplicateEmail: false, email: null}

//one type of action can trigger multiple reducers, if necessary

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true, email: action.payload}; //start with destructuring, then overwrite property
    case UNAUTH_USER:
      return { ...state, authenticated: false, email: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case PROTECTED_TEST:
      return { ...state, content: action.payload };
    case VALIDATE_EMAIL_FULFILLED:
      let dupEmail = null;
      if(action.payload.email) {
        dupEmail = true;
      }
      return { ...state, duplicateEmail: dupEmail};
  }

  return state;
}