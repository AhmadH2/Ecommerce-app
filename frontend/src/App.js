import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from './components/ProductList';
import Header from "./components/Header";
import "./App.css";
import ProductDetails from './components/ProductDetails';
import Footer from "./components/Footer";
import Feedback from "./components/Feedback";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
