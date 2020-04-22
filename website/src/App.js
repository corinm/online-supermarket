import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./routes/home/Home";
import Products from "./routes/products/Products";
import Basket from "./routes/basket/Basket";
import BasketContext from "./context/basket";
import { useBasket } from "./services/basket";

const { Footer } = Layout;

const App = () => {
  const basketContext = useBasket();

  return (
    <BasketContext.Provider value={{ ...basketContext }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
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
    </BasketContext.Provider>
  );
};

export default App;
