import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReplies, getThreadById } from "../../lib/call/thread";
import { IThread } from "../../types/app";
import { FaRegHeart } from "react-icons/fa";
import { BsChatSquareDots } from "react-icons/bs";
import IpnReplies from "./components/ipnReplies";
import CardReplies from "./components/cardReplies";



const replies = () => {
    const { threadId } = useParams();

    console.log("ini idthredparam", threadId);

    const [threadDetail, setThreadDetail] = useState<IThread>({
        userId: 0,
        content: "",
        image: [],
        id: 0,
    });
    // console.log("ini detail thread mge user", threadDetail.image);


    const [replies, setReplies] = useState<IThread[]>([]);
    // console.log("ini replies", replies);

    const fetchThreadDetail = async () => {
        try {
            const res = await getThreadById(Number(threadId));
            console.log(res);

            const resReplies = await getReplies(Number(threadId));

            setThreadDetail(res.data.data);
            setReplies(resReplies.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchThreadDetail();
    }, [threadId]);

    return (
        <div className="overflow-auto w-full">
            <div className="flex border flex-col border-[#262626] p-3">
                <div className="mb-5">
                    <a href="/" className="text-[25px]">🡸 Home</a>
                </div>
                <div className="flex">


                    <img className="w-[40px] h-[40px] rounded-full" src="https://neweralive.na/storage/images/2023/may/lloyd-sikeba.jpg" alt="" />

                    <div className="ml-[20px]">
                        <div className="flex mb-1 gap-2">
                            <p>{threadDetail.author?.fullname}</p>
                            <p className="text-[#909090]">@indahpra . 4h</p>
                        </div>
                        <p>{threadDetail.content}</p>
                        <div
                            className="
                    h-400px
                    flex
                    flex-wrap
                    w-auto "
                        >
                            {threadDetail.image &&
                                threadDetail.image.map((image, index) => (
                                    <img
                                        key={index}
                                        src={"http://localhost:8080/uploads/" + image.image}
                                        alt="image"
                                        style={{
                                            // width: "100%",
                                            flex: 1,
                                            height: "300px",
                                            width: "50%",
                                            borderRadius: "20px",
                                            objectFit: "cover",
                                        }}
                                    />
                                ))}
                        </div>

                        <div className="flex gap-5">
                            <a href="" className="flex items-center gap-1" >
                                <FaRegHeart />
                                <p>36 </p>
                            </a>

                            <a href={`/replies/${threadDetail.id}`} className="flex items-center gap-1"  >
                                <BsChatSquareDots />
                                <p>{threadDetail._count?.replies}</p>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            <IpnReplies callback={fetchThreadDetail}
                threadId={Number(threadId)} />

            {replies.map((replies) => (
                <CardReplies key={replies.id} replies={replies} />
            ))}
        </div>

    )
}

export default replies
