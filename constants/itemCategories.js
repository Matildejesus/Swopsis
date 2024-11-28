const Categories = {
    Clothing: {
        fields: ["fabric", "size"],
        subcategories: ["Jeans", "Activewear", "Coat", "Dress", "Fur", 
            "Jacket - Sports/denim", "Jacket - Blazer", "Jacket - Leather",
             "Jacket - Other", "T-Shirt", "Jumper", "Jumpsuit", "Knitwear", 
             "Overalls", "Pant", "Set", "Shirt-Button Up(Long)", 
             "Shirt-Button Up(Short)", "Skirt", "Sleepwear", "Suit", "Swimwear", 
             "Vest"],
        size: ["XXS, XS, S, M, L, XL, XXL"]
    }, 
    Shoes: {
        fields: ["fabric", "length", "size"],
        subcategories: ["Heals", "Boots", "Flats", "Sandals", "Loafers", "Sneakers"],
        size: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14]
    },
    Accessories: {
        fields: ["material"],
        subcategories: ["Belt", "Sunglasses", "Bag", "Leather", "Scarf", "Hat"]
    }
} 

const Conditions = ["brand-new", "rarely-worn", "fairly-worn", "worn-out"]
export default Categories; 
export { Conditions };
