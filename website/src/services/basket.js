import { useState, useEffect } from "react";

const createBasket = async () => {
  const res = await fetch(`http://localhost:8000/baskets`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const addProductToBasket = async (basketId, productId, quantity) => {
  const res = await fetch(`http://localhost:8000/baskets/${basketId}/add`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: productId, quantity }),
  });
  const data = res.json();
  return data;
};

const removeProductFromBasket = async (basketId, productId) => {
  const res = await fetch(`http://localhost:8000/baskets/${basketId}/remove`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: productId }),
  });
  const data = res.json();
  return data;
};

const countProducts = (products = []) => {
  return products.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
};

const sum = (products = []) => {
  return products.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);
};

export const useBasket = () => {
  const [basket, setBasket] = useState();
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [creating, setCreating] = useState(false);

  const addProductToBasketLocal = async (productId, quantity) => {
    const newBasket = await addProductToBasket(basket.id, productId, quantity);
    setBasket(newBasket);
  };

  const removeProductFromBasketLocal = async (productId) => {
    const newBasket = await removeProductFromBasket(basket.id, productId);
    setBasket(newBasket);
  };

  useEffect(() => {
    const createBasketLocal = async () => {
      const newBasket = await createBasket();
      setBasket(newBasket);
      setCreating(false);
    };

    if (!basket & !creating) {
      setCreating(true);
      createBasketLocal();
    }
  }, [basket, creating]);

  useEffect(() => {
    if (basket && basket.products) {
      setCount(countProducts(basket.products));
    }
  }, [basket]);

  useEffect(() => {
    if (basket && basket.products) {
      setTotal(sum(basket.products));
    }
  }, [basket]);

  return {
    basket,
    itemsInBasketCount: count,
    totalPrice: total,
    addProductToBasket: addProductToBasketLocal,
    removeProductFromBasket: removeProductFromBasketLocal,
  };
};
