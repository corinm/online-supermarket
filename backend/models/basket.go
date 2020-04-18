package models

// Basket represents a basket
type Basket struct {
	ID       int        `json:"id"`
	Products []*Product `json:"products"`
}
