import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../controllers/category.js";
import { checkRequestBodyCategory } from "../middlewares/checkRequestBodyCategory.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.delete("/:id", checkIsAdmin, deleteCategory);
categoryRouter.put(
  "/:id",
  checkIsAdmin,
  checkRequestBodyCategory,
  updateCategory
);
categoryRouter.post(
  "/",
  checkIsAdmin,
  checkRequestBodyCategory,
  createCategory
);

export default categoryRouter;
