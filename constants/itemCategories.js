const Categories = {
    Clothes: {
        fields: ["size", "weight(kg)", "fabric", "condition", "color"],
        subcategories: ["Jeans", "Activewear", "Coat", "Dress", "Fur", 
            "Jacket - Sports/denim", "Jacket - Blazer", "Jacket - Leather",
             "Jacket - Other", "T-Shirt", "Jumper", "Jumpsuit", "Knitwear", 
             "Overalls", "Pant", "Set", "Shirt-Button Up(Long)", 
             "Shirt-Button Up(Short)", "Skirt", "Sleepwear", "Suit", "Swimwear", 
             "Vest"]
    }, 
    Shoes: {
        fields: ["size", "weight(kg)", "fabric", "length", "condition", "color"],
        subcategories: ["Heals", "Boots", "Flats", "Sandals", "Loafers", "Sneakers"]
    },
    Accessories: {
        fields: ["size", "weight(kg)", "material", "condition", "color"],
        subcategories: ["Belt", "Sunglasses", "Bag", "Leather", "Scarf", "Hat"]
    }
} 

const ShoeSizeEU = [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45]
const ShoeSizeUK = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]

export default Categories;
