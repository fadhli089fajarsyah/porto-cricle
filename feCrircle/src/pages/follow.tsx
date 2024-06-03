import { useEffect, useState } from 'react';
import Follow from '../components/follow';
import { getFollowing } from '../lib/call/follow';
import { useAppDispatch, useAppSelector } from '../store';
import API from '../lib';
import { SET_LOGIN } from '../store/slice/auth';
import { getProfile } from '../lib/call/profile';
import { IFollow } from '../types/app'; // Import IFollow type

const ProfilePage = () => {
    const [activeLink, setActiveLink] = useState<string>('followers');
    const toggleActiveLink = (link: string) => {
        setActiveLink(link);
    };
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.auth.user);
    const followingId = profile?.user.follower?.map(follower => follower.followingId) ?? [];
    // Use optional chaining
    const token = localStorage.getItem("token");
    const _host_url = "http://localhost:8080/uploads/";
    const avatarDefault = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/640px-User-avatar.svg.png";
    const [following, setFollowing] = useState<IFollow[]>([]);
console.log(following,"ini follwoing");

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
                    console.log(data,"ini data");
                    setFollowing(data);
                } else {
                    console.error("User ID not found");
                };
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [token, profile]);


    const handleFollowClickId = async (followingId: any) => {
        if (!token) {
            throw new Error("Token not found");
        }
        try {
            await API.post(`follow`, JSON.stringify({ followingId }), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const resProfile = await getProfile(token);
            dispatch(SET_LOGIN({ user: resProfile.data.data, token }));
        } catch (error) {
            console.error("Error liking user:", error);
        }
    };

    return (
        <div>
            <div className='flex w-full justify-between'>
                <div onClick={() => toggleActiveLink('followers')} className={`w-[50%] p-3 cursor-pointer flex justify-center items-center relative`}>
                    <a href="#" className='border-b-2 border-transparent'>Followers</a>
                    {activeLink === 'followers' && <div className='absolute bottom-0 left-0 right-0 h-0 border-b-2 border-green-500 transition-transform duration-300 origin-bottom'></div>}
                </div>
                <div onClick={() => toggleActiveLink('following')} className={`w-[50%] p-3 cursor-pointer flex justify-center items-center relative`}>
                    <a href="#" className='border-b-2 border-transparent'>Following</a>
                    {activeLink === 'following' && <div className='absolute bottom-0 left-0 right-0 h-0 border-b-2 border-green-500 transition-transform duration-300 origin-bottom'></div>}
                </div>
            </div>

            {activeLink === 'followers' && (
                <div className=''>

                </div>
            )}

            {activeLink === 'following' && (
                <div className=''>
                    {/* {profile?.user?.follower?.map((user: IFollow) => {
                        console.log(user.follower?.profile?.avatar,"usermaping");
                        return (
                            <div key={user.id}>
                                <div className="w-280px flex justify-between gap-2 my-1 p-3">
                                    <div className="flex gap-2">
                                        <img
                                            className="h-12 w-12 rounded-full"
                                            src={_host_url + user.follower?.profile?.avatar} // Access avatar property safely
                                            alt="Avatar"
                                        />
                                        <div className="flex flex-col justify-start">
                                            <p className="text-base">{user.follower?.fullname}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="border border-white mt-3 px-4 py-1 rounded-full text-sm"
                                        onClick={() => handleFollowClickId(user.followingId)}
                                    >
                                        unfollow
                                    </button>
                                </div>
                            </div>
                        );
                    })} */}


                </div>
            )}
        </div>
    );
};

export default ProfilePage;
