import * as like from "../service/like"
import { Request, Response } from "express";

export const getLikes = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.params;
        const likes = await like.getLikes(+threadId);

        res.json({
            status: true,
            message: "success",
            data: {
                user: likes,
            },
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


export const createLike = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.body;
        const userId = res.locals.user;
        await like.createLike({
            threadId,
            userId,
        });

        res.json({
            status: true,
            message: "like success",
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