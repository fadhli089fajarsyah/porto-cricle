import { Request, Response } from "express";
import * as profileServices from "../service/profile";
import { IEditProfile, IProfile } from "../types/app";
import { log } from "console";


export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user;
        const { body } = req;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const avatar = files.avatar ? files.avatar[0].filename : null;
        const cover = files.cover ? files.cover[0].filename : null;
        console.log(body);

        if (avatar) {
            body.avatar = avatar;
        }
        if (cover) {
            body.cover = cover;
        }
        console.log(body, "ini di controller", userId);


        const result = await profileServices.updateProfile(userId, body);

        res.json({
            status: true,
            message: "success",
            data: result,
        });
    } catch (error) {
        const err = error as unknown as Error;
        console.log(err);

        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user;

        const profile = await profileServices.getProfile(userId);

        res.json({
            status: true,
            message: "success",
            data: profile,
        });
    } catch (error) {
        const err = error as unknown as Error;
        console.log(err);

        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};

export const getProfileById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const profile = await profileServices.getProfile(+id);

        res.json({
            status: true,
            message: "success",
            data: profile,
        });
    } catch (error) {
        const err = error as unknown as Error;
        console.log(err);

        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};