import { LuImagePlus } from 'react-icons/lu'
import { createThread } from "../../../lib/call/thread";
import { useState } from 'react';

interface IThreadPostProps {
    threadId?: number;
    callback?: () => void;
}


const ipnReplies: React.FC<IThreadPostProps> =({ threadId, callback }) => {
    const [threadPost, setThreadPost] = useState<{
        content: string;
        image: FileList | null;
        threadId?: number;
    }>({ content: "", image: null });
console.log(threadPost,"ini post ");

    
    const handlePostThread = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            if (threadId) {
                threadPost.threadId = threadId;
            }

            console.log(threadId),"ini thread id";

            await createThread(threadPost);

            // console.log(res);

            if (callback) {
                await callback();
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <form className=" bg-[#1d1d1d] w-full">
                <div className="flex p-2 border  border-[#262626]">
                    <img className="w-[40px] h-[40px] rounded-full" src="https://neweralive.na/storage/images/2023/may/lloyd-sikeba.jpg" alt="" />
                    <input
                        type="text"
                        name="content"
                        id="content"
                        className=" outline-none flex-grow bg-transparent"
                        placeholder="  Type your reply!"
                        value={threadPost.content}
                        onChange={(e) =>
                            setThreadPost({ ...threadPost, content: e.target.value })
                        }
                    />
                    <label htmlFor="image" className="dlex justify-center items-center h-full mt-2 mr-2 cursor-pointer">
                        <span className="sr-only">Pilih gambar</span>
                        <LuImagePlus size={"30px"} />

                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                            setThreadPost({ ...threadPost, image: e.target.files });
                        }}
                    />
                    <button onClick={handlePostThread} className="px-7 h-12 rounded-full bg-[#005e0e] flex justify-center items-center">post</button>
                </div>
            </form>
        </div>
    )
}

export default ipnReplies
