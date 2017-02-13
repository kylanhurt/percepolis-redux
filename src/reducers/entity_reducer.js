import { FETCH_ENTITIES_PENDING,  
         FETCH_ENTITIES_FULFILLED,
         FETCH_ENTITIES_REJECTED} from '../actions/types';

const INITIAL_STATE = { homeTableEntities: [], requesting: false, received: false, error: null};

//one type of action can trigger multiple reducers, if necessary

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {

    case FETCH_ENTITIES_PENDING:
      return { ...state, requesting: true};

    case FETCH_ENTITIES_FULFILLED:
      return {...state, requesting: false, homeTableEntities: action.payload, received: true, error: null};

    case FETCH_ENTITIES_REJECTED:
      return {...state, requesting: false, received: false, error: action.payload.message };
  }

  return state;
}