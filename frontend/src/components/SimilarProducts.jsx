import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'
import {
  selectedProduct,
  removeSelectedProduct,
  setProducts, setSimilarProducts, getSimilarProducts
} from "../redux/actions/productActions";
import ProductItem from './ProductItem';

const SimilarProducts = (props) => {

    const dispatch = useDispatch()

     useEffect(() => {

    if (props.urls && props.urls !== undefined) {
      dispatch(getSimilarProducts(props.urls)) 
    }
  }, []);

    const similarProducts = useSelector((state)=>  state.productsReducer.similarProducts);

    const renderList = similarProducts.length === 0 ? 
        <div>...Loading</div>
       : similarProducts.map((product) => {
    // const { id, title, image, price, masterCategory, subCategory } = product;
    return (
      <div
        className='four wide column'
        key={product.id}
        onClick={() => window.scrollTo(0, 0)}
      >
        <Link to={`/product/${product.id}`}>
          <ProductItem product={product} />
        </Link>
      </div>
    );
  });

  return <>{renderList}</>;
}

export default SimilarProducts;