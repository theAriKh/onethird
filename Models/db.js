class Food {
    constructor(item, category, quantity, price) {
        this.item = item;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
    }
}

let apples = new Food('apple','fruit', 5, 0);
let orangeJuice = new Food('orange juice', 'beverage', 1, 10);
let beans = new Food('beans', 'canned goods', 3, 30);
let items = [apples, orangeJuice, beans];

module.exports = items;