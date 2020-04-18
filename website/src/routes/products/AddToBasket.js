import React, { useState } from "react";
import { InputNumber, Button } from "antd";

import { addProductToBasket } from "../../services";

const AddToBasket = ({ id, basketId }) => {
  const [quantity, setQuantity] = useState(1);

  const onAddClick = () => addProductToBasket(basketId, id, quantity);

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
