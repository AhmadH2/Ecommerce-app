

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HotOffer from '../components/HotOffer';

const productsListsInfo = [
  {
    key: 'Top Skin Care Products',
    value: 'skin-care::discount%20GE%2010',
  },
  {
    key: 'Women Clothes',
    value: 'kurtis::gender:women::discount%20GE%2010',
  },
  {
    key: 'Formal Shoes for Men',
    value: 'formal-shoes::gender:men::discount%20GE%2010',
  },
  {
    key: 'Sweat shirts for women',
    value: 'sweat-shirts::gender:women::discount%20GE%2010',
  },
  {
    key: 'Boxers for Men',
    value: 'boxers::gender:men',
  },
  {
    key: 'Women Bags',
    value: 'bags::gender:women::discount%20GE%2010',
  },
  {
    key: 'Accessories',
    value: 'accessories::gender:women::discount%20GE%2010',
  },
  {
    key: 'Top Fragrance',
    value: 'fragrance::discount%20GE%205',
  },
  {
    key: 'Sports Goods',
    value: 'sporting-goods::discount%20GE%205',
  },
  {
    key: 'Heels Shoes',
    value: 'heels::discount%20GE%2010',
  },
  {
    key: 'Top Jackets from ADIDAS',
    value: 'jackets::brand:adidas::gender:men::discount%20GE%2010',
  },
  {
    key: 'Indian Saree',
    value: 'saree::discount%20GE%2010',
  },
  {
    key: 'Sandals',
    value: 'sandal::discount%20GE%2010',
  },
  {
    key: 'Scarves',
    value: 'scarves::discount%20GE%2010',
  },
  {
    key: 'Night Wear',
    value: 'nightwear::gender:women::discount%20GE%2010',
  },
  {
    key: 'Jackets for Men',
    value: 'rain-jacket::gender:men::discount%20GE%2010',
  },
  {
    key: 'Jewellery',
    value: 'jewellery::discount GE 10',
  },
  {
    key: 'Make up',
    value: 'makeup::discount%20GE%2010',
  },
];


const Home = () => {

  useEffect(() => {}, [productsListsInfo]);
  
  return (
    <>
      {productsListsInfo.map((info) => (
        <HotOffer offer={info} />
      ))}
    </>
  );
};

export default Home;
