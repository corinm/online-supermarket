package controllers

import (
	"backend/database"
	"backend/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo"
)

// GetBaskets returns all baskets
func GetBaskets(c echo.Context) error {
	baskets := database.GetBaskets()
	return c.JSON(http.StatusOK, baskets)
}

// GetBasketByID returns a basket given an id
func GetBasketByID(c echo.Context) error {
	id := extractBasketID(c)
	basket := database.GetBasketByID(id)
	return c.JSON(http.StatusOK, basket)
}

// CreateBasket returns something
func CreateBasket(c echo.Context) error {
	fmt.Println("Creating basket")
	basket := database.CreateBasket()
	return c.JSON(http.StatusOK, basket)
}

func extractBasketID(c echo.Context) int {
	rawID := c.Param("id")
	basketID, err := strconv.Atoi(rawID)
	if err != nil {
		fmt.Println(err)
	}
	return basketID
}

func extractProductID(c echo.Context) int {
	product := new(models.Product)

	if err := c.Bind(product); err != nil {
		fmt.Println(err)
	}

	return product.ID
}

// AddProductToBasket accepts a basketID via url param "id" and productID via body.id
// and adds a pointer to that product to the basket
func AddProductToBasket(c echo.Context) error {
	fmt.Println("Adding product to basket")

	basketID := extractBasketID(c)
	fmt.Println("BasketID: ", basketID)

	productID := extractProductID(c)
	fmt.Print("ProductID: ", productID)

	products := database.GetProducts()

	var productToAdd models.Product
	for _, product := range products {
		if product.ID == productID {
			productToAdd = product
		}
	}

	database.AddProductToBasket(basketID, &productToAdd)

	return c.JSON(http.StatusOK, basketID)
}
