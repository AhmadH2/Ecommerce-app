import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
// import Pagination from '@mui/material/Pagination';
// import Pagination from 'react-js-pagination';

const url = 'http://localhost:9000/fashion';

const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector((state) => state.productsReducer.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get(url)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Products :", products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  return (
    <div>
      <div className='ui grid container'>
        <ProductComponent />
      </div>
      <div className='ui grid container paginationBox'>
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default ProductList;
