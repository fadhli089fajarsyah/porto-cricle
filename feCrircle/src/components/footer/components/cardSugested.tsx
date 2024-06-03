

interface IUser {
    id: number;
    username: string;
    fullname: string;
    email: string;
    profile?: {
        id?: number
        avatar?: string | null;
    }
}


interface ICardSugestedProps {
    user: IUser;
    handleFollowClickId: () => void;
}

const CardSugested: React.FC<ICardSugestedProps> = ({ user,handleFollowClickId }) => {
    // console.log("ini userssss", user);
    const _host_url = "http://localhost:8080/uploads/";
    const avatarDefault = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/640px-User-avatar.svg.png"
    

    return (
        <div className="w-280px flex justify-between gap-2 my-1 p-3">
            <div className="flex gap-2">
                <img
                    className="h-12 w-12 rounded-full"
                    src={user.profile?.avatar ? _host_url + user.profile.avatar : avatarDefault}
                    alt="Avatar"
                />
                <div className="flex flex-col justify-start">
                    <p className="text-base">{user.username}</p>
                    <p className="text-gray-500">@{user.fullname}</p>
                </div>
            </div>

            <button
                className="border border-white mt-3 px-4 py-1 rounded-full text-sm"
                onClick={handleFollowClickId}
            >
                {/* {follow ? "Following" : "Follow"} */}follow
            </button>
        </div>
    );
};

export default CardSugested;
