package database

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
)

// GetProducts returns a list of all products
func GetProducts() []models.Product {
	// read file
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
