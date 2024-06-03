import { Router } from "express";
import auth from "../middleware/auth";
import { follow, getFollowers,getFollowings } from "../controller/follow";
const followerRouter = Router();

followerRouter.post("/follow", auth, follow);
followerRouter.get("/follower/:followingId", auth, getFollowers);
followerRouter.get("/following/:followerId", auth, getFollowings);

export default followerRouter;