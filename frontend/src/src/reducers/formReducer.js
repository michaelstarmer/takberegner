import { UPDATE_MEASUREMENTS_FORM } from '../actions/types';

const INITIAL_STATE = {
  isUpdated: false,
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case UPDATE_MEASUREMENTS_FORM:
      console.log("Reducer updated from action:", action.type);
      return {
        ...state,
        isUpdated: true,
      }
    default:
      return state;
  }
};