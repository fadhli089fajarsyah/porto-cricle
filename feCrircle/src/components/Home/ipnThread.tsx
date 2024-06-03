import React, { useEffect, useState } from "react";
import { createThread } from "../../lib/call/thread";
import { LuImagePlus } from "react-icons/lu";
import { useAppSelector } from "../../store";


interface IThreadPostProps {
    threadId?: number;
    callback?: () => void;
}

const ipnThread: React.FC<IThreadPostProps> = ({ threadId, callback }) => {
    const profile = useAppSelector((state) => state.auth.user);
    const _host_url = "http://localhost:8080/uploads/";

    const [threadPost, setThreadPost] = useState<{
        content: string;
        image: FileList | null;
        threadId?: number;
        imageUrl?: string; // Add imageUrl state to store the temporary URL of the image
    }>({ content: "", image: null });

    const handlePostThread = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (threadId !== undefined) {
                setThreadPost({ ...threadPost, threadId });
            }

            const res = await createThread(threadPost);

            setThreadPost({
                content: "", image: null
            })

            if (callback) {
                callback();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThreadPost({
                ...threadPost,
                image: e.target.files,
                imageUrl: URL.createObjectURL(file) // Create temporary URL for selected image
            });
        }
    };

    return (
        <form className="fixed z-2 bg-[#1d1d1d] w-[48%]">
            <h1 className="text-[30px] border-[#262626] border border-botom-none">Home</h1>
            <div className="flex p-2 border  border-[#262626]">
                <img className="w-[40px] h-[40px] rounded-full" src={profile?.avatar ? _host_url + profile.avatar : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/640px-User-avatar.svg.png'} alt="" />
                <input
                    type="text"
                    name="content"
                    id="content"
                    className=" outline-none flex-grow bg-transparent"
                    placeholder="  What is happening?!"
                    value={threadPost.content}
                    onChange={(e) =>
                        setThreadPost({ ...threadPost, content: e.target.value })
                    }
                />
                <div className="flex justify-center items-center">
                    {threadPost.image && Array.from(threadPost.image).map((file, index) => (

                        <div key={index}>
                            <img src={URL.createObjectURL(file)} alt={`Selected ${index}`} className="max-w-[50px] max-h-[50px]" />
                        </div>

                    ))}
                </div>
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
                    onChange={handleImageChange} // Call handleImageChange when file input changes
                />
                {/* Display the selected image if there's any */}
                <button onClick={handlePostThread} className="px-7 h-12 rounded-full bg-[#005e0e] flex justify-center items-center">post</button>
            </div>
        </form>
    )
}

export default ipnThread;
