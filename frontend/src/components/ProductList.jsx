import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setProducts, setLastQuery, setCategories } from "../redux/actions/productActions";
import ProductComponent from "./ProductComponent";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// const url = 'http://localhost:9000';

const ProductList = () => {
    // const [currentPage, setCurrentPage] = useState(1);
  const url = useSelector(state => state.productsReducer.url)
  const products = useSelector((state) => state.productsReducer.products);
  const dispatch = useDispatch();
  const page = useSelector((state)=> state.productsReducer.page)
  const activeCat = useSelector((state) => state.productsReducer.activeCat);
  const getProducts = async () => {
    dispatch(setProducts([]));
    const response = await axios.get(`${url}/fashion/?page=${page}`).catch((err) => {
      console.log('Err: ', err);
    });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handlePage = async (event, value) => {
    dispatch(setPage(value))

    if (activeCat.sub !== '') {
      const response = await axios
        .get(
          `${url}/fashion/subcat/products?name=${activeCat.sub}&page=${value}`
        )
        .catch((err) => {
          console.log('Err: ', err);
        });
      dispatch(setProducts(response.data))
    }
    else if (activeCat.master !== '') {
      const reposnse = await axios
        .get(
          `${url}/fashion/category/products?name=${activeCat.master}&page=${value}`
        )
        .catch((err) => {
          console.log('Err: ', err);
        });
      dispatch(setProducts(reposnse.data))
    }
    else {
      getProducts()
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
            page={page}
            onChange={handlePage}
          />
        </Stack>
      </div>
    </div>
  );
};

export default ProductList;
