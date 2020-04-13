import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

const Product = ({ id, name, price, description, image, rating }) => {
  return (
    <Link to={`/products/${id}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={name} src={image} />}
      >
        <Card.Meta title={name} description={description} />
      </Card>
    </Link>
  )
}

export default Product
