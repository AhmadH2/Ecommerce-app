import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'
import {
  selectedProduct,
  removeSelectedProduct,
  setProducts, setSimilarProducts, getSimilarProducts
} from "../redux/actions/productActions";

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
    const { id, title, image, price, masterCategory, subCategory } = product;
    return (
      <div className='four wide column' key={product.id}>
        <Link to={`/product/${id}`}>
          <div className='ui link cards'>
            <div className='card'>
              <div className='image'>
                <img src={image} alt={title} />
              </div>
              <div className='content'>
                <div className='header'>{title}</div>
                <div className='meta price'>$ {price}</div>
                <div className='meta'>{masterCategory}, {subCategory}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return <>{renderList}</>;
}

export default SimilarProducts;