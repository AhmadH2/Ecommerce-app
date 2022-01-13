import {useDispatch} from 'react-redux';
import { setProducts } from './productActions';
import axios from 'axios';

export function syncSetProducts (url) {
  return  function (dispatch) {
    return fetch(url).then((response) => {
      if (response.ok) {
        console.log(response.data)
        dispatch(setProducts(response.data));
      }
    });
  };
}