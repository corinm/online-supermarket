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

func createConnection() *pgx.Conn {
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	return conn
}

func createProductsTable(conn *pgx.Conn) pgx.Rows {
	rows, err := conn.Query(context.Background(), `
		CREATE TABLE IF NOT EXISTS products (
			id serial PRIMARY KEY,
			name text,
			price numeric,
			description text,
			image text,
			rating numeric
		);
	`)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create products table: %v\n", err)
		os.Exit(1)
	}
	defer rows.Close()
	return rows
}

func createBasketsTable(conn *pgx.Conn) pgx.Rows {
	rows, err := conn.Query(context.Background(), `
		CREATE TABLE IF NOT EXISTS baskets (
			id serial PRIMARY KEY,
			products integer[]
		);
	`)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create baskets table: %v\n", err)
		os.Exit(1)
	}
	defer rows.Close()
	return rows
}

func createBasketProductsTable(conn *pgx.Conn) pgx.Rows {
	rows, err := conn.Query(context.Background(), `
		CREATE TABLE IF NOT EXISTS basket_products (
			basket integer REFERENCES public.baskets (id),
			product integer REFERENCES public.products (id),
			quantity integer,
			PRIMARY KEY (basket, product)
		);
	`)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create basket_products table: %v\n", err)
		os.Exit(1)
	}
	defer rows.Close()
	return rows
}

func getProductsFromJSON() []models.Product {
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

func insertProduct(conn *pgx.Conn, product models.Product) pgx.Rows {
	rows, err := conn.Query(context.Background(), `
		INSERT INTO products (name, price, description, image, rating)
		VALUES ($1, $2, $3, $4, $5);
	`, product.Name, product.Price, product.Description, product.Image, product.Rating)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to insert product: %v\n", err)
		os.Exit(1)
	}
	defer rows.Close()
	return rows
}

func isProductsTableEmpty(conn *pgx.Conn) bool {
	var isEmpty bool
	err := conn.QueryRow(context.Background(), `
		SELECT CASE WHEN EXISTS(SELECT 1 FROM products) THEN false ELSE true END AS is_empty;
	`).Scan(&isEmpty)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to insert product: %v\n", err)
		os.Exit(1)
	}
	return isEmpty
}

func insertAllProducts(conn *pgx.Conn) {
	products := getProductsFromJSON()

	isNoProducts := isProductsTableEmpty(conn)

	if isNoProducts {
		for i, product := range products {
			fmt.Println(i, product.Name)
			insertProduct(conn, product)
		}
	}
}

// InitialiseDatabase creates required tables and inserts default products
func InitialiseDatabase() {
	conn := createConnection()
	defer conn.Close(context.Background())

	// Create tables
	createProductsTable(conn)
	createBasketsTable(conn)
	createBasketProductsTable(conn)

	// Insert products
	insertAllProducts(conn)
}
