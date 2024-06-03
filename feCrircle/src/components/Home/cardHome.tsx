import { BsChatSquareDots } from "react-icons/bs"
import { IThread } from "../../types/app";
import ButonLike from "./ButonLike";

interface IThreadCardProps {
    thread: IThread;
    callback?: () => void;
}

const cardHome: React.FC<IThreadCardProps> = ({ thread, callback }) => {
    
    const _host_url = "http://localhost:8080/uploads/";
    console.log(thread.threadId, "thread");
    

    return (
        <div className="flex border border-[#262626] p-3">
            <div className="w-[8%]">
                <img className="w-[40px] h-[40px] rounded-full" src={thread.author?.profile?.avatar ? _host_url + thread.author.profile.avatar : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/640px-User-avatar.svg.png'} alt="" />

            </div>

            <div className="ml-[20px] w-[100%]">
                <div className="flex mb-1 gap-2">
                    <p>{thread.author?.username}</p>
                    <p className="text-[#909090]">@{thread.author?.fullname}. 4h</p>
                </div>
                <p>{thread.content}</p>
                <div
                    className="
                    h-400px
                    flex
                    flex-wrap
                    w-auto "
                >
                    {thread.image &&
                        thread.image.map((image, index) => (
                            <img
                                className="rounded-[10px]"
                                key={index}
                                src={"http://localhost:8080/uploads/" + image.image}
                                alt="image"
                                style={{
                                    flex: 1,
                                    height: "300px",
                                    width: "50%",
                                    margin: "5px",
                                    objectFit: "cover",
                                }}
                            />
                        ))}
                </div>

                <div className="flex gap-5">
                        <ButonLike threadId={thread.id as number} callback={callback} thread={thread}/>
                        <p>{thread._count?.likes}</p>
                    {/* <button onClick={handleLikeClick}  className="flex items-center gap-1" >
                        <FaHeart color={liked ? "red" : ""} />
                        <p>{thread._count?.likes}</p>
                    </button> */}

                    <a href={`/replies/${thread.id}`} className="flex items-center gap-1"  >
                        <BsChatSquareDots />
                        <p>{thread._count?.replies}</p>
                    </a>
                </div>

            </div>
        </div>
    )
}

export default cardHome
