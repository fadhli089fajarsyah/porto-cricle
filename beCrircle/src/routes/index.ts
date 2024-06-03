import { Router } from "express";
import userRouter from "./userRouter";
import profileRouter from "./profile";
import threadRouter from "./thread";
import likeRouter from "./likeRouter";
import followerRouter from "./follow";
const router = Router();

router.use("/", userRouter);
router.use("/", profileRouter);
router.use("/", threadRouter);
router.use("/", likeRouter);
router.use("/", followerRouter);

export default router;
