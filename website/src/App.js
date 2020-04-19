import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./routes/home/Home";
import About from "./routes/about/About";
import Products from "./routes/products/Products";
import Basket from "./routes/basket/Basket";

const { Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/basket">
          <Basket />
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
};

export default App;
