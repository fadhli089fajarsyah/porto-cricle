export interface IThread {
    id?: number | undefined;
    content?: string;
    image?: IThread[];
    userId: number;
    threadId?: number;
    author?: IUser;
    _count?: {
        replies: number
        likes: number;
    }
    like?: [
        {
            threadId?: number | undefined,
            userId?: number | undefined
        }
    ]
}

export interface IThreadImage {
    image?: string;
}
export interface IUser {
    id?: number;
    username?: string;
    fullname?: string;
    email?: string;
    profile?: IProfile;
    follower?: IFollow[];
    following?: [];
    _count?: {
        follower: number;
        following: number;
    };
}


export interface IFollow {
    id?: number;
    followerId?: number;
    followingId?: number;
    following?: IUser;
    follower?: IUser;
}
export interface IProfile {
    id?: number | undefined;
    bio?: string;
    avatar?: string;
    cover?: string;
    user: IUser;
}

export interface IReplies {
    id?: number;
    content?: string;
    image?: IThread[];
    userId: number;
    threadId?: number;
    _count?: { replies: number }
}

