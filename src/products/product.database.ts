import { Product, Products } from "./product.interface";
import { v4 as random } from "uuid";
import * as fs from "fs";

let products: Products = loadProducts();

function loadProducts(): Products {
  try {
    const data = fs.readFileSync("./products.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Error loading products:", error);
    return {};
  }
}

function saveProducts() {
  try {
    fs.writeFileSync("./products.json", JSON.stringify(products), "utf-8");
    console.log("Products saved successfully!");
  } catch (error) {
    console.log("Error saving products:", error);
  }
}

export const findAll = async (): Promise<Product[]> => Object.values(products);

// Function to find a single product by its ID
export const findOne = async (id: string): Promise<Product | null> => {
  return products[id] || null;
};
