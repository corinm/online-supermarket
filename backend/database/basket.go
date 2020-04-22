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

// GetBaskets returns all stored baskets
func GetBaskets() []*models.Basket {
	return baskets
}

// GetBasketByID returns a specific basket based on its ID
func GetBasketByID(id int) *models.Basket {
	basket := getBasket(baskets, id)
	return basket
}

// AddProductToBasket adds a product to a basket if no already present
// otherwise it increments the quantity
func AddProductToBasket(basketID int, product *models.Product, quantity int) *models.Basket {
	basket := getBasket(baskets, basketID)

	if isProductInBasket(basket, product.ID) {
		incrementQuantityInBasket(basket, product.ID, quantity)
	} else {
		addToBasket(basket, product, quantity)
	}

	return basket
}

// RemoveProductFromBasket removes a product from the basket if present and returns the updated basket
func RemoveProductFromBasket(GetBasketByID int, productID int) *models.Basket {
	basket := getBasket(baskets, GetBasketByID)

	if isProductInBasket(basket, productID) {
		removeFromBasket(basket, productID)
	} else {
	}

	return basket
}
