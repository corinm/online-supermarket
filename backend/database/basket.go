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
