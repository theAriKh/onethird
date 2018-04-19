const express = require('express');

class Food {
    constructor(item, category, quantity, price, expiry, img) {
        this.item = item;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.expiry = expiry;
        this.img = img;

    }
}

let apples = new Food('apple','fruit', 5, 0, new Date(2018,22,4), "/img/apple.jpg");
let orangeJuice = new Food('orange juice', 'beverage', 1, 1, new Date(2018,22,6), "/img/orangeJuice.jpg");
let beans = new Food('beans', 'canned goods', 3, 3, new Date(2022,22,6), "/img/beans.jpg");
let items = [apples, orangeJuice, beans];

module.exports = items;