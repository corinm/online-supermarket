import React, { useState } from "react";
import { InputNumber, Button } from "antd";

// import { useAddProductToBasket } from "../../services";

const AddToBasket = ({ id }) => {
  const [quantity, setQuantity] = useState(1);

  const onAddClick = () => {
    // useAddProductToBasket(basketId, id, quantity);
  };

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
