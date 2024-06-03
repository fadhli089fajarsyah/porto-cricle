import { Router } from "express";
import { getUsers, registerUser,loginUser } from "../controller/user";
import auth from "../middleware/auth";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/users", auth, getUsers);


export default userRouter;
