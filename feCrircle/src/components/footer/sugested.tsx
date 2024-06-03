import { useEffect, useState } from "react";
import CardSugested from "./components/cardSugested";
import { getUsers } from "../../lib/call/user";
import { useAppDispatch, useAppSelector } from "../../store";
import API from "../../lib";
import { getFollowing } from "../../lib/call/follow";
import { IFollow } from "../../types/app";
import { SET_LOGIN } from "../../store/slice/auth";
import { getProfile } from "../../lib/call/profile";

interface IUser {
    id: number;
    username: string;
    fullname: string;
    email: string;
}

const Sugested = () => {
    const [suggestedUsers, setSuggestedUsers] = useState<IUser[]>([]);
    const dispatch = useAppDispatch();

    const profile = useAppSelector((state) => state.auth.user);

    const token = localStorage.getItem("token");
    const [following, setfollowing] = useState<IFollow[] | []>([])
    const [followingIdHasil, setFollowingIdHasil] = useState<number[] | []>([]);
    const followingId = profile?.user.id ?? 0;

    // console.log(followingIdHasil, "hasil");

    useEffect(() => {
        if (Array.isArray(following) && following.length > 0) {
            const ids = following.map(item => item.followingId).filter(id => id !== undefined) as number[];
            setFollowingIdHasil(ids);
        }
    }, [following]);

    const filterUsers = (allUsers: IUser[]) => {
        return allUsers.filter((user: IUser) => {
            return user.id !== profile?.id && !(followingIdHasil as number[]).includes(user.id);
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            if (!profile?.id || !token) {
                console.error("Profile ID or token not found");
                return;
            }
            try {
                const res = await getUsers(token);
                const allUsers: IUser[] = res.data;
                const filteredUsers: IUser[] = filterUsers(allUsers);
                // console.log(filteredUsers, "Filtered users");
                const shuffledUsers = filteredUsers.sort(() => 0.5 - Math.random());
                const randomUsers = shuffledUsers.slice(0, Math.min(5, shuffledUsers.length));
                setSuggestedUsers(randomUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [profile?.id, token, followingIdHasil]);


    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                console.error("Token not found");
                return;
            }
            try {
                if (profile?.user.id !== undefined) {
                    const res = await getFollowing(token, profile?.user.id);
                    const data = res.data
                    // console.log(data);
                    setfollowing(data);
                } else {
                    console.error("User ID not found");
                };
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [token, followingId]);

    useEffect(() => {
        console.log("Suggested users updated:", suggestedUsers);
    }, [suggestedUsers]);


    const handleFollowClickId = async (followingId: number) => {
        // console.log(followingId);
        if (!token) {
            throw new Error("Token not found");
        }
        try {
            await API.post(`follow`, JSON.stringify({ followingId }), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })


            const resProfile = await getProfile(token);

            dispatch(SET_LOGIN({ user: resProfile.data.data, token }))
        } catch (error) {
            console.error("Error liking user:", error);
        }
    };

    return (
        <div className="bg-[#262626] mt-8 p-5 rounded-xl h-[300px] sc overflow-y-auto">
            <h1 className="font-bold">Suggested for you</h1>
            <div className="pt-2 sc">
                {suggestedUsers.map((user: IUser) => (
                    <CardSugested
                        key={user.id}
                        user={user}
                        handleFollowClickId={() => handleFollowClickId(user.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sugested;
