import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
} from "../controllers/user.js";
import { signUp } from "../controllers/auth.js";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getOneUser);
userRouter.post("/", signUp);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
