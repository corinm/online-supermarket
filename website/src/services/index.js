import { useState, useEffect } from 'react'

const fetchProducts = async () => {
  const res = await fetch('http://localhost:8000/products')
  const data = res.json()
  return data
}

const fetchProductById = async (id) => {
  const res = await fetch(`http://localhost:8000/products/${id}`)
  const data = res.json()
  return data
}

export const useLoadProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts()
      setProducts(products)
    }

    loadProducts()
  }, [])

  return products
}

export const useLoadProduct = (id) => {
  const [product, setProduct] = useState()

  useEffect(() => {
    const loadProduct = async () => {
      const product = await fetchProductById(id)
      setProduct(product)
    }

    loadProduct()
  }, [id])

  return product
}