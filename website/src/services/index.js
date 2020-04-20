import { useState, useEffect } from "react";

const fetchProducts = async () => {
  const res = await fetch("http://localhost:8000/products");
  const data = res.json();
  return data;
};

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    loadProducts();
  }, []);

  return products;
};

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

export const useCreateBasket = () => {
  const [basketId, setBasketId] = useState();

  useEffect(() => {
    const fetchBasketId = async () => {
      const basketId = await createBasket();
      setBasketId(basketId);
    };

    fetchBasketId();
  }, []);

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
  return { ...data, products: data.products || [] };
};

export const useFetchBasketById = (id) => {
  const [basket, setBasket] = useState();

  useEffect(() => {
    const loadBasket = async () => {
      const basket = await fetchBasketById(id);
      setBasket(basket);
    };

    loadBasket();
  }, [id]);

  return basket;
};
