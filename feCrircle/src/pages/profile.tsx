import React from 'react';
import Profile from '../components/footer/components/cardProfile';
import CardHome from '../components/Home/cardHome';
import { getThreads } from "../lib/call/thread"
import { IThread } from "../types/app";
import { useAppSelector } from "../store";

const ProfilePage = () => {
    const { user: profile } = useAppSelector((state) => state.auth)
    const [activeLink, setActiveLink] = React.useState<string>('all'); // 'all' or 'media'
    const [threads, setThreads] = React.useState<IThread[]>([]);


    const toggleActiveLink = (link: string) => {
        setActiveLink(link);
    };

    const loggedInUser = useAppSelector(state => state.auth.user); // Get logged in user from Redux store
    // console.log(loggedInUser?.id);



    React.useEffect(() => {
        const getThread = async () => {
            try {
                const res = await getThreads();
                const allThreads = res.data.data;
                const filteredThreads = allThreads.filter((thread: IThread) =>
                    thread.userId === profile?.user.id
                );



                setThreads(filteredThreads);
            } catch (error) {
                console.log(error);
            }
        };

        getThread();
    }, [loggedInUser]);

    return (
        <div>

            <Profile myProfile="" styleImgCover='h-[170px]' styleContainer='bg-[#1d1d1d]' />
            <div className='flex w-full justify-between'>
                <div onClick={() => toggleActiveLink('all')} className={`w-[50%] cursor-pointer flex justify-center items-center relative`}>
                    <a href="#" className='border-b-2 border-transparent'>ALL POST</a>
                    {activeLink === 'all' && <div className='absolute bottom-0 left-0 right-0 h-0 border-b-2 border-green-500 transition-transform duration-300 origin-bottom'></div>}
                </div>
                <div onClick={() => toggleActiveLink('media')} className={`w-[50%] cursor-pointer flex justify-center items-center relative`}>
                    <a href="#" className='border-b-2 border-transparent'>Media</a>
                    {activeLink === 'media' && <div className='absolute bottom-0 left-0 right-0 h-0 border-b-2 border-green-500 transition-transform duration-300 origin-bottom'></div>}
                </div>
            </div>

            {activeLink === 'all' && (
                <div>
                    <div className="">
                        {threads.map((thread: IThread) => (
                            <CardHome key={thread.id} thread={thread} />
                        ))}
                    </div>
                </div>
            )}

            {activeLink === 'media' && (
                <div className='flex flex-wrap'>
                    {threads.map((thread: IThread) => (
                        thread.image &&
                        thread.image.map((image, index) => (
                            <img
                                key={index}
                                src={"http://localhost:8080/uploads/" + image.image}
                                alt="image"
                                style={{
                                    // width: "100%",
                                    flex: 1,
                                    height: "300px",
                                    width: "30%",
                                    objectFit: "cover",
                                    margin: "5px"
                                }}
                            />
                        ))
                    ))}
                </div>
            )}


        </div>
    );
};

export default ProfilePage;
