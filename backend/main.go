package main

import (
	"fmt"
	"net/http"

	"backend/database"

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
	e.POST("/baskets", createBasket)
	e.POST("/baskets/:id/add", addProductToBasket)
	e.Logger.Fatal(e.Start(":8000"))
}

func getProducts(c echo.Context) error {
	products := database.GetProducts()
	fmt.Println("Returning all products")
	return c.JSON(http.StatusOK, products)
}

func createBasket(c echo.Context) error {
	fmt.Println("Creating basket")
	basket := database.CreateBasket()
	return c.JSON(http.StatusOK, basket)
}

func addProductToBasket(c echo.Context) error {
	fmt.Println("Adding product to basket")

	// productId := c.Request()
	// fmt.Println(productId)

	// TODO: Find product and add it to the basket - using a pointer?
	// products := database.GetProducts()

	// var productToAdd models.Product
	// for i, product := range products {
	// if product.ID == id {
	// productToAdd = id
	// }
	// }

	return c.JSON(http.StatusOK, ":(")
}
