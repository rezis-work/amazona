import express from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/productModel";

export const productRouter = express.Router();

interface Product {
  [key: string]: any;
}

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { query } = req.query;
    console.log("Query received:", query);

    let searchQuery = {};
    if (query) {
      searchQuery.name = { $regex: query, $options: "i" };
    }

    const products = await ProductModel.find(searchQuery);
    res.json(products);
  })
);

// /api/glsu / tshirt;

productRouter.get(
  "/slug/:slug",
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  })
);
