export interface IRegister {
    username: string
    password: string
    email: string
    fullname: string

}
export interface IAuthId {
    id: string
}
export interface IProfile {
    bio?: string,
    avatar?: string,
    userId?: number,
    cover?: string
}


export interface IThread {
    id?: number;
    content?: string;
    userId: number;
    threadId?: number;
}

export interface IUser {
    username?: string,
    fullname?: string
}

export interface IEditProfile {
    bio?: string;
    avatar?: string;
    cover?: string;
    username?: string;
    fullname?: string;
}
