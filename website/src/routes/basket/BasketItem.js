import React from "react";
import { List, Avatar } from "antd";

import { formatPrice } from "./helpers";

const BasketItem = ({
  id,
  image,
  name,
  description,
  price,
  quantity,
  removeProductFromBasket,
}) => (
  <List.Item
    actions={[
      <div
        key="list-remove-from-basket"
        onClick={() => removeProductFromBasket(id)}
      >
        Remove
      </div>,
    ]}
    style={{ paddingLeft: 10, paddingRight: 10 }}
  >
    <List.Item.Meta
      avatar={<Avatar src={image} />}
      title={name}
      description={description}
    />
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        minWidth: 200,
      }}
    >
      <div>x{quantity}</div>
      <div>£{formatPrice(price)}</div>
      <div style={{ fontWeight: "bold" }}>£{formatPrice(price * quantity)}</div>
    </div>
  </List.Item>
);

export default BasketItem;
