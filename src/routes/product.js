import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductDetail,
  updateProduct,
} from "../controllers/product.js";
import { checkRequestBodyProduct } from "../middlewares/checkRequestBodyProduct.js";

const productRouter = Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductDetail);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", checkRequestBodyProduct, updateProduct);
productRouter.post("/", checkRequestBodyProduct, createProduct);

export default productRouter;
