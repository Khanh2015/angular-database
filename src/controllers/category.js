import Category from "../models/Category.js";
import { categoryValid } from "../validations/categoryValid.js";
export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({
        message: "Get all category fail",
      });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({
        message: "Get one category fail",
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error } = categoryValid.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const category = await Category.create(req.body);

    if (!category) {
      return res.status(400).json({
        message: "Create category fail",
      });
    }

    return res.status(200).json({
      message: "Create category successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error } = categoryValid.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      return res.status(400).json({
        message: "Update category fail",
      });
    }

    return res.status(200).json({
      message: "Update category successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(400).json({
        message: "Delete category fail",
      });
    }

    return res.status(200).json({
      message: "Delete category successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const getOneCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(400).json({
        message: "Get category by slug fail",
      });
    }
    return res.status(200).json({
      message: "Get category by slug successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};

export const getOneCategoryByName = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.params.name });
    if (!category) {
      return res.status(400).json({
        message: "Get category by name fail",
      });
    }
    return res.status(200).json({
      message: "Get category by name successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Server not response",
      message: error.message || "Server not response",
    });
  }
};
