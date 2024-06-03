import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAuthId } from "../types/app";
const auth = (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(" ")[1]
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY!)
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        console.log("ini decoded midlleware ", decoded);

        res.locals.user = (decoded as IAuthId ).id;

        return next();
    } catch (error) {

        const err = error as unknown as Error;
        console.log(err);

        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

export default auth;