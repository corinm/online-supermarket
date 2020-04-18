import React from "react";
import Product from "./Product";
import { Col, Row } from "antd";

import { useFetchProducts, useCreateBasket } from "../../services";

const Products = () => {
  const products = useFetchProducts();
  const basketId = useCreateBasket();
  console.log({ basketId });

  return (
    <div className="Products">
      <Row gutter={[16, 16]} justify="space-around">
        {products.map((product, i) => (
          <Col xs={24} sm={24} md={8} lg={6} xl={6} key={i}>
            <Product {...product} basketId={basketId} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
