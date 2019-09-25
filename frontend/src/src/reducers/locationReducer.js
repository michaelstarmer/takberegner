import { UPDATE_LOCATION, UPDATE_HOME_STATE } from '../actions/types';

const INITIAL_STATE = {
  isPageLanding: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { ...state, currentLocation: action.payload.location };
    case UPDATE_HOME_STATE:
      return { ...state, isPageLanding: action.payload };
    default:
      return state;
  }
}