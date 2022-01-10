import { ActionTypes } from "../constants/action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
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
