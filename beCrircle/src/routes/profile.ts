import { Router } from "express";
import auth from "../middleware/auth";
import uploadMiddleware from "../middleware/upload"
import { updateProfile,getProfile,getProfileById } from "../controller/profile";


const profileRouter = Router();

profileRouter.patch(
    "/profileEdit",
    auth,
    uploadMiddleware("cover"),
    updateProfile
);
profileRouter.get(
    "/profile",
    auth,
    getProfile
);
profileRouter.get(
    "/profile/:id",
    auth,
    getProfileById
);



export default profileRouter;
