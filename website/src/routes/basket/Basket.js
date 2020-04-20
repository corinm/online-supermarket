import React, { useContext } from "react";

import { useFetchBasketById } from "../../services/basket";
import BasketIdContext from "../../context/basket";

const Basket = () => {
  const basketId = useContext(BasketIdContext);
  const basket = useFetchBasketById(basketId);

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
            {basket.products.map((product) => (
              <div>{product.name}</div>
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
