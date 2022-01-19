import { ActionTypes } from "../constants/action-types";

const initialState = {
  url: 'http://localhost:9000',
  activeCat: { master: '', sub: '', type: '' },
  products: [],
  similarProducts: [],
  categories: [],
  subCat: [],
  articleTypes: [],
  product: {},
  brands: [],
  genders: [],
  colours: [],
  seasons: [],
  isLoading: false,
  error: null,
  hotProductsLists: []
};

export const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload, isLoading:false };
    case ActionTypes.GET_PRODUCTS_STARTED:
      return {...state, isLoading: true};
    case ActionTypes.GET_PRODUCTS_SUCCEEDED:
      return { ...state, isLoading: false, products: payload };
    case ActionTypes.SET_SIMILAR_PRODUCTS:
      return {...state, similarProducts:payload}
    default:
      return state;
  }
};

export const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: payload };
    case ActionTypes.SET_SUBCAT:
      return { ...state, subCat: payload };
    case ActionTypes.SET_ARTICLTYPE:
      return { ...state, articleTypes: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const pageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PAGE:
      return { ...state, page: payload };
    case ActionTypes.SET_LAST_QUERY:
      return { ...state, lastQuery: payload };
    case ActionTypes.SET_ACTIVE_CAT:
      return { ...state, activeCat: payload };
    default:
      return state;
  }
};

export const filtersReducer = (state = initialState, { type, payload}) => {
  switch (type) {
    case ActionTypes.SET_BRANDS:
      return { ...state, brands: payload };
    case ActionTypes.SET_GENDERS:
      return { ...state, genders: payload };
    case ActionTypes.SET_COLOURS:
      return { ...state, colours: payload };
    case ActionTypes.SET_SEASONS:
      return { ...state, seasons: payload };
    default:
      return state;
  }
}
