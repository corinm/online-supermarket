package database

import (
	"backend/models"
)

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

func incrementQuantityInBasket(basket *models.Basket, productID int, quantity int) {
	for _, existingProduct := range basket.Products {
		if existingProduct.ID == productID {
			existingProduct.Quantity += quantity
			break
		}
	}
}

func addToBasket(basket *models.Basket, product *models.Product, quantity int) {
	product.Quantity = quantity
	basket.Products = append(basket.Products, product)
}

func removeFromBasket(basket *models.Basket, productID int) *models.Basket {
	for i, candidate := range basket.Products {
		if candidate.ID == productID {
			basket.Products = append(basket.Products[:i], basket.Products[i+1:]...)
		}
	}
	return basket
}
