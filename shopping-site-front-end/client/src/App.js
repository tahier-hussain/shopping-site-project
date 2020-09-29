import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Product from "./components/Product";
import Category from "./components/Category";
import PlacedOrders from "./components/PlacedOrders";
import MyCart from "./components/MyCart";
import MyOrders from "./components/MyOrders";

class App extends Component {
  state = {
    loggedIn: false,
    userType: "admin",
    userDetails: JSON.parse(localStorage.getItem("user-details"))
  };
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/products" component={Product} exact />
          <Route path="/categories" component={Category} exact />
          <Route path="/placed-orders" component={PlacedOrders} exact />
          <Route path="/mycart" component={MyCart} exact />
          <Route path="/myorders" component={MyOrders} exact />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
