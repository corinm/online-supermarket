import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import BasketContext from "../context/basket";

const Header = ({ location }) => {
  const { itemsInBasketCount } = useContext(BasketContext);

  return (
    <Layout.Header>
      <Menu mode="horizontal" theme="dark" selectedKeys={[location.pathname]}>
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/products">
          <Link to="/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="/basket">
          <Link to="/basket">
            Basket {itemsInBasketCount ? `(${itemsInBasketCount})` : null}
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default withRouter(Header);
