package database

import "backend/models"

func getBasket(baskets []*models.Basket, basketID int) *models.Basket {
	var basket *models.Basket

	for _, candidate := range baskets {
		if candidate.ID == basketID {
			basket = candidate
		}
	}

	return basket
}

func isProductInBasket(basket *models.Basket, productID int) bool {
	for _, product := range basket.Products {
		if product.ID == productID {
			return true
		}
	}
	return false
}

func incrementQuantityInBasket(basket *models.Basket, productID int) {
	for _, existingProduct := range basket.Products {
		if existingProduct.ID == productID {
			existingProduct.Quantity++
			break
		}
	}
}

func addOneToBasket(basket *models.Basket, product *models.Product) {
	product.Quantity = 1
	basket.Products = append(basket.Products, product)
}
