import { ActionTypes } from "../constants/action-types";

const intialState = {
  url: 'http://localhost:9000',
  page: 1,
  activeCat: {master:'', sub:''},
  products: [],
  categories: [],
  subCat: [],
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case ActionTypes.SET_PAGE:
      return {...state, page: payload}
    case ActionTypes.SET_ACTIVE_CAT:
      return {...state, activeCat: payload}
    default:
      return state;
  }
};

export const categoriesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: payload };
    case ActionTypes.SET_SUBCAT:
      return { ...state, subCat: payload };
    case ActionTypes.SET_PAGE:
      return { ...state, page: payload };
    case ActionTypes.SET_ACTIVE_CAT:
      return { ...state, activeCat: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};
