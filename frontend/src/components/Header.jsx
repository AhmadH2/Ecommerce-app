import React, { useState } from "react";

import { Badge, Button } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
// import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { searchProducts, setLastQuery, setPage, setProducts } from "../redux/actions/productActions";
import { getColours, getBrands, getGenders, getSeasons, getOffers } from "../redux/actions/filtersActions";
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 20vw;
  top: 1vw;
  // align-items: center;
  margin-left: 25px;
  // margin: 10px;
`;

const SearchInput = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  // margin-left: 25px;
  padding: 5px;
`;

const SearchSuggestions = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  position: obsolute;
  flex-direction: column;
  width: 100%
  align-items: center;
  // margin-left: 25px;
  padding: 5px;
  z-index: 1;
`;

const Input = styled.input`
  border: 1px solid grey;
  height: 25px;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Header = () => {
  // const quantity = useSelector(state=>state.cart.quantity)
  const dispatch = useDispatch();
  const url = useSelector((state) => state.productsReducer.url);
  const [searchValue, setSearchValue] = useState('');
  // const page = useSelector((state)=> state.productsReducer.page);
  const [suggestios, setSuggestions] = useState([]);
  const history = useHistory();
  const getSuggestions = (term) => {
    axios.get(`http://localhost:9000/search/suggest/${term}`).then((res)=> setSuggestions(res.data))
  }
  const inputHandle = (event) => {
    setSearchValue(event.target.value);
    getSuggestions(event.target.value);
  }

    const getFilters = (category) => {
      const name = category.split(' ').join('-');
      dispatch(getColours(name));
      dispatch(getBrands(name));
      dispatch(getGenders(name));
      dispatch(getSeasons(name));
    };
    
  const search = async (term=searchValue) => {
    // setSearchValue('');

    localStorage.setItem('activeCat', term);
    setSuggestions([])
    const page = localStorage.getItem('page');
    dispatch(searchProducts(term, page));
    getFilters(term);
    history.push('/products');
    
  };

  const quantity = 0;
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to={'/'}>
            <Logo>Horyzat shop</Logo>
          </Link>
          {/* <Language>EN</Language> */}
          <SearchContainer>
            <SearchInput>
              <Input
                placeholder='Search'
                onChange={inputHandle}
                value={searchValue}
              />
              <Search style={{ color: 'gray', fontSize: 16 }} />
              <Button color='primary' onClick={() => search()} type='submit'>
                Search
              </Button>
            </SearchInput>

            <SearchSuggestions>
              {suggestios.length > 0 ? (
                suggestios.map((s) => (
                  <Link
                    style={{ backgroundColor: 'whitesmoke' }}
                    onClick={() => {
                      search(s);
                      setSearchValue(s);
                      setSuggestions([]);
                    }}
                  >
                    <Button>{s}</Button>
                    {/* <hr /> */}
                  </Link>
                ))
              ) : (
                <span></span>
              )}
            </SearchSuggestions>
          </SearchContainer>
        </Left>
        <Center>{/* <Logo>LAMA.</Logo> */}</Center>
        <Right>
          <Link to={'/products'}>
            <MenuItem>Categories</MenuItem>
          </Link>
          <Link to={'/offers'}>
            <MenuItem>Hot-Offers</MenuItem>
          </Link>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to='/cart'>
            <MenuItem>
              <Badge badgeContent={quantity} color='primary'>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;