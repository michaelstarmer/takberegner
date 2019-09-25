import { 
  UPDATE_LOCATION,
  UPDATE_HOME_STATE, 
  FETCH_ROOF_TYPES,
  FETCH_ROOF_TYPES_SUCCESS,
  FETCH_ROOF_TYPES_FAILURE,
  SELECT_ROOF_TYPE,
  FETCH_ROOF_ESTIMATES,
  FETCH_ROOF_ESTIMATES_SUCCESS,
  FETCH_ROOF_ESTIMATES_FAILURE,
  FETCH_MATERIAL_ESTIMATES,
  FETCH_MATERIAL_ESTIMATES_SUCCESS,
  FETCH_MATERIAL_ESTIMATES_FAILURE,
} from './types';
import  api from '../api';
import qs from 'qs';

export const updateLocation = (location) => {
  return { type: UPDATE_LOCATION, payload: location };
}

export const updateHomeState = (isHome) => {
  return { type: UPDATE_HOME_STATE, payload: isHome };
}

export const updateSelectedRoofType = roof => {
  const currentItem = roof ? roof : null;
  return { type: SELECT_ROOF_TYPE,  payload: currentItem};
}

export const fetchRoofTypesSuccess = () => {
  console.log("Fetch succcess");
  return { type: FETCH_ROOF_TYPES_SUCCESS };
}

export const fetchRoofTypes = () => async (dispatch) => {

  dispatch({ type: FETCH_ROOF_TYPES });

  try {
    const response = await api.get('/v1/roofs');
    dispatch({ type: FETCH_ROOF_TYPES_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error fetching:", error);
    dispatch({ type: FETCH_ROOF_TYPES_FAILURE, error });
  }
}

export const selectRoofType = roof => {
  return { type: SELECT_ROOF_TYPE, payload: roof };
}

export const fetchRoofEstimates = (lengths, angles) => async (dispatch) => {

  dispatch({ type: FETCH_ROOF_ESTIMATES });

  console.log("CONVERTED:", {lengths, angles})

  const requestData = { lengths, angles };

  try {
    const response = await api.post('/v1/roofs/calculate/roof', requestData);
    dispatch({ type: FETCH_ROOF_ESTIMATES_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error fetching:", error);
    dispatch({ type: FETCH_ROOF_ESTIMATES_FAILURE, error });
  }
}

export const fetchMaterialEstimates = (lengths, angles) => async (dispatch) => {

  dispatch({ type: FETCH_MATERIAL_ESTIMATES });

  console.log("CONVERTED:", { lengths, angles })

  const requestData = { lengths, angles };

  try {
    const response = await api.post('/v1/roofs/calculate/materials', requestData);
    dispatch({ type: FETCH_MATERIAL_ESTIMATES_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error fetching:", error);
    dispatch({ type: FETCH_MATERIAL_ESTIMATES_FAILURE, error });
  }
}