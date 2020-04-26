package database

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v4"
)

// EnsureProductTableExists creates the 'products' table if it doesn't already exist
func EnsureProductTableExists() {
	var databaseURL = os.Getenv("DATABASE_URL")
	conn, err1 := pgx.Connect(context.Background(), databaseURL)

	if err1 != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err1)
		os.Exit(1)
	} else {
		fmt.Println("Connected to database at:", os.Getenv("DATABASE_URL"))
	}

	_, err2 := conn.Exec(context.Background(), "CREATE TABLE IF NOT EXISTS products (name string)")
	if err1 != nil {
		fmt.Fprintf(os.Stderr, "Unable to create products table: %v\n", err2)
		os.Exit(1)
	} else {
		fmt.Println("Create table maybe worked")
	}
}

// EnsureProductRecordsExist inserts the dummy product records from json if the table is empty
func EnsureProductRecordsExist() {}
