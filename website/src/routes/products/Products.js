import React from "react";
import Product from "./Product";
import { Col, Row } from "antd";

import { useLoadProducts } from "../../services";

const Products = () => {
  const products = useLoadProducts();

  return (
    <div className="Products">
      <Row gutter={[16, 16]} justify="space-around">
        {products.map((product, i) => (
          <Col xs={2} sm={24} md={8} lg={6} xl={6} key={i}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
