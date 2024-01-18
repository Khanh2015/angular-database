import { productValid } from "../validations/productValid.js";

export const checkRequestBodyProduct = async (req, res, next) => {
  try {
    const { error } = productValid.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
