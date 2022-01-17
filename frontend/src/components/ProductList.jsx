import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setProducts, setLastQuery, setCategories, fetchProducts, getProducts } from "../redux/actions/productActions";
import ProductComponent from "./ProductComponent";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// const url = 'http://localhost:9000';

const ProductList = () => {

  const url = useSelector(state => state.productsReducer.url)
  const dispatch = useDispatch();
  const page = useSelector((state)=> state.pageReducer.page)
  // const lastQuery = useSelector((state) => state.pageReducer.lastQuery);
 
  const products = useSelector(state => state.productsReducer.products)

  useEffect(() => {
    dispatch(getProducts(3));
  }, []);

  const handlePage = async (event, value) => {
    dispatch(setProducts([]))
    localStorage.setItem('page', value);

    const lastQuery = localStorage.getItem('lastQuery'); 
    if(lastQuery && lastQuery !== '') {
      const response = await axios
        .get(`${lastQuery}&page=${value}`)
        .catch((err) => {
          console.log('Err: ', err);
        });
      console.log(response.data);
      dispatch(setProducts(response.data));
    }
  }

  return (
    <div>
      <div className='ui grid container'>
        <ProductComponent />
      </div>
      <div
        className='ui grid container'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Stack spacing={2}>
          <Pagination
            count={10}
            shape='rounded'
            size='large'
            showFirstButton
            showLastButton
            page={parseInt(localStorage.getItem('page'))}
            onChange={handlePage}
          />
        </Stack>
      </div>
    </div>
  );
};

export default ProductList;
