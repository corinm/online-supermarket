package controllers

import (
	"net/http"

	"github.com/labstack/echo"
)

// Hello returns hello world
func Hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
