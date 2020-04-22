package database

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
)

// GetProducts returns a list of all stored products
func GetProducts() []models.Product {
	data, err := ioutil.ReadFile("./database/products.json")
	if err != nil {
		fmt.Print(err)
	}

	var products []models.Product

	err = json.Unmarshal(data, &products)
	if err != nil {
		fmt.Println("error:", err)
	}

	return products
}

// GetProductByID return a product given its ID
func GetProductByID(id int) *models.Product {
	products := GetProducts()

	for _, product := range products {
		if product.ID == id {
			return &product
		}
	}

	return nil
}
