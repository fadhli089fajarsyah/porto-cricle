import API from "..";

// Like a thread
export const likeThread = async (likedForm: { threadId: number }) => {
    console.log(likedForm, "call lib");

    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }

    return await API.post(`like`, JSON.stringify(likedForm), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};
