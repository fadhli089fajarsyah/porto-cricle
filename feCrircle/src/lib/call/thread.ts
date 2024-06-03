import API from "..";

export const getThreads = async () => {
    return await API.get("threads");
};

export const createThread = async (body: {
    content: string;
    image: FileList | null;
    threadId?: number;
}) => {
    const formData = new FormData();
    console.log(body);

    localStorage.getItem("token");
    // console.log("Token create:", token);

    if (body.image !== null) {
        for (let i = 0; i < body.image.length; i++) {
            formData.append("image", body.image[i]);
        }
        // formData.append("image", body.image);
    }

    if (body.threadId) {
        formData.append("threadId", body.threadId.toString());
    }

    formData.append("content", body.content);

    return await API.post("threadAdd", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};


export const getThreadById = async (id: number) => {
    return await API.get(`thread/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const getReplies = async (id: number) => {
    localStorage.getItem("token");
    // console.log("Token getreplies:", token);
    return await API.get(`replies/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

