package database

import (
	"backend/models"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/jackc/pgx/v4"
)

// GetProducts returns a list of all stored products
func GetProducts() []models.Product {
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

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

// // GetProducts returns a list of all stored products
// func GetProducts() []models.Product {
// 	data, err := ioutil.ReadFile("./database/products.json")
// 	if err != nil {
// 		fmt.Print(err)
// 	}

// 	var products []models.Product

// 	err = json.Unmarshal(data, &products)
// 	if err != nil {
// 		fmt.Println("error:", err)
// 	}

// 	return products
// }

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
