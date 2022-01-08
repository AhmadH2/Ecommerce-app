import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";

const url = 'http://localhost:9000/';


const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { image, title, price, category, description, sizes } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`http://localhost:9000/${id}`)
      .catch((err) => {
        console.log('Err: ', err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);
  return (
    <div className='ui grid container'>
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className='ui placeholder segment'>
          <div className='ui two column stackable center aligned grid'>
            <div className='ui vertical divider'>AND</div>
            <div className='middle aligned row'>
              <div className='column lp'>
                <img className='ui fluid image' src={image} />
              </div>
              <div className='column rp'>
                <h1>{title}</h1>
                <h2>
                  <a className='ui teal tag label'>$ {price}</a>
                </h2>
                <h3 className='ui brown block header'>{category}</h3>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                <div className='ui vertical animated button' tabIndex='0'>
                  <div className='hidden content'>
                    <i className='shop icon'></i>
                  </div>
                  <div className='visible content'>Add to Cart</div>
                </div>
                <br/>
                <div>
                  Available Sizes 
                  <select>
                    {sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
