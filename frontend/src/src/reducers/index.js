import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import locationReducer from './locationReducer';
import roofTypeReducer from './roofTypeReducer';
import calcReducer from './calcReducer';

export default combineReducers({
  appLocation: locationReducer,
  roofs: roofTypeReducer,
  form: formReducer,
  calculations: calcReducer,
});