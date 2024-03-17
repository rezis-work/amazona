import express from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/productModel";

export const productRouter = express.Router();

// /api/products

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);

// /api/slug/tshirt

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

// productRouter.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     // Extract query parameter
//     const { query } = req.query;

//     // Build a search query object if a query is provided
//     let searchQuery = query
//       ? {
//           // Assuming you want to search by product name; adjust as necessary for your schema
//           name: { $regex: query, $options: "i" },
//         }
//       : {};

//     // Use the search query object in your find method
//     const products = await ProductModel.find(searchQuery);
//     res.json(products);
//   })
// );
