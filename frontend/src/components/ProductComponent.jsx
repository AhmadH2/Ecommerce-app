import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";

const ProductComponent = () => {
  const products = useSelector((state) => state.productsReducer.products);
  const isLoading = useSelector((state) => state.productsReducer.isLoading);

  // useEffect(()=> {
  //   fetchProducts('', 1);
  // },[])
  
  const renderList = products.length ===0 ? 
        <div>...Loading</div>
       :  products.map((product) => {
    const { id, title, image, price, masterCategory, subCategory } = product;
    return (
      <div className='four wide column' key={id}>
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
};

export default ProductComponent;
