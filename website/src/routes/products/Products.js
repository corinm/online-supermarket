import React from 'react'
import Product from './Product'
import { Col, Row } from 'antd'

import { useLoadProducts } from '../../services'

const Products = () => {
  const products = useLoadProducts()

  return (
    <div className="Products">
      <Row gutter={16}>
        {products.map((product, i) => (
          <Col span={8} key={i}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Products