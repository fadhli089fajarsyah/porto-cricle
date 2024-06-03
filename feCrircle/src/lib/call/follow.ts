import API from "..";

export const getFollowing = async (token: string, followingId:number) => {
    try {
        const response = await API.get(`following/${followingId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getFollower = async (token: string, followerId:number) => {
    try {
        const response = await API.get(`follower/${followerId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};