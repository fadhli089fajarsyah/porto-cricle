import CardHome from "../components/Home/cardHome"
import React from "react";
import { getThreads } from "../lib/call/thread"
import { IThread } from "../types/app";
import IpnThread from "../components/Home/ipnThread";

const Home = () => {
    const [threads, setThreads] = React.useState<IThread[] | []>([]);

    // console.log(threads,"threadhome");
    
    
    async function getThread() {    
        try {
            const res = await getThreads();
            setThreads(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    

    React.useEffect(() => {
        getThread();
    }, []);

    return (
        <div>

            <IpnThread callback={getThread}/>

            <div className="pt-[110px]">
                {threads.map((thread) => (
                    <CardHome key={thread.id} thread={thread} callback={getThread} />
                ))}
            </div>
        </div>
    )
}

export default Home
