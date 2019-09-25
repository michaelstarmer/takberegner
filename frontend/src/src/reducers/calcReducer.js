import { 
  FETCH_ROOF_ESTIMATES,
  FETCH_ROOF_ESTIMATES_SUCCESS,
  FETCH_ROOF_ESTIMATES_FAILURE,
  FETCH_MATERIAL_ESTIMATES,
  FETCH_MATERIAL_ESTIMATES_SUCCESS,
  FETCH_MATERIAL_ESTIMATES_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  isUpdated: false,
  isFetching: false,
  isFailure: false,
  roof: {
    base_area: null,
    true_roof_area: null,
    pitch: null,
  },
  materials: []
};

export default (state = INITIAL_STATE, action) => {

  console.log("Reducer updated from action:", action.type);
  switch (action.type) {
    case FETCH_ROOF_ESTIMATES:
      return {
        ...state,
        isUpdated: false,
        isFetching: true,
      }
    case FETCH_ROOF_ESTIMATES_SUCCESS:
      console.log("Action payload calc:", action.payload)
      return {
        ...state,
        isUpdated: true,
        isFetching: false,
        roof: action.payload.data
      }
    case FETCH_ROOF_ESTIMATES_FAILURE:
      return {
        isUpdated: false,
        isFetching: false,
        isFailure: true,
        error: action.payload,
      }
    case FETCH_MATERIAL_ESTIMATES:
      return {
        ...state,
        isUpdated: false,
        isFetching: true,
      }
    case FETCH_MATERIAL_ESTIMATES_SUCCESS:
      return {
        ...state,
        isUpdated: true,
        isFetching: false,
        materials: action.payload.data
      }
    case FETCH_MATERIAL_ESTIMATES_FAILURE:
      return {
        isUpdated: false,
        isFetching: false,
        isFailure: true,
        error: action.payload,
      }
    default:
      return state;
  }
};