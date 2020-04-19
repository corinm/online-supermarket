package main

import (
	"backend/controllers"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.GET("/", controllers.Hello)

	e.GET("/products", controllers.GetProducts)

	e.GET("/baskets", controllers.GetBaskets)
	e.GET("/baskets/:id", controllers.GetBasketByID)
	e.POST("/baskets", controllers.CreateBasket)
	e.POST("/baskets/:id/add", controllers.AddProductToBasket)

	e.Logger.Fatal(e.Start(":8000"))
}
