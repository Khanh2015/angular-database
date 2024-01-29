import { Router } from "express";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import categoryRouter from "./category.js";
import userRouter from "./user.js";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/users", userRouter);

export default router;
