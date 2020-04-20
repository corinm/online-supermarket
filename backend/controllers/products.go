package controllers

import (
	"backend/database"
	"fmt"
	"net/http"

	"github.com/labstack/echo"
)

// GetProducts returns all products
func GetProducts(c echo.Context) error {
	products := database.GetProducts()
	fmt.Println("Returning all products")
	return c.JSON(http.StatusOK, products)
}
