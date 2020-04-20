import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./routes/home/Home";
import About from "./routes/about/About";
import Products from "./routes/products/Products";
import Basket from "./routes/basket/Basket";
import BasketIdContext from "./context/basket";
import { useGetBasketId } from "./services/basket";

const { Footer } = Layout;

const App = () => {
  const basketId = useGetBasketId();

  return (
    <BasketIdContext.Provider value={basketId}>
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
    </BasketIdContext.Provider>
  );
};

export default App;
