import React, { useState } from "react";
import { Card, Statistic, InputNumber, Button } from "antd";

const AddToBasket = ({ id }) => {
  const [quantity, setQuantity] = useState(1);

  const onAddClick = () => console.log(id, quantity);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <InputNumber value={quantity} onChange={setQuantity} />
      <Button type="primary" onClick={onAddClick}>
        Add
      </Button>
    </div>
  );
};

const Product = ({ id, name, price, description, image, rating }) => {
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
            <AddToBasket id={id} />
          </>
        }
      />
    </Card>
  );
};

export default Product;
