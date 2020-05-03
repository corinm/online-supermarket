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
	id, err := extractBasketID(c)

	if err != nil {
		return err
	}

	basket := database.GetBasketByID(id)

	if basket.ID == 0 {
		return c.JSON(http.StatusNotFound, fmt.Sprintf("Basket with id %v not found", id))
	}

	return c.JSON(http.StatusOK, basket)
}

// CreateBasket returns something
func CreateBasket(c echo.Context) error {
	fmt.Println("Creating basket")
	basket, err := database.CreateBasket()

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, basket)
}

func extractBasketID(c echo.Context) (int, error) {
	rawID := c.Param("id")

	if rawID == "" {
		return 0, c.JSON(http.StatusBadRequest, "basketId required")
	}

	basketID, err := strconv.Atoi(rawID)

	if err != nil {
		return 0, c.JSON(http.StatusInternalServerError, err)
	}

	return basketID, nil
}

func extractProduct(c echo.Context) (*models.Product, error) {
	product := new(models.Product)
	err := c.Bind(product)
	return product, err
}

// AddProductToBasket accepts a basketID via url param "id" and productID via body.id
// and adds a pointer to that product to the basket
func AddProductToBasket(c echo.Context) error {
	fmt.Println("Adding product to basket")

	basketID, errBasketID := extractBasketID(c)
	product, errProduct := extractProduct(c)

	if errBasketID != nil {
		return errBasketID
	}
	if errProduct != nil {
		return errProduct
	}

	productToAdd := database.GetProductByID(product.ID)

	if productToAdd == nil {
		return c.JSON(http.StatusNotFound, "Product not found")
	}

	updatedBasket := database.AddProductToBasket(basketID, productToAdd, product.Quantity)

	return c.JSON(http.StatusOK, updatedBasket)
}

// RemoveProductFromBasket accepts a basketID via url param "id" and productID via body.id
// and removes it from the basket
func RemoveProductFromBasket(c echo.Context) error {
	fmt.Println("Removing product from basket")

	basketID, errBasketID := extractBasketID(c)
	product, errProduct := extractProduct(c)

	if errBasketID != nil {
		return errBasketID
	}
	if errProduct != nil {
		return errProduct
	}

	updatedBasket := database.RemoveProductFromBasket(basketID, product.ID)

	return c.JSON(http.StatusOK, updatedBasket)
}
