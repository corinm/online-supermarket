package main

import (
	"fmt"
	"net/http"
	"strconv"

	"backend/database"
	"backend/models"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.GET("/products", getProducts)
	e.GET("/baskets/:id", getBasketByID)
	e.POST("/baskets", createBasket)
	e.POST("/baskets/:id/add", addProductToBasket)
	e.Logger.Fatal(e.Start(":8000"))
}

func getProducts(c echo.Context) error {
	products := database.GetProducts()
	fmt.Println("Returning all products")
	return c.JSON(http.StatusOK, products)
}

func getBasketById(c echo.Context) error {

}

func createBasket(c echo.Context) error {
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

func addProductToBasket(c echo.Context) error {
	fmt.Println("Adding product to basket")

	basketID := extractBasketID(c)
	fmt.Println("BasketID: ", basketID)

	productID := extractProductID(c)
	fmt.Print("ProductID: ", productID)

	// TODO: Find product and add it to the basket - using a pointer?
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
