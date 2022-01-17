import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import {useSelector} from 'react-redux'

export const getProducts = (page=1) => {
  return async (dispatch) => {
    dispatch({type: ActionTypes.GET_PRODUCTS_STARTED});
    localStorage.setItem('lastQuery',  `http://localhost:9000/fashion?`);
    const response = await axios
      .get(`http://localhost:9000/fashion?&page=${page}`)
      .catch((err) => console.log(err));
    dispatch({
      type: ActionTypes.GET_PRODUCTS_SUCCEEDED,
      payload: response.data
    });
  }
};

export const getProductsForCat = (category, page) => {
  const name = category.split(' ').join('-');
  console.log('category: ', name);
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_PRODUCTS_STARTED });
    localStorage.setItem('lastQuery', `http://localhost:9000/fashion/products?category=${name}`);
    const response = await axios
      .get(
        `http://localhost:9000/fashion/products?category=${name}&page=${page}`
      )
      .catch((err) => console.log(err));
    dispatch({
      type: ActionTypes.GET_PRODUCTS_SUCCEEDED,
      payload: response.data,
    });
  };
};

export const getSimilarProducts = (urls) => {
  return async (dispatch) => {
    // dispatch({type: ActionTypes.GET_PRODUCTS_STARTED});
    let response = await axios
      .get(`http://localhost:9000/search/${urls[Object.keys(urls)[0]].value}`)
      .catch((err) => {
        console.log('Err: ', err);
      });
    if (response.data.length === 0) {
      response = await axios
        .get(`http://localhost:9000/search/${urls[Object.keys(urls)[1]].value}`)
        .catch((err) => {
          console.log('Err: ', err);
        });
    }
    dispatch({
      type: ActionTypes.SET_SIMILAR_PRODUCTS,
      payload: response.data
    });
  }
}

export const searchProducts = (searchValue, page=1) => {
  return async (dispatch) => {
    // dispatch({type: ActionTypes.GET_PRODUCTS_STARTED});
    localStorage.setItem('lastQuery', `http://localhost:9000/search?q=${searchValue}`);
    const response = await axios
      .get(`http://localhost:9000/search?q=${searchValue}&page=${page}`).catch(err => console.log(err));

    dispatch({
      type: ActionTypes.SET_PRODUCTS,
      payload: response.data,
    });
  };
};

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const setSimilarProducts = (products) => {
  return {
    type: ActionTypes.SET_SIMILAR_PRODUCTS,
    payload: products,
  };
};

export const setCategories = (categories) => {
  return {
    type: ActionTypes.SET_CATEGORIES,
    payload: categories,
  };
};

export const setSubCat = (categories) => {
  return {
    type: ActionTypes.SET_SUBCAT,
    payload: categories,
  };
};

export const setArticleType = (categories) => {
  return {
    type: ActionTypes.SET_ARTICLTYPE,
    payload: categories,
  };
};

export const setPage = (page) => {
  return {
    type: ActionTypes.SET_PAGE,
    payload: page
  }
};

export const setBrands = (brands) => {
  return {
    type: ActionTypes.SET_BRANDS,
    payload: brands,
  };
};

export const setActiveCat = (query) => {
  return {
    type: ActionTypes.SET_ACTIVE_CAT,
    payload: query,
  };
};

export const setLastQuery = (query) => {
  return {
    type: ActionTypes.SET_LAST_QUERY,
    payload: query,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const setColours = (colours) => {
  return {
    type: ActionTypes.SET_COLOURS,
    payload: colours,
  };
};

export const setGenders = (genders) => {
  return {
    type: ActionTypes.SET_GENDERS,
    payload: genders,
  };
};

export const setSeasons = (seasons) => {
  return {
    type: ActionTypes.SET_SEASONS,
    payload: seasons,
  };
};
