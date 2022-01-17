import { combineReducers } from "redux";
import { productsReducer, categoriesReducer, selectedProductsReducer, pageReducer, filtersReducer } from "./productReducer";

const reducers = combineReducers({
  productsReducer: productsReducer,
  categoriesReducer: categoriesReducer,
  product: selectedProductsReducer,
  pageReducer: pageReducer,
  filtersReducer: filtersReducer,
});
export default reducers;
