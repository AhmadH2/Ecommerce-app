import { ActionTypes } from "../constants/action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const getProducts = () => {
  return {
    type: ActionTypes.GET_PRODUCTS,
  }
}

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

export const setPage = (page) => {
  return {
    type: ActionTypes.SET_PAGE,
    payload: page
  }
};

export const setActiveCat = (query) => {
  return {
    type: ActionTypes.SET_ACTIVE_CAT,
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
