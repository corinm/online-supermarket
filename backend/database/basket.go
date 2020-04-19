package database

import "backend/models"

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

// AddProductToBasket adds a product to a basket
func AddProductToBasket(basketID int, product *models.Product) {
	var basket *models.Basket

	for _, candidate := range baskets {
		if candidate.ID == basketID {
			basket = candidate
		}
	}

	basket.Products = append(basket.Products, product)
}
