import React, { useState, useContext } from "react";
import { InputNumber, Button } from "antd";

import BasketContext from "../../context/basket";

const AddToBasket = ({ id }) => {
  const [quantity, setQuantity] = useState(1);
  const { addProductToBasket } = useContext(BasketContext);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <InputNumber value={quantity} onChange={setQuantity} />
      <Button type="primary" onClick={() => addProductToBasket(id, quantity)}>
        Add
      </Button>
    </div>
  );
};

export default AddToBasket;
