package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"backend/database"
	"backend/models"

	"github.com/gorilla/mux"
)

var products []models.Product

func main() {
	r := mux.NewRouter()
	products = database.Product_data()
	r.Use(mux.CORSMethodMiddleware(r))
	r.HandleFunc("/products", getProducts).Methods("GET")
	r.HandleFunc("/products/{id}", getProduct).Methods("GET")
	http.ListenAndServe(":8000", r)
}

func getProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("Returning all products")

	json.NewEncoder(w).Encode(products)
}

func getProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println("Returning product ", id)

	var product models.Product
	for _, value := range products {
		if strconv.Itoa(value.Id) == id {
			fmt.Println(value)
			product = value
			break
		}
	}

	json.NewEncoder(w).Encode(product)
}
