import Product from "../models/Product.js";
import { productValid } from "../validations/productValid.js";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(400).json({
        message: "Get all product error",
      });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const getProductsPaginate = async (req, res) => {
  try {
    const { _page = 1, _limit = 5 } = req.query;
    const options = { page: _page, limit: _limit };
    const products = await Product.paginate({}, options);
    if (!products) {
      return res.status(400).json({
        message: "Get products error",
      });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "Get one product error",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(400).json({
        message: "Delete product error",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const body = req.body;
    const { error } = productValid.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors.join("------------"),
      });
    }
    const product = await Product.create(body);
    if (!product) {
      res.status(400).json({
        message: "Create product error",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { error } = productValid.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors.join("------------"),
      });
    }
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!product) {
      res.status(400).json({
        message: "Update product error",
      });
    }
    return res.status(200).json({
      message: "Update product successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const searchProduct = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    });
    if (!products) {
      return res.status(400).json({
        message: "Can not find product",
      });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};
