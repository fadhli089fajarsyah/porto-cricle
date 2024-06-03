import React from 'react'
import { BsChatSquareDots } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import { IThread } from "../../../types/app";

interface IThreadCardProps {
    replies: IThread;
}

const cardReplies:React.FC<IThreadCardProps> = ({replies}) => {
    return (
        <div>
            <div className="flex border flex-col border-[#262626] p-3">
                <div className="flex">


                    <img className="w-[40px] h-[40px] rounded-full" src="https://neweralive.na/storage/images/2023/may/lloyd-sikeba.jpg" alt="" />

                    <div className="ml-[20px]">
                        <div className="flex mb-1 gap-2">
                            <p>{replies.author?.fullname}</p>
                            <p className="text-[#909090]">@indahpra . 4h</p>
                        </div>
                        <p>{replies.content}</p>
                        <div
                            className="
                    h-400px
                    flex
                    flex-wrap
                    w-auto "
                        >
                            {replies.image &&
                                replies.image.map((image, index) => (
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

                            <a href={`/replies/${replies.id}`} className="flex items-center gap-1"  >
                                <BsChatSquareDots />
                                <p>{replies._count?.replies}</p>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default cardReplies
