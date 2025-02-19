import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as database from "./product.database";

export const productRouter = express.Router();

// Get all products
productRouter.get("/products", async (req: Request, res: Response) => {
  try {
    const allProducts = await database.findAll();

    if (!allProducts || allProducts.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No products available." });
    }

    return res
      .status(StatusCodes.OK)
      .json({ total_products: allProducts.length, allProducts });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

// Get a single product by ID
productRouter.get("/product/:id", async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await database.findOne(productId);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    return res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});
