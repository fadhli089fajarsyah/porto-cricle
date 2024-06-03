import { Request, Response } from "express";
import * as userServices from "../service/user";

export const registerUser = async (req: Request, res: Response) => {
    try {

        const { body } = req;
        console.log(body);
        const result = await userServices.register(body);

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

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const token = await userServices.login(username, password);
        res.json({
            status: true,
            message: "success",
            token: token,
        });
    } catch (error) {

        const err = error as unknown as Error;
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });

    }
}


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userServices.getUsers();

        res.json({
            status: true,
            message: "success",
            data: users,
        });


    } catch (error) {
        const err = error as unknown as Error
        res.json({
            status: false,
            message: err.message,
        });
    }

}

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userServices.getUsers();
        res.json({
            status: true,
            message: "success",
            data: user,
        });

    } catch (error) {
        const err = error as unknown as Error
        res.json({
            status: false,
            message: err.message,
        });
    }


}

