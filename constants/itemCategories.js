const Categories = {
    Clothing: {
        fields: ["fabric", "size"],
        size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    },
    Shoes: {
        fields: ["fabric", "length", "size"],
        size: [
            "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5",
            "12", "12.5", "13","13.5", "14",
        ],
    },
    Accessories: {
        fields: ["material"],
    },
};

const Conditions = ["brand-new", "rarely-worn", "fairly-worn", "worn-out"];
const Colors = [
    { hex: "#000000", name: "Black" },
    { hex: "#FFFFFF", name: "White" },
    { hex: "#FFFF00", name: "Yellow" },
    { hex: "#FF0000", name: "Red" },
    { hex: "#FFC0CB", name: "Pink" },
    { hex: "#0075FF", name: "Blue" },
    { hex: "#04CE00", name: "Green" },
    { hex: "#8F00FF", name: "Purple" },
    { hex: "#FFA500", name: "Orange" },
    { hex: "#A52A2A", name: "Brown" },
    { hex: "#F5F5DC", name: "Beige" },
    { hex: "#FFD700", name: "Gold" },
    { hex: "#C0C0C0", name: "Silver" },
    { hex: "#808080", name: "Grey" },
];
export default Categories;
export { Conditions, Colors };
