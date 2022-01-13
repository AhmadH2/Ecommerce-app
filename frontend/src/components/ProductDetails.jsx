import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productActions";
import styled from 'styled-components';
import { Add, Remove } from '@material-ui/icons';
import Slider from "./Slider";


const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;


const FilterSizeOption = styled.option``;

const url = 'http://localhost:9000/fashion';

const ProductDetails = () => {
  
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { images, title, price, masterCategory, subCategory, brandName, description, sizes, crossLinks } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`${url}/${id}`)
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

   const handleQuantity = (type) => {
     if (type === 'dec') {
       quantity > 1 && setQuantity(quantity - 1);
     } else {
       setQuantity(quantity + 1);
     }
   };

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
                <Slider images={images} />
              </div>
              <div className='column rp'>
                <h1>{title}</h1>
                <h2>
                  <span className='ui teal tag label'>$ {price}</span>
                </h2>
                <h4 className='ui brown block header'>
                  Categories: {masterCategory}, {subCategory}
                  <br />
                  Brand Name: {brandName}
                </h4>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize>
                    {sizes?.map((s) => (
                      <FilterSizeOption key={s}>{s}</FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
                <br />
                <AmountContainer>
                  Quantity:
                  <Remove onClick={() => handleQuantity('dec')} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => handleQuantity('inc')} />
                </AmountContainer>{' '}
                <br />
                <div className='ui vertical animated button' tabIndex='0'>
                  <div className='hidden content'>
                    <i className='shop icon'></i>
                  </div>
                  <div className='visible content'>Add to Cart</div>
                </div>
                <h3>Description: </h3>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                <br />
                <h4>Cheak this links for simialer products:</h4>
                <ul>
                  {crossLinks.map((link) => (
                    <li>
                      <a href={'http://localhost:9000/search/'+link.value}>{link.key}</a>
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
