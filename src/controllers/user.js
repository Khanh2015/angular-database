import Users from "../models/Users.js";
import { updateUserValid } from "../validations/userValid.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res.status(400).json({
        message: "Get all user faild",
      });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        message: "Get one user fail",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { error } = updateUserValid.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(400).json({
        message: "Update user fail",
      });
    }

    return res.status(200).json({
      message: "Update user successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({
        message: "Delete user fail",
      });
    }

    return res.status(200).json({
      message: "Delete user successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};
