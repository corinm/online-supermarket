import React from "react";
import { Card, Statistic } from "antd";

import AddToBasket from "./AddToBasket";

const Product = ({ id, name, price, description, image, rating, basketId }) => {
  return (
    <Card cover={<img alt={name} src={image} style={{ height: 240 }} />}>
      <Card.Meta
        title={
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {name}
              </div>
              <Statistic value={price} prefix="£" precision={2} />
            </div>
            <AddToBasket id={id} basketId={basketId} />
          </>
        }
      />
    </Card>
  );
};

export default Product;
