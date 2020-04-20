import { useState, useEffect } from "react";

export const createBasket = async () => {
  const res = await fetch(`http://localhost:8000/baskets`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.id;
};

export const useGetBasketId = () => {
  const [basketId, setBasketId] = useState();

  useEffect(() => {
    const fetchBasketId = async () => {
      const basketId = await createBasket();
      setBasketId(basketId);
    };

    if (!basketId) {
      fetchBasketId();
    }
  }, [basketId]);

  return basketId;
};

export const addProductToBasket = async (basketId, productId, quantity) => {
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

export const useAddProductToBasket = (basketId, productId, quantity) => {
  useEffect(() => {
    addProductToBasket(basketId, productId, quantity);
  }, [basketId, productId, quantity]);
};

const fetchBasketById = async (id) => {
  const res = await fetch(`http://localhost:8000/baskets/${id}`);
  const data = res.json();
  return data;
};

export const useFetchBasketById = (id) => {
  const [basket, setBasket] = useState();

  useEffect(() => {
    const loadBasket = async () => {
      const newBasket = await fetchBasketById(id);
      setBasket(newBasket);
    };

    loadBasket();
  }, [id]);

  return basket;
};
