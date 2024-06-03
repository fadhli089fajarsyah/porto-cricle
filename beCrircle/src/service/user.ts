import db from "../db/index";
import { IRegister, IUser } from "../types/app";
import { registerValid } from "../lib/validation/register";
import * as bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const getUsers = async () => {
    return await db.user.findMany({
        select: {
            id: true,
            username: true,
            fullname: true,
            email: true,
            profile: true
        }
    });
}

export const getUserById = async (id: number) => {
    return await db.user.findUnique({
        where: {
            id
        }
    })
}

export const register = async (payload: IRegister) => {
    console.log("Payload:", payload);
    const { error, value } = registerValid.validate(payload);
    console.log("Value:", value);
    console.log("Validation Error:", error);

    if (error) {
        throw new Error(error.details[0].message);
    }

    const isExist = await db.user.findFirst({
        where: {
            OR: [
                {
                    username: value.username,
                },
                {
                    email: value.email,
                },
            ],
        },
    });

    if (isExist) {
        throw new Error("Username or email already exist");
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    value.password = hashedPassword;

    const user = await db.user.create({
        data: {
            ...value,
        },
    });
    const profile = await db.profile.create({
        data: {
            userId: user.id,
        },
    })


};


export const login = async (username: string, password: string): Promise<string> => {
    const user = await db.user.findFirst({
        where: {
            OR: [
                {
                    username,
                },
                {
                    email: username,
                },
            ],
        }
    })

    if (!user) {
        throw new Error("Username or password is incorrect")
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Username or password is incorrect")
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
        expiresIn: "1d",
    });

    return token
}

export const updateUser = async (userId: number, payload: IUser ) => {
    return await db.user.update({
        where: {
            id: userId,
        },
        data: {
            ...payload,
        },
    });
};