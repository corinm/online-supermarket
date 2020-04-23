import React, { useContext } from "react";
import { List, Avatar } from "antd";

import BasketContext from "../../context/basket";

const BasketItem = ({ id, name, quantity, onRemove }) => (
  <div style={{ display: "flex" }}>
    <div>{name}</div>
    <div>{quantity}</div>
    <div onClick={() => onRemove(id)}>Remove</div>
  </div>
);

const formatPrice = (price = 0) => price.toFixed(2);

const isProductsInBasket = (basket) =>
  !!(basket.products && basket.products.length > 0);

const Basket = () => {
  const { basket, totalPrice, removeProductFromBasket } = useContext(
    BasketContext
  );

  // const basket = {
  //   id: 9,
  //   products: [
  //     {
  //       id: 1,
  //       name: "Beans",
  //       price: 0.5,
  //       description: "Some beans, in a tin",
  //       image:
  //         "http://www.uklockpickers.co.uk/media/catalog/product/cache/1/thumbnail/800x800/9df78eab33525d08d6e5fb8d27136e95/7/1/71opsei9val._sy550_.jpg",
  //       rating: 2,
  //       quantity: 1,
  //     },
  //     {
  //       id: 2,
  //       name: "Cheese",
  //       price: 2.3,
  //       description: "Cheese is life",
  //       image:
  //         "https://cdn.images.express.co.uk/img/dynamic/1/590x/Cheese-581812.jpg",
  //       rating: 4.5,
  //       quantity: 2,
  //     },
  //     {
  //       id: 3,
  //       name: "Wine",
  //       price: 6.5,
  //       description: "What keeps Corin alive",
  //       image:
  //         "https://cen.acs.org/content/cen/articles/92/i38/Taste-Wine-Science/_jcr_content/articlebody/subpar/articlemedia_1.img.jpg/1466566886115.jpg",
  //       rating: 4.8,
  //       quantity: 3,
  //     },
  //   ],
  // };

  if (!basket) {
    return <div>Loading</div>;
  }

  if (!isProductsInBasket(basket)) {
    return <div>No products</div>;
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
        <List.Item
          actions={[
            <div
              key="list-remove-from-basket"
              onClick={() => removeProductFromBasket(item.id)}
            >
              Remove
            </div>,
          ]}
          style={{ paddingLeft: 10, paddingRight: 10 }}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.image} />}
            title={item.name}
            description={item.description}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: 200,
            }}
          >
            <div>x{item.quantity}</div>
            <div>£{formatPrice(item.price)}</div>
            <div style={{ fontWeight: "bold" }}>
              £{formatPrice(item.price * item.quantity)}
            </div>
          </div>
        </List.Item>
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
