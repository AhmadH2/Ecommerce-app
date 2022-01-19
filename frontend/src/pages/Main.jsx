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
import Home from './Home';
import Categories from './Categories';
import Offers from './Offers';

const Main = () => {
  

  return (
    <div>
      {/* <Announcement /> */}
      {/* <Header /> */}
      {/* <Slider /> */}
      {/* <Categories /> */}
      {/* <Products /> */}
      <Router>
        <Header /> <br />
        <br />
        <Switch>
          <Route path='/products' component={Categories} />
          <Route path='/offers' exact component={Offers} />
          <Route path='/product/:productId' component={ProductDetails} />
          <Route path='/' exact component={Home} />
          <Route>404 Not Found!</Route>
        </Switch>
        <Feedback />
        <Footer />
      </Router>
    </div>
  );
};

export default Main;
