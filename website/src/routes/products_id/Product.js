import React from 'react'
import { withRouter } from 'react-router'
import { Statistic, Spin, Row, Col } from 'antd'

import { useLoadProduct } from '../../services'

const Product = ({ location, match }) => {
  const id = match.params.id

  const product = useLoadProduct(id)

  if (!product) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </div>)
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>Product page: {product.name}</div>
            <Statistic value={parseFloat(product.rating)} suffix="/ 5" />
          </div>
          <div>{product.description}</div>
          <Statistic value={product.price} prefix="£" precision={2} />
        </Col>
        <Col span={12}>
          <img alt={product.name} src={product.image} style={{ maxHeight: 300 }} />
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(Product)