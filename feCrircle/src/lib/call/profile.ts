import API from "..";



export const getProfile = async (token: string) => {
    return await API.get("profile", {
        headers: { Authorization: `Bearer ${token}` },
    });
};


export const updateProfile = async (formData: FormData, token: string) => {
    return await API.patch("profileEdit", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
};
