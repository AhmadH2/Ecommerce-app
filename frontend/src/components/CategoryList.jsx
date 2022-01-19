import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mobile } from '../responsive';
// import CategoryItem from './CategoryItem';
import axios from 'axios';
import { setCategories, setProducts, setSubCat, setPage, setActiveCat, setArticleType, setBrands, setLastQuery, getProducts, getProductsForCat, searchProducts } from '../redux/actions/productActions';
import { Button, colors } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { syncSetProducts } from '../redux/actions/asyncActionsCreater';
import { getBrands, getColours, getGenders, getSeasons } from '../redux/actions/filtersActions';
import { getArticleTypes, getCategories, getSubCats } from '../redux/actions/categoryActions';

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
  const activeCat = useSelector((state)=> state.pageReducer.activeCat);
  const articleTypes = useSelector(
    (state) => state.categoriesReducer.articleTypes
  );
  const brands = useSelector((state)=> state.filtersReducer.brands);
  const genders = useSelector((state) => state.filtersReducer.genders);
  const colours = useSelector((state) => state.filtersReducer.colours);
  const seasons = useSelector((state) => state.filtersReducer.seasons);

  const [filters, setFilters] = useState({});

  const getFilters = (category) => {
    const name = category.split(' ').join('-');
    dispatch(getColours(name));
    dispatch(getBrands(name));
    dispatch(getGenders(name));
    dispatch(getSeasons(name));
  }

  useEffect(() => {
    dispatch(getCategories())
  }, []);

  const handleActive = (key, value) => {
    localStorage.setItem('activeCat', value);
    if (key === 'master') {
      dispatch(setActiveCat({master: value, sub:'', type: ''}))
    }
    else if (key === 'sub') {
      dispatch(setActiveCat({...activeCat, sub:value, type:''}))
    }
    else
    dispatch(setActiveCat({...activeCat, type:value}));
  };

  const handleFilters = (filter, value) => {
    if (value === 'none') {
      let newFilter = {}
      Object.keys(filters)
        .filter((key) => key !== filter)
        .map((k) => (newFilter[k] = filters[k]));
      setFilters(newFilter); 
    }
    else
    setFilters({...filters, [filter]:value})
    
  }

  const applyFilters = () => {
    let query = Object.keys(filters).map(k => `${k}:${filters[k]}::`).join('');
    query =
      localStorage.getItem('activeCat') +
      '::' +
      query.substring(0, query.length - 2);
    dispatch(searchProducts(query,1));
  }

  return (
    <div>
      <Container>
        {categories.map((item) => (
          <Link key={item} to={'/products'}>
            {item === activeCat.master ? (
              <Button
                onClick={() => {
                  handleActive('master', item);
                  dispatch(getSubCats(item));
                  dispatch(setArticleType([]));
                  getFilters(item);
                  localStorage.setItem('page', 1);
                  dispatch(getProductsForCat(item.split(' ').join('-'), 1));
                  dispatch(setArticleType([]));
                }}
                color='secondary'
              >
                {item}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleActive('master', item);
                  dispatch(getSubCats(item));
                  dispatch(setArticleType([]));
                  getFilters(item);
                  localStorage.setItem('page', 1);
                  dispatch(getProductsForCat(item.split(' ').join('-'), 1));
                }}
              >
                {item}
              </Button>
            )}
          </Link>
        ))}
      </Container>
      <Container>
        {subCat.map((item) => (
          <Link key={item} to={'/products'}>
            {item === activeCat.sub ? (
              <Button
                onClick={() => {
                  localStorage.setItem('page', 1);
                  dispatch(getProductsForCat(item, 1));
                  handleActive('sub', item);
                  dispatch(getArticleTypes(item));
                  getFilters(item);
                }}
                color='secondary'
              >
                {item}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  dispatch(getProductsForCat(item, 1));
                  localStorage.setItem('page', 1);
                  handleActive('sub', item);
                  dispatch(getArticleTypes(item));
                  getFilters(item);
                }}
              >
                {item}
              </Button>
            )}
          </Link>
        ))}
      </Container>
      {brands.length >0 ? (<><Container>
        {articleTypes
          .filter((n) => n !== activeCat.master)
          .map((item) => (
            <Link key={item} to={'/products'}>
              {item === activeCat.type ? (
                <Button
                  onClick={() => {
                    handleActive('type', item);
                    localStorage.setItem('page', 1);
                    dispatch(getProductsForCat(item, 1));
                    getFilters(item);
                  }}
                  color='secondary'
                >
                  {item}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleActive('type', item);
                    localStorage.setItem('page', 1);
                    dispatch(getProductsForCat(item, 1));
                    getFilters(item);
                  }}
                >
                  {item}
                </Button>
              )}
            </Link>
          ))}
      </Container>
      <Container>
        Brand
        <select onChange={(e) => handleFilters('brand', e.target.value)}>
          <option defaultValue value={'none'}>
            None
          </option>
          {brands &&
            brands.map((bnd) => (
              <option key={bnd} value={bnd}>
                {bnd}
              </option>
            ))}
        </select>
        Colour
        <select onChange={(e) => handleFilters('colour', e.target.value)}>
          <option defaultValue value={'none'}>
            None
          </option>
          {colours &&
            colours.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
        Gender
        <select onChange={(e) => handleFilters('gender', e.target.value)}>
          <option defaultValue value={'none'}>
            None
          </option>
          {genders &&
            genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
        </select>
        Season
        <select onChange={(e) => handleFilters('season', e.target.value)}>
          <option defaultValue value={'none'}>
            None
          </option>
          {seasons &&
            seasons.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
        </select>
        <Button onClick={applyFilters} color='primary'>
          Apply Filters
        </Button>
      </Container></>) : <></>}
      
    </div>
  );
}
export default CategoryList;
