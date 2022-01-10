import React from 'react';
// import Announcement from '../components/Announcement';
// import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Feedback from '../components/Feedback';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Products from '../components/Products';
// import Slider from '../components/Slider';
import ProductDetails from '../components/ProductDetails';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';

const Home = () => {
  return (
    <div>
      {/* <Announcement /> */}
      {/* <Header /> */}
      {/* <Slider /> */}
      {/* <Categories /> */}
      {/* <Products /> */}
      <Router>
        <Header />
        <CategoryList />
        <Switch>
          <Route path='/' exact component={ProductList} />
          <Route path='/product/:productId' component={ProductDetails} />
          <Route>404 Not Found!</Route>
        </Switch>
        <Feedback />
        <Footer />
      </Router>
    </div>
  );
};

export default Home;
