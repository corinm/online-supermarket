package database

import (
	"backend/models"
)

var (
	baskets []*models.Basket
	nextID  = 1
)

// CreateBasket creates a basket in the database and returns the id
func CreateBasket() models.Basket {
	basket := models.Basket{}
	basket.ID = nextID
	nextID++
	baskets = append(baskets, &basket)
	return basket
}

// GetBaskets returns a slice of pointers to baskets
func GetBaskets() []*models.Basket {
	return baskets
}

// GetBasketByID returns a basket from the database given its id
func GetBasketByID(id int) *models.Basket {
	var basket *models.Basket

	for _, candidate := range baskets {
		if candidate.ID == id {
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

// AddProductToBasket adds a product to a basket
func AddProductToBasket(basketID int, product *models.Product) {
	var basket *models.Basket

	for _, candidate := range baskets {
		if candidate.ID == basketID {
			basket = candidate
		}
	}

	if isProductInBasket(basket, product.ID) {
		for _, existingProduct := range basket.Products {
			if existingProduct.ID == product.ID {
				existingProduct.Quantity++
				break
			}
		}
	} else {
		product.Quantity = 1
		basket.Products = append(basket.Products, product)
	}

}
