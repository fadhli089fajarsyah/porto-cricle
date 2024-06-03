import API from "..";

interface ILoginBody {
    username: string;
    password: string;
}
interface IRegisterBody {
    username: string;
    fullname: string;
    email: string;
    password: string;
}
interface IUserUpdateBody {
    username?: string;
    fullname?: string;
}


export const registerApi = async (body: IRegisterBody) => {
    try {
        const response = await API.post("register", body);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const loginApi = async (body: ILoginBody) => {
    return await API.post("login", body);
};
export const getUsers = async (token: string) => {
    try {
        const response = await API.get("users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

