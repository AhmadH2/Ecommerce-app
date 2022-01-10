import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mobile } from '../responsive';
// import CategoryItem from './CategoryItem';
import axios from 'axios';
import { setCategories, setProducts, setSubCat } from '../redux/actions/productsActions';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-evenly;
  ${mobile({ padding: '0px', flexDirection: 'column' })}
`;


const url = 'http://localhost:9000/fashion/';

const CategoryList = () => {
  
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const subCat = useSelector((state) => state.categoriesReducer.subCat);
  const dispatch = useDispatch();

  const getCategories = async () => {
    const response = await axios.get(url+'cats').catch((err) => {
      console.log('Err: ', err);
    });
    dispatch(setCategories(response.data));
  };

  const getProducts = async (catName) => {
    dispatch(setProducts([]));
    const response = await axios.get(url + `cats/${catName}`).catch((err) => {
      console.log('Err: ', err);
    });
    dispatch(setProducts(response.data));
  };

  const getSubCat = async (masterCat) => {
    const response = await axios
      .get(url + `subcats/${masterCat}`)
      .catch((err) => {
        console.log('Err: ', err);
      });
      dispatch(setSubCat(response.data))
  }

  const getProductsforSubCat = async (subCatName) => {
    dispatch(setProducts([]));
    const response = await axios.get(url +`subcats/${subCatName}/products`).catch(err => console.log(err));
    dispatch(setProducts(response.data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  console.log('categories :', categories);

  return (
    <div>
      <Container>
        {categories.map((item) => (
          <Link>
            <Button
              onClick={() => {
                getSubCat(item.name);
                getProducts(item.name);
              }}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </Container>
      <Container>
        {subCat.map((item) => (
          <Link>
            <Button onClick={()=> getProductsforSubCat(item)} >
              {item}
            </Button>
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default CategoryList;
