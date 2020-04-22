package database

import (
	"backend/models"
	"testing"
)

func TestGetBasketReturnsBasketThatExists(t *testing.T) {
	var baskets []*models.Basket
	mockBasket1 := models.Basket{ID: 1}
	mockBasket2 := models.Basket{ID: 2}
	mockBasket3 := models.Basket{ID: 3}
	baskets = append(baskets, &mockBasket1)
	baskets = append(baskets, &mockBasket2)
	baskets = append(baskets, &mockBasket3)

	basket := getBasket(baskets, 2)
	if basket.ID != 2 {
		t.Fail()
	}
}

func TestGetBasketReturnsNilIfNoBasket(t *testing.T) {
	var baskets []*models.Basket
	mockBasket1 := models.Basket{ID: 1}
	mockBasket3 := models.Basket{ID: 3}
	baskets = append(baskets, &mockBasket1)
	baskets = append(baskets, &mockBasket3)

	basket := getBasket(baskets, 2)
	if basket != nil {
		t.Fail()
	}
}

func TestIsProductInBasketReturnsFalseWhenProductNotInBasket(t *testing.T) {
	mockBasket := models.Basket{ID: 1}

	if isProductInBasket(&mockBasket, 1) != false {
		t.Fail()
	}
}

func TestIsProductInBasketReturnsTrueWhenProductIsInBasket(t *testing.T) {
	mockBasket := models.Basket{ID: 1}
	mockProduct := models.Product{ID: 1}
	mockBasket.Products = append(mockBasket.Products, &mockProduct)

	if isProductInBasket(&mockBasket, 1) != true {
		t.Fail()
	}
}

func TestIncrementQuantityInBasketIncrementsByOne(t *testing.T) {
	mockBasket := models.Basket{ID: 1}
	mockProduct1 := models.Product{ID: 1, Quantity: 1}
	mockProduct2 := models.Product{ID: 2, Quantity: 1}
	mockProduct3 := models.Product{ID: 3, Quantity: 1}
	mockBasket.Products = append(mockBasket.Products, &mockProduct1)
	mockBasket.Products = append(mockBasket.Products, &mockProduct2)
	mockBasket.Products = append(mockBasket.Products, &mockProduct3)

	incrementQuantityInBasket(&mockBasket, 2, 1)

	if mockProduct2.Quantity != 2 {
		t.Fail()
	}
}

func TestIncrementQuantityInBasketIncrementsByTwo(t *testing.T) {
	mockBasket := models.Basket{ID: 1}
	mockProduct1 := models.Product{ID: 1, Quantity: 1}
	mockProduct2 := models.Product{ID: 2, Quantity: 1}
	mockProduct3 := models.Product{ID: 3, Quantity: 1}
	mockBasket.Products = append(mockBasket.Products, &mockProduct1)
	mockBasket.Products = append(mockBasket.Products, &mockProduct2)
	mockBasket.Products = append(mockBasket.Products, &mockProduct3)

	incrementQuantityInBasket(&mockBasket, 2, 2)

	if mockProduct2.Quantity != 3 {
		t.Fail()
	}
}

func TestAddToBasketAddsOneOfProduct(t *testing.T) {
	mockBasket := models.Basket{ID: 1}
	mockProduct := models.Product{ID: 1}

	addToBasket(&mockBasket, &mockProduct, 1)

	if len(mockBasket.Products) != 1 {
		t.Fail()
	}
	if mockProduct.Quantity != 1 {
		t.Fail()
	}
}

func TestAddToBasketAddsTwoOfProduct(t *testing.T) {
	mockBasket := models.Basket{ID: 1}
	mockProduct := models.Product{ID: 1}

	addToBasket(&mockBasket, &mockProduct, 2)

	if len(mockBasket.Products) != 1 {
		t.Fail()
	}
	if mockProduct.Quantity != 2 {
		t.Fail()
	}
}

func TestRemoveFromBasket(t *testing.T) {
	mockBasket := models.Basket{ID: 1}
	mockProduct := models.Product{ID: 1}
	mockBasket.Products = append(mockBasket.Products, &mockProduct)

	removeFromBasket(&mockBasket, 1)

	if len(mockBasket.Products) != 0 {
		t.Fail()
	}
}
