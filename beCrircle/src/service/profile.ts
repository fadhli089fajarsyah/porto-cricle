import { log } from "console";
import db from "../db";
import { IEditProfile, IProfile } from "../types/app";

export const updateProfile = async (userId: number, payload: IEditProfile) => {
    const dataToUpdate: Partial<IEditProfile> = {};
    const userUpdate: { [key: string]: string}= {}
    if (payload.bio !== undefined && payload.bio !== null) {
        dataToUpdate.bio = payload.bio;
    }

    if (payload.avatar !== undefined && payload.avatar !== null) {
        dataToUpdate.avatar = payload.avatar;
    }
    if (payload.cover !== undefined && payload.cover !== null) {
        dataToUpdate.cover = payload.cover;
    }

    if (payload.fullname) {
        userUpdate.fullname = payload.fullname;
    }

    if (payload.username) {
        userUpdate.username = payload.username;
    }

    if (Object.keys(dataToUpdate).length ) {
        await db.user.update({
            where: { id: userId },
            data: userUpdate,
        });
    }


    return await db.profile.update({
        where: {
            userId: userId,
        },
        data: dataToUpdate,
    });
};

export const getProfile = async (userId: number) => {
    return await db.profile.findFirst({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    username: true,
                    fullname: true,
                    id: true,
                    following: {
                        include: {
                            following: {
                                select: {
                                    username: true,
                                    fullname: true,
                                    profile: {
                                        select: {
                                            avatar: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    follower: {
                        include: {
                            follower: {
                                select: {
                                    username: true,
                                    fullname: true,
                                    profile: {
                                        select: {
                                            avatar: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            follower: true,
                            following: true
                        }
                    }
                },
            },
        },
    });
};

