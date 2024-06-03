import { Router } from "express";
import auth from "../middleware/auth";
import uploadMiddleware from "../middleware/upload";
import { createThread, getReplies, getThread, getThreads } from "../controller/thread";
const threadRouter = Router();


threadRouter.post(
    "/threadAdd",
    auth,
    uploadMiddleware("image"),
    createThread
);
threadRouter.get("/threads", getThreads);
threadRouter.get("/thread/:id", auth, getThread);
threadRouter.get("/replies/:id",auth,  getReplies);

export default threadRouter;
