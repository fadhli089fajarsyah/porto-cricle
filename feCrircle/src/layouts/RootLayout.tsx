import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar"
import Footer from "../components/footer"
import { useAppDispatch } from "../store";
import { getProfile } from "../lib/call/profile";
import { SET_LOGIN } from "../store/slice/auth";
import { useEffect } from "react";


const RootLayout = () => {
    const dispatch = useAppDispatch();
    


    const checkToken = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await getProfile(token);
            dispatch(SET_LOGIN({ user: res.data.data, token }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);



    return (
        <div className="flex justify-between bg-[#1d1d1d] text-white h-[100vh] w-full fixed">
            <div className="w-[22%]">
                <Sidebar />
            </div>
            
            <div className="w-[48%] overflow-auto sc" >
                <Outlet />
            </div>

            <div className="w-[30%] overflow-auto sc flex flex-col items-center">
                <Footer />
            </div>

        </div>
    )
}

export default RootLayout;
