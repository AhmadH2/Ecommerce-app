import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";

import './list.scss';
import ProductItem from './ProductItem'

// import ListItem from "../listItem/ListItem";

// const Container = styled.div`
//   display: flex;
//   padding: 20px;
//   // border-bottom: 2px solid palevioletred;
//   justify-content: space-evenly;
//  }
// `;

const List = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const ListTitle = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 500;
  margin-left: 50px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const SliderArrow = styled.div`
  width: 50px;
  height: 100%;
  background-color: rgb(22, 22, 22, 0.5);
  color: white;
  position: absolute;
  z-index: 99;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
`;

const Left = styled.div`
  width: 50px;
  height: 100%;
  background-color: rgb(22, 22, 22, 0.5);
  color: white;
  position: absolute;
  z-index: 99;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  left: 0;
`;

const right = styled.div`
  width: 50px;
  height: 100%;
  background-color: rgb(22, 22, 22, 0.5);
  color: white;
  position: absolute;
  z-index: 99;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  right: 0;
`;

const Container = styled.div`
      margin-left: 50px;
      display: flex;
      margin-top: 10px;
      width: max-content;
      transform: translateX(0px);
      transition: all 1s ease;
    `
const Strike = styled.div`
  font-size: 4em;
  line-height: 1em;
  position: relative;
`;

const HotOffer = (props) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

  const [productsList, setProductsList] = useState([]);

  const searchProducts = async (searchValue) => {
    const response = await axios
      .get(`http://localhost:9000/search/discount?q=${searchValue}&page=${1}`)
      .catch((err) => console.log(err));
    setProductsList(response.data);
    console.log(productsList);
  };

  useEffect(() => {
    searchProducts(props.offer.value);
  }, [productsList]);

   const handleClick = (direction) => {
     setIsMoved(true);
     let distance = listRef.current.getBoundingClientRect().x - 50;
     if (direction === 'left' && slideNumber > 0) {
       setSlideNumber(slideNumber - 1);
       listRef.current.style.transform = `translateX(${300 + distance}px)`;
     }
     if (direction === 'right' && slideNumber < productsList.length-3) {
       setSlideNumber(slideNumber + 1);
       listRef.current.style.transform = `translateX(${-300 + distance}px)`;
     }
   };

  return (
    <div className='list' style={{ marginBottom: 50 }}>
      <span className='listTitle' style={{marginLeft: 90}}>{props.offer.key}</span>
      <div className='wrapper'>
        <ArrowBackIosOutlined
          className='sliderArrow left'
          onClick={() => handleClick('left')}
          style={{ display: !isMoved && 'none' }}
        />
        <div className='container' ref={listRef}>
          {productsList.length !== 0 ? (
            <Container>
              {productsList.map((product) => (
                <div key={product.id} style={{ marginRight: 10 }}>
                  <Link to={`/product/${product.id}`}>
                    <ProductItem product={product} />
                  </Link>
                </div>
              ))}
            </Container>
          ) : (
            <div>...loading</div>
          )}
        </div>
        <ArrowForwardIosOutlined
          className='sliderArrow right'
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}

export default HotOffer;