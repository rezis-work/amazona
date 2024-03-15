import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isAuth } from "../utils";
import { OrderModel } from "../models/orderModel";
import { Product } from "../models/productModel";
export const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
    } else {
      const createOreder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentmethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.taxPrice,
        user: req.body._id,
      });
      res.status(201).json({ message: "Order Not Found", order: createOreder });
    }
  })
);
