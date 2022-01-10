import { combineReducers } from "redux";
import { productsReducer, categoriesReducer, selectedProductsReducer } from "./productsReducer";

const reducers = combineReducers({
  productsReducer: productsReducer,
  categoriesReducer: categoriesReducer,
  product: selectedProductsReducer,
});
export default reducers;
