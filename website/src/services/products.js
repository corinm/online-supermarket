import { useState, useEffect } from "react";

const fetchProducts = async () => {
  const res = await fetch("http://localhost:8000/products");
  const data = res.json();
  return data;
};

export const useProducts = () => {
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
