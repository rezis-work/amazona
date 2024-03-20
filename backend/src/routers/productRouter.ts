import express from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/productModel";

export const productRouter = express.Router();

interface Product {
  [key: string]: any;
}

interface FilterCriteria {
  category?: string;
  brand?: string;
  price?: { $gte?: number; $lte?: number };
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

productRouter.get("/filtered", async (req, res) => {
  const { category, brand, priceMin, priceMax } = req.query;
  let filterCriteria: FilterCriteria = {};

  if (typeof category === "string") {
    filterCriteria.category = category;
  }

  if (typeof brand === "string") {
    filterCriteria.brand = brand;
  }

  if (typeof priceMin === "string" && typeof priceMax === "string") {
    const minPrice = parseFloat(priceMin);
    const maxPrice = parseFloat(priceMax);
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filterCriteria.price = { $gte: minPrice, $lte: maxPrice };
    }
  }

  try {
    const products = await ProductModel.find(filterCriteria);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
