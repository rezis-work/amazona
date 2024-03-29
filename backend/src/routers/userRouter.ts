import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from "../utils";

export const userRouter = express.Router();

// POST /api/users/signin

userRouter.post(
  "/signin",

  asyncHandler(async (req: Request, res: Response) => {
    console.log("Signup request body:", req.body);
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password),
      } as User);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser), // Consider if you want to regenerate the token
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
