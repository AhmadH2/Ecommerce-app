import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setProducts, setLastQuery, setCategories, fetchProducts, getProducts, getProductsStarted } from "../redux/actions/productActions";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// const url = 'http://localhost:9000';

const ProductList = () => {

  const url = useSelector(state => state.productsReducer.url)
  const dispatch = useDispatch();
 
  const products = useSelector((state) => state.productsReducer.products);
  const isLoading = useSelector((state) => state.productsReducer.isLoading);

  useEffect(() => {
    // dispatch(getProducts(3));
  }, []);

  const handlePage = async (event, value) => {
    dispatch(getProductsStarted())
    localStorage.setItem('page', value);

    const lastQuery = localStorage.getItem('lastQuery'); 
    // if(lastQuery && lastQuery !== '') {
      const response = await axios
        .get(`${lastQuery}&page=${value}`)
        .catch((err) => {
          console.log('Err: ', err);
        });
      dispatch(setProducts(response.data));
    // }
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <div className='ui grid container'>
        {isLoading ? (
          <Box sx={{ display: 'flex'}}>
            <CircularProgress />
          </Box>
        ) : (
          products.map((product) => (
            <div className='four wide column' key={product.id}>
              <Link to={`/product/${product.id}`}>
                <ProductItem product={product} />
              </Link>
            </div>
          ))
        )}
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
