import { Router } from "express";
import auth from "../middleware/auth";
import { createLike, getLikes } from "../controller/like";
const likeRouter = Router();

likeRouter.post("/like", auth, createLike);
likeRouter.get("/like/:threadId", auth, getLikes);

export default likeRouter;