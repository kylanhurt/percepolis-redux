import { dummy } from '../actions/entityNewActions';

const INITIAL_STATE = { preSubmitted: false, requesting: false};

//one type of action can trigger multiple reducers, if necessary

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {

    case "PRESUBMIT_ENTITY_PENDING":
      return { ...state, requesting: true, preSubmitted: false};
    case "PRESUBMIT_ENTITY_FULFILLED":
      return { ...state, requesting: false, preSubmitted: true};
    case "PRESUBMIT_ENTITY_REJECTED":
      return { ...state, requesting: false, preSubmitted: false};
  }

  return state;
}