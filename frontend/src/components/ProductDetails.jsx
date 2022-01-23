import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
  setProducts, setSimilarProducts, getSimilarProducts, getProducts, searchProducts
} from "../redux/actions/productActions";
import styled from 'styled-components';
import { Add, Remove } from '@material-ui/icons';
import Slider from "./Slider";
import {Link} from 'react-router-dom';
import SimilarProducts from "./SimilarProducts";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
  const {
    images,
    title,
    price,
    discountedPrice,
    masterCategory,
    subCategory,
    brandName,
    description,
    sizes,
    crossLinks,
    discountText,
  } = product;
  const dispatch = useDispatch();

  const getProductDetail = async (id) => {
    const response = await axios
      .get(`${url}/${id}`)
      .catch((err) => {
        console.log('Err: ', err);
      });
    await dispatch(selectedProduct(response.data));
    console.log(response.data)
  };

  useEffect(() => {
    if (productId && productId !== "") {
      getProductDetail(productId);
    } 

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
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
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
                  <span className='ui teal tag label'>
                    $ {discountedPrice}
                    {price !== discountedPrice && (
                      <span
                        className='strikethrough'
                        style={{ marginLeft: 10 }}
                      >
                        <span style={{ color: 'white' }}>$ {price}</span>
                      </span>
                    )}
                  </span>
                  {price !== discountedPrice && (
                    <div
                      dangerouslySetInnerHTML={{ __html: discountText }}
                      style={{
                        marginTop: 10,
                        color: '#383838',
                        fontWeight: 'initial',
                      }}
                    ></div>
                  )}
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
                    <li key={link.key}>
                      <Link
                        to={'/products'}
                        onClick={() => {
                          let q = link.value.replace('men women', 'unisex');
                          q = q.replace('?f=', '::');
                          localStorage.setItem('page', 1);
                          localStorage.setItem(
                            'lastQuery',
                            `http://localhost:9000/search?q=shoes`
                          );
                          dispatch(searchProducts(q, 1));
                        }}
                      >
                        {link.key}
                      </Link>

                      <br />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <h2 className='ui grid container' style={{ marginBottom: 10 }}>
        Similar Products:
      </h2>
      {crossLinks && <SimilarProducts urls={crossLinks} />}
    </div>
  );
};

export default ProductDetails;
