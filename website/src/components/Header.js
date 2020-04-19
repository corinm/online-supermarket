import React, { useState } from "react";

import { Layout, Menu } from "antd";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const Header = ({ location }) => {
  const [active, setActive] = useState(location.pathname);

  return (
    <Layout.Header>
      <Menu
        mode="horizontal"
        theme="dark"
        onClick={(e) => setActive(e.key)}
        selectedKeys={[active]}
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/about">
          <Link to="/about">About</Link>
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
};

export default withRouter(Header);
