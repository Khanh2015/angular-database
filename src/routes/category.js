import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../controllers/category.js";
import { checkRequestBodyCategory } from "../middlewares/checkRequestBodyCategory.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.put("/:id", checkRequestBodyCategory, updateCategory);
categoryRouter.post("/", checkRequestBodyCategory, createCategory);

export default categoryRouter;
