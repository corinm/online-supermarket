package database

import (
	"backend/models"
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v4"
)

var (
	baskets []*models.Basket
	nextID  = 1
)

// CreateBasket creates a basket in the database and returns the id
func CreateBasket() (*models.Basket, error) {
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		return nil, err
	}
	defer conn.Close(context.Background())

	basket := models.Basket{}
	err2 := conn.QueryRow(context.Background(), `
		INSERT INTO baskets DEFAULT VALUES
		RETURNING id;
	`).Scan(&basket.ID)
	if err2 != nil {
		fmt.Fprintf(os.Stderr, "Unable to insert into baskets: %v\n", err)
		return nil, err2
	}

	fmt.Println("BasketID", basket.ID)

	return &basket, nil
}

// GetBaskets returns all stored baskets
func GetBaskets() []models.Basket {
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	rows, err2 := conn.Query(context.Background(), `
		SELECT * FROM baskets;
	`)
	if err2 != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
	}

	baskets := []models.Basket{}
	for rows.Next() {
		var basket models.Basket
		err = rows.Scan(&basket.ID)
		if err != nil {
			fmt.Fprintf(os.Stderr, "rows.Scan failed: %v\n", err)
			os.Exit(1)
		}
		baskets = append(baskets, basket)
	}

	return baskets
}

// GetBasketByID returns a specific basket based on its ID
func GetBasketByID(id int) models.Basket {
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	var basket models.Basket
	fmt.Println("basket", basket)
	err2 := conn.QueryRow(context.Background(), `
		SELECT id FROM baskets WHERE id=$1;
	`, id).Scan(&basket.ID)

	if err2 != nil {
		fmt.Fprintf(os.Stderr, "Unable to select basket: %v\n", err2)
	}
	fmt.Println("basket", basket)

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
