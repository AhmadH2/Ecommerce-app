import { ActionTypes } from '../constants/action-types';
import axios from 'axios';

export const getColours = (category) => {
  return async (dispatch) => {
    const response = await axios
      .get(`http://localhost:9000/filter/colour?category=${category}`)
      .catch((err) => console.log(err));
    dispatch({
        type: ActionTypes.SET_COLOURS,
        payload: response.data
    })
  }
}

export const getBrands = (category) => {
  return async (dispatch) => {
    const response = await axios
      .get(`http://localhost:9000/filter/brand?category=${category}`)
      .catch((err) => console.log(err));;
    dispatch({
      type: ActionTypes.SET_BRANDS,
      payload: response.data,
    });
  };
};

export const getGenders = (category) => {
  return async (dispatch) => {
    const response = await axios
      .get(`http://localhost:9000/filter/gender?category=${category}`)
      .catch((err) => console.log(err));;
    dispatch({
      type: ActionTypes.SET_GENDERS,
      payload: response.data,
    });
  };
};

export const getSeasons = (category) => {
  return async (dispatch) => {
    const response = await axios
      .get(`http://localhost:9000/filter/season?category=${category}`)
      .catch((err) => console.log(err));
    dispatch({
      type: ActionTypes.SET_SEASONS,
      payload: response.data,
    });
  };
};

export const getOffers = (query='off:off') => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_PRODUCTS_STARTED });
    localStorage.setItem(
      'lastQuery',
      `http://localhost:9000/filter/discount?q=${query}`
    );
    const response = await axios
      .get(`http://localhost:9000/filter/discount?q=${query}&page=1`)
      .catch((err) => console.log(err));

    dispatch({
      type: ActionTypes.GET_PRODUCTS_SUCCEEDED,
      payload: response.data,
    });
  };
};
