import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mobile } from '../responsive';
// import CategoryItem from './CategoryItem';
import axios from 'axios';
import { setCategories, setProducts, setSubCat, setPage, setActiveCat } from '../redux/actions/productActions';
import { Button, colors } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  padding: 20px;
  // border-bottom: 2px solid palevioletred;
  justify-content: space-evenly;
  ${mobile({ padding: '0px', flexDirection: 'column' })}
`;

const url = 'http://localhost:9000';

const CategoryList = () => {
  
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const subCat = useSelector((state) => state.categoriesReducer.subCat);
  const page = useSelector((state)=> state.categoriesReducer.page);
  // const [active, setActive] = useState({master:"", sub:""});
  const activeCat = useSelector((state)=> state.categoriesReducer.activeCat);

  const getCategories = async () => {
    const response = await axios.get(url + '/category').catch((err) => {
      console.log('Err: ', err);
    });
    dispatch(setCategories(response.data));
  };

  const getProductsforCat = async (catName) => {
    dispatch(setProducts([]));
    dispatch(setPage(1));
    const response = await axios
      .get(`${url}/fashion/category/${catName}/products?page=${page}`)
      .catch((err) => {
        console.log('Err: ', err);
      });
    dispatch(setProducts(response.data));
  };

  const getSubCat = async (masterCat) => {
    const response = await axios
      .get(url + `/category/${masterCat}/subcats`)
      .catch((err) => {
        console.log('Err: ', err);
      });
      dispatch(setSubCat(response.data))
  }

  const getProductsforSubCat = async (subCatName) => {
    dispatch(setPage(1));
    dispatch(setProducts([]));
    const response = await axios
      .get(`${url}/fashion/subcat/${subCatName}/products?page=${page}`)
      .catch((err) => console.log(err));
    dispatch(setProducts(response.data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleActive = (key, value) => {
    dispatch(setActiveCat({...activeCat, [key]:value}));
  }

  return (
    <div>
      <Container>
        {categories.map((item) => (
          <Link key={item.name} to={'/'}>
            {item.name === activeCat.master ? (
              <Button
                onClick={() => {
                  getSubCat(item.name);
                  getProductsforCat(item.name);
                  handleActive('master', item.name);
                }}
                color='secondary'
              >
                {item.name}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  getSubCat(item.name);
                  getProductsforCat(item.name);
                  handleActive('master', item.name);
                }}
              >
                {item.name}
              </Button>
            )}
          </Link>
        ))}
      </Container>

      <Container>
        {subCat.map((item) => (
          <Link key={item} to={'/'}>
            {item === activeCat.sub ? (
              <Button
                onClick={() => {
                  getProductsforSubCat(item);
                  handleActive('sub', item);
                }}
                color='secondary'
              >
                {item}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  getProductsforSubCat(item);
                  handleActive('sub', item);
                }}
              >
                {item}
              </Button>
            )}
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default CategoryList;
