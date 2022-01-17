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
  align-items: center;
  margin-left: 25px;
  padding: 5px;
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
  const dispach = useDispatch();
  const url = useSelector((state) => state.productsReducer.url);
  const [searchValue, setSearchValue] = useState('');
  // const page = useSelector((state)=> state.productsReducer.page);

  const inputHandle = (event) => {
    setSearchValue(event.target.value);
  }
  const search = async () => {
    console.log(searchValue);
    // await axios
    //   .get(`${url}/search?q=${searchValue}&page=${page}`)
    //   .then((response) => dispach(setProducts(response.data)));
    // dispach(setLastQuery(`${url}/search?q=${searchValue}`));
    const page = localStorage.getItem('page');
    dispach(searchProducts(searchValue, page));
  };

  const quantity = 0;
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>Horyzat shop</Logo>
          {/* <Language>EN</Language> */}
          <SearchContainer>
            <Input placeholder='Search' onChange={inputHandle} />
            <Search style={{ color: 'gray', fontSize: 16 }} />
            <Button color='primary' onClick={search} type="submit">
              Search
            </Button>
          </SearchContainer>
        </Left>
        <Center>{/* <Logo>LAMA.</Logo> */}</Center>
        <Right>
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