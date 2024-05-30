import * as bcrypt from "bcryptjs";
import User from "../models/users.model";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../constants/global.constants";
import { AppError } from "../utils/appError";

export default class AuthController {
  public signUp = async (req: Request, res: Response, _next: NextFunction) => {
    const { firstName, lastName, password, email } = req.body;

    //check if user already exits with this email
    const checkUserAlreadyExits = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    //if true throw an error
    if (checkUserAlreadyExits) {
      return _next(new AppError("User Already Exits for the email Id", 400));
    }

    //if not create a new user
    await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({ message: "User registered successfully" });
  };

  public login = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;

    //check if user is valid or not
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //user is not found throw error
    if (!user) {
      return _next(new AppError("No user found!", 404));
    }

    //check if password id valid or not
    const isValidPassword: boolean = await bcrypt.compare(
      password,
      user.password
    );

    //if password is valid return success message with jwt token
    if (isValidPassword) {
      // Generate JWT token
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      res.status(200).json({ message: "Logged in successfully", token });
    } else {
      //throw an error if password is invalid
      return _next(new AppError("Invalid Password!", 400));
    }
  };
}
