import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../models/Users.js";

dotenv.config();

export const checkIsAdmin = async (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYwNzE2ZWYxZDlmMGIwYTNjMzIzMmUiLCJpYXQiOjE3MDEyNTA5MDQsImV4cCI6MTcwMTMzNzMwNH0.7V-nvBMZEgf5WUSN7PHUB0MSs7wvrMUI-0qeQ3rBAOo
    // ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYwNzE2ZWYxZDlmMGIwYTNjMzIzMmUiLCJpYXQiOjE3MDEyNTA5MDQsImV4cCI6MTcwMTMzNzMwNH0.7V-nvBMZEgf5WUSN7PHUB0MSs7wvrMUI-0qeQ3rBAOo"]

    const decode = jwt.verify(token, process.env.SECRET_CODE);

    if (!decode) {
      return res.status(400).json({
        message: "Token error",
      });
    }

    const checkUser = await Users.findById(decode._id);

    if (!checkUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (checkUser.role !== "admin") {
      return res.status(400).json({
        message: "You are not admin",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      name: error.nam,
      message: error.message,
    });
  }
};
