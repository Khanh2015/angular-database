import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
} from "../controllers/user.js";
import { signUp } from "../controllers/auth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getOneUser);
userRouter.post("/", checkIsAdmin, signUp);
userRouter.put("/:id", checkIsAdmin, updateUser);
userRouter.delete("/:id", checkIsAdmin, deleteUser);

export default userRouter;
