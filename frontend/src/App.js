import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from './components/ProductList';
import Header from "./components/Header";
import "./App.scss";
import ProductDetails from './components/ProductDetails';
import Footer from "./components/Footer";
import Feedback from "./components/Feedback";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
