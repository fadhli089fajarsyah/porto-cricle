import React from 'react';
import { MdOutlinePersonSearch } from 'react-icons/md';
import { getUsers } from "../lib/call/user";
import { useAppSelector } from "../store";

interface IUser {
    id: number;
    username: string;
    fullname: string;
    email: string;
    profile?: {
        id?:number
        avatar?: string | null; 
    }
}

const Search: React.FC<IUser> = () => {
    const loggedInUser = useAppSelector(state => state.auth.user);
    const _host_url = "http://localhost:8080/uploads/";
    const avatarDefault = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/640px-User-avatar.svg.png";
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [searchResults, setSearchResults] = React.useState<IUser[]>([]);
    const [follow, setFollow] = React.useState(false);

    console.log("ini search", users);

    React.useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await getUsers(token);
                    setUsers(res.data);
                    setSearchResults(res.data); 
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchUsers();
    }, []);

    React.useEffect(() => {
        const results = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, users]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleLikeClick = () => {
        setFollow(!follow);
    };

    return (
        <div className='border border-[#262626] h-[100vh] p-3'>
            <form>
                <div className='flex bg-[#262626] p-3 rounded-full mt-5'>
                    <MdOutlinePersonSearch size={"27px"} />
                    <input
                        type="text"
                        placeholder='Search your friend'
                        className='outline-none flex-grow bg-transparent'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </form>

            <div>
                {searchTerm === "" ? (
                    <div className='w-full h-[60vh] flex justify-center items-center'>
                        <div className='text-center'>
                            <h1 className='text-[20px] font-bold'>No results for “asmorncd”</h1>
                            <p>Try searching for something else or check the </p>
                            <p>spelling of what you typed.</p>
                        </div>
                    </div>
                ) : (
                   
                    searchResults.map(user => (
                        
                        user.id !== loggedInUser?.id && (
                            <div key={user.id} className="w-280px flex justify-between gap-2 my-1 p-3">
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
                                    onClick={handleLikeClick}
                                >
                                    {follow ? "Following" : "Follow"}
                                </button>
                            </div>
                        )
                    ))
                )}
            </div>
        </div>
    );
}

export default Search;
