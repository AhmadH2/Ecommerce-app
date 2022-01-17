import { ActionTypes } from '../constants/action-types';
import axios from 'axios';

export const getCategories = () => {
   return async (dispatch) => {
     const response = await axios.get(
       `http://localhost:9000/category`
     );
     dispatch({
       type: ActionTypes.SET_CATEGORIES,
       payload: response.data,
     });
   };
}

export const getSubCats = (category) => {
  const name = category.split(' ').join('-');
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:9000/category/subcats?category=${name}`);
    dispatch({
      type: ActionTypes.SET_SUBCAT,
      payload: response.data,
    });
  };
};

export const getArticleTypes = (subName) => {
  const name = subName.split(' ').join('-');
  return async (dispatch) => {
    const response = await axios.get(
      `http://localhost:9000/category/articles?name=${name}`
    );
    dispatch({
      type: ActionTypes.SET_ARTICLTYPE,
      payload: response.data,
    });
  };
};