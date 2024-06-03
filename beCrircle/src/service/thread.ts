import db from "../db"
import { IThread } from "../types/app"

export const getThreads = async () => {
    return await db.thread.findMany({
        where: {
            threadId: null,
        },
        include: {
            image: {
                select: {
                    image: true,
                },
            },
            author: {
                select: {
                    username: true,
                    fullname: true,
                    id: true,
                    profile: {
                        select: {
                            avatar: true,
                        }
                    }

                }
            },
            _count: {
                select: {
                    replies: true,
                },
            },
            like: true
        },
    }).then((threads) => {
        threads.sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
        });

        // Map over each thread to calculate the total number of likes
        return threads.map(thread => {
            const totalLikes = thread.like.length; // Get the total number of likes
            return {
                ...thread,
                _count: {
                    ...thread._count,
                    likes: totalLikes, // Include the total number of likes in the _count object
                }
            };
        });
    });
};


export const getThread = async (id: number) => {
    return await db.thread.findFirst({
        where: {
            id
        }, include: {
            image: {
                select: {
                    image: true,
                },
            },
            author: {
                select: {
                    username: true,
                    fullname: true,
                    password: false,
                    id: true,
                    profile: {
                        select: {
                            avatar: true,
                        },
                    },
                }
            },
            like: {
                select: {
                    threadId: true,
                    userId: true,
                }
            },
            _count: {
                select: {
                    replies: true,
                },
            }

        },
    })
}

export const createThread = async (
    payload: IThread,
    files: { [fieldname: string]: Express.Multer.File[] }
) => {
    const thread = await db.thread.create({
        data: {
            ...payload,
            threadId: payload.threadId ? +payload.threadId : null,
        }
    })
    console.log(files.image);

    if (files.image) {
        await db.threadImage.createMany({
            data: files.image.map((image) => ({
                image: image.filename,
                threadId: thread.id
            }))
        })
    }

    return thread
}




export const deleteThread = async (idThread: number, userId: number) => {
    const existedThread = await db.thread.findFirst({
        where: {
            id: idThread,
        },
    });

    if (!existedThread) {
        throw new Error("Thread not found");
    }

    if (existedThread.userId !== userId) {
        throw new Error("You don't have permission to delete this thread");
    }

    await db.thread.delete({
        where: {
            id: idThread,
        },
    });



    return true;
};

export const getReplies = async (threadId: number) => {
    return await db.thread.findMany({
        where: {
            threadId,
        },
        include: {
            image: {
                select: {
                    image: true,
                },
            },
            _count: {
                select: {
                    replies: true,
                },
            },
        },
    });
};