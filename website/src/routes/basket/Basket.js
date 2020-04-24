import React, { useContext } from "react";
import { List, Avatar } from "antd";

import BasketItem from "./BasketItem";
import BasketContext from "../../context/basket";
import { formatPrice } from "./helpers";

const isProductsInBasket = (basket) =>
  !!(basket.products && basket.products.length > 0);

const Basket = () => {
  const { basket, totalPrice, removeProductFromBasket } = useContext(
    BasketContext
  );

  if (!basket) {
    return <div>Loading</div>;
  }

  if (!isProductsInBasket(basket)) {
    return <div>Basket empty</div>;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={basket.products}
      header={
        <List.Item
          actions={[<div key="list-remove-from-basket">Hide me</div>]}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        >
          <List.Item.Meta
            avatar={<Avatar src="placeholder" />}
            title="placeholder"
            description="placeholder"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: 200,
            }}
          >
            <div>Quantity</div>
            <div>£/item</div>
            <div style={{ fontWeight: "bold" }}>Total £</div>
          </div>
        </List.Item>
      }
      renderItem={(item) => (
        <BasketItem
          {...item}
          removeProductFromBasket={removeProductFromBasket}
        />
      )}
      footer={
        <List.Item
          actions={[<div key="list-remove-from-basket">Hide me</div>]}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        >
          <List.Item.Meta
            avatar={<Avatar src="placeholder" />}
            title="placeholder"
            description="placeholder"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: 200,
            }}
          >
            <div></div>
            <div></div>
            <div style={{ fontWeight: "bold" }}>£{formatPrice(totalPrice)}</div>
          </div>
        </List.Item>
      }
    />
  );
};

export default Basket;
