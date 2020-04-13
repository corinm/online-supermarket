import React from "react";
import { Card, Statistic } from "antd";
import { Link } from "react-router-dom";

const Product = ({ id, name, price, description, image, rating }) => {
  return (
    <Link to={`/products/${id}`}>
      <Card
        hoverable
        cover={<img alt={name} src={image} style={{ height: 240 }} />}
      >
        <Card.Meta
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {name}
              </div>
              <Statistic value={price} prefix="£" precision={2} />
            </div>
          }
          // description={description}
          // style={{ height: 60 }}
        />
      </Card>
    </Link>
  );
};

export default Product;
