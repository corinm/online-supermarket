import React, { useState } from "react";
import { InputNumber, Button } from "antd";

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

export default AddToBasket;
