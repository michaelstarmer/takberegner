import { 
  FETCH_ROOF_TYPES, 
  FETCH_ROOF_TYPES_SUCCESS,
  FETCH_ROOF_TYPES_FAILURE,
  SELECT_ROOF_TYPE,
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  error: null,
  all: null,
  selected: {
    id: null
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ROOF_TYPES:
      return { 
        ...state, 
        isFetching: true 
      };
    case FETCH_ROOF_TYPES_SUCCESS:
      return { 
        ...state,
        isFetching: false, 
        all: action.payload.roofs
      };
    case FETCH_ROOF_TYPES_FAILURE:
      return { 
        ...state,
        isFetching: false, 
        error: action.payload.error 
      };
    case SELECT_ROOF_TYPE:
      console.log('SELECT_ROOF_TYPE:', { payloadid: action.payload.id, selectedid: state.selected.id })
      return { 
        ...state,
        selected: (action.payload.id === state.selected.id) ? { id: null } : action.payload
      };
    default:
      return state;
  }
}