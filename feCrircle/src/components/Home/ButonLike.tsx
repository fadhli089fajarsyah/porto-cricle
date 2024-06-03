import React, { useEffect, useState } from "react";
import API from "../../lib";
import { FaHeart } from "react-icons/fa";
import { IThread } from "../../types/app";
import { useAppSelector } from "../../store";

interface ILikeButtonProps {
    threadId: number;
    thread: IThread
    callback?: () => void;
}

const ButtonLike: React.FC<ILikeButtonProps> = ({ threadId, callback, thread }) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(0);
    const [likedColor, setLikedColor] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false); // State untuk menandakan proses loading
    const user = useAppSelector((state) => state.auth.user);

    const getLike = async () => {
        try {
            const res = await API.get(`like/${threadId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const likes = res.data.data.like;
            setLiked(likes !== null);
            setLikesCount(likes ? likes.length : 0);
            if (thread.like) {
                setLikedColor(thread.like.some((like) => like.userId === user?.user.id));
            }
            setLikedColor(likesCount > 0);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLike = async () => {
        setIsLoading(true); // Menandakan proses loading dimulai
        try {
            const res = await API.post(
                "like",
                {
                    threadId: threadId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(res);
            await getLike();
            if (callback) callback();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false); // Menandakan proses loading selesai
        }
    };

    useEffect(() => {
        getLike();
    }, []);

    useEffect(() => {
        if (thread.like && user) {
            const isLikedByUser = thread.like.some((like) => like.userId === user.user.id);
            setLikedColor(isLikedByUser);
        }
    }, [thread.like, user,getLike]);

    return (
        <button aria-label="like" onClick={() => handleLike()} disabled={isLoading}>
            <FaHeart color={likedColor ? "red" : ""} />
        </button>
    );
};

export default ButtonLike;
