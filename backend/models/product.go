package models

type Product struct {
	Id          int     `json:"id"`
	Name        string  `json:"name"`
	Price       float32 `json:"price"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
	Rating      float32 `json:"rating"`
}
