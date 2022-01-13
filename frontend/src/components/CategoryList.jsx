import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mobile } from '../responsive';
// import CategoryItem from './CategoryItem';
import axios from 'axios';
import { setCategories, setProducts, setSubCat, setPage, setActiveCat, setArticleType } from '../redux/actions/productActions';
import { Button, colors } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { syncSetProducts } from '../redux/actions/asyncActionsCreater';

const Container = styled.div`
  display: flex;
  padding: 20px;
  // border-bottom: 2px solid palevioletred;
  justify-content: space-evenly;
  ${mobile({ padding: '0px', flexDirection: 'column' })}`;

const url = 'http://localhost:9000';

const CategoryList = () => {
  
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const subCat = useSelector((state) => state.categoriesReducer.subCat);
  const page = useSelector((state)=> state.categoriesReducer.page);
  const activeCat = useSelector((state)=> state.categoriesReducer.activeCat);
  const articleTypes = useSelector(
    (state) => state.categoriesReducer.articleTypes
  );

  const getCategories = async () => {
    const response = await axios.get(url + '/category').catch((err) => {
      console.log('Err: ', err);
    });
    dispatch(setCategories(response.data));
  };

  const getSubCat = async (masterCat) => {
    const response = await axios.get(`${url}/category/${masterCat}/subcats`)
      .catch((err) => {
        console.log('Err: ', err);
      });
      dispatch(setSubCat(response.data))
  };

  const getArticleType = async (subName) => {
    const response = await axios
      .get(url + `/category/articles?name=${subName}`)
      .catch((err) => {
        console.log('Err: ', err);
      });
    dispatch(setArticleType(response.data));
  };

  const getProductsforCat = async (catName) => {
    dispatch(setProducts([]));
    dispatch(setPage(1));
    const response = await axios
      .get(`${url}/fashion/category/products?name=${catName}&page=${1}`)
      .catch((err) => {
        console.log('Err: ', err);
      });
    const myUrl = `${url}/fashion/category/${catName}/products?page=${1}`;
    dispatch(setProducts(response.data));
  };

  const getProductsforSubCat = async (subCatName) => {
    dispatch(setProducts([]));
    dispatch(setPage(1));
    const response = await axios
      .get(`${url}/fashion/subcat/products?name=${subCatName}&page=${1}`)
      .catch((err) => console.log(err));
    dispatch(setProducts(response.data));
  }

  const getProductsforArticleType = async (typeName) => {
    dispatch(setProducts([]));
    dispatch(setPage(1));
    const name = typeName.split(' ').join('-');
    const response = await axios
      .get(`${url}/fashion/article/products?page=${1}&name=${name}`)
      .catch((err) => console.log(err));
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleActive = (key, value) => {
    if (key === 'master') {
      dispatch(setActiveCat({master: value, sub:''}))
    } else
    dispatch(setActiveCat({...activeCat, [key]:value}));
  };

  return (
    <div>
      <Container>
        {categories.map((item) => (
          <Link key={item} to={'/'}>
            {item === activeCat.master ? (
              <Button
                onClick={() => {
                  handleActive('master', item);
                  getSubCat(item);
                  getProductsforCat(item);
                }}
                color='secondary'
              >
                <Link key={item} to={'/'}>
                  {item}
                </Link>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleActive('master', item);
                  getSubCat(item);
                  getProductsforCat(item);
                }}
              >
                <Link key={item} to={'/'}>
                  {item}
                </Link>
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
                  getArticleType(item);
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
                  getArticleType(item);
                }}
              >
                {item}
              </Button>
            )}
          </Link>
        ))}
      </Container>

      <Container>
        {articleTypes.map((item) => (
          <Link key={item} to={'/'}>
            {item === activeCat.sub ? (
              <Button
                onClick={() => {
                  handleActive('sub', item);
                  getProductsforArticleType(item);
                }}
                color='secondary'
              >
                {item}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleActive('sub', item);
                  getProductsforArticleType(item);
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
}
export default CategoryList;
