import React, { useContext } from "react";

import BasketContext from "../../context/basket";

const BasketItem = ({ id, name, quantity, onRemove }) => (
  <div style={{ display: "flex" }}>
    <div>{name}</div>
    <div>{quantity}</div>
    <div onClick={() => onRemove(id)}>Remove</div>
  </div>
);

const Basket = () => {
  const { basket, removeProductFromBasket } = useContext(BasketContext);

  if (!basket) {
    return <div>Loading</div>;
  }

  const isProductsInBasket = basket.products && basket.products.length > 0;

  return (
    <div>
      <div>Your basket</div>
      <div>
        {isProductsInBasket ? (
          <div>
            {basket.products.map((product, i) => (
              <BasketItem
                key={i}
                {...product}
                onRemove={removeProductFromBasket}
              />
            ))}
          </div>
        ) : (
          <div>No products</div>
        )}
      </div>
    </div>
  );
};

export default Basket;
