import React from "react";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Header = ({ location }) => (
  <Layout.Header>
    <Menu mode="horizontal" theme="dark" selectedKeys={[location.pathname]}>
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/products">
        <Link to="/products">Products</Link>
      </Menu.Item>
      <Menu.Item key="/basket">
        <Link to="/basket">Basket</Link>
      </Menu.Item>
    </Menu>
  </Layout.Header>
);

export default withRouter(Header);
