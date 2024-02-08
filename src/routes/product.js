import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductDetail,
  getProductsPaginate,
  searchProduct,
  updateProduct,
} from "../controllers/product.js";
import { checkRequestBodyProduct } from "../middlewares/checkRequestBodyProduct.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const productRouter = Router();

productRouter.get("/search", searchProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/paginate", getProductsPaginate);
productRouter.get("/:id", getProductDetail);
productRouter.delete("/:id", checkIsAdmin, deleteProduct);
productRouter.put("/:id", checkIsAdmin, checkRequestBodyProduct, updateProduct);
productRouter.post("/", checkIsAdmin, checkRequestBodyProduct, createProduct);

export default productRouter;
