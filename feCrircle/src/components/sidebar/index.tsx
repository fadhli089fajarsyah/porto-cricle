import { CgProfile } from "react-icons/cg"
import { FaRegHeart } from "react-icons/fa"
import { MdOutlinePersonSearch } from "react-icons/md"
import { RiHome7Fill } from "react-icons/ri"
import Buton from "../button"
import React from "react"
import LoginForm from "../loginForm"
import { SET_LOGOUT } from "../../store/slice/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import Register from "../regrister"

const index = () => {
    const auth = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();
    const [showLoginPopup, setShowLoginPopup] = React.useState(false);
    const [showRegisterPopup, setShowRegisterPopup] = React.useState(false);

    const handleLoginClick = () => {
        setShowLoginPopup(true);
    };
    const handleLoginClickRegister = () => {
        setShowRegisterPopup(true);
    };



    return !auth.user ? (
        <div className="flex">
            <button onClick={handleLoginClick}>Login</button>
            <p>|</p>
            <button onClick={handleLoginClickRegister}>Register</button>
            {
                showLoginPopup && (
                    <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="">
                            <button className="flex justify-end w-full text-red-700 font-bold text-[20px] bg-zinc-900 pr-[30px] p-2" onClick={() => setShowLoginPopup(false)}>Close</button>
                            <div >
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showRegisterPopup && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="">
                            <button className="flex justify-end w-full text-red-700 font-bold text-[20px] bg-zinc-900 pr-[30px] p-2" onClick={() => setShowRegisterPopup(false)}>Close</button>
                            <div >
                                <Register />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    ) : (

        <div className="pt-1 px-8 h-full" >
            <div className="text-[18px] h-[48vh] flex flex-col justify-between ">
                <h1 className="text-[50px] font-bold text-[#04A51E]">
                    cricle
                </h1>
                <a href="/" className="flex gap-4  items-center hover:scale-110 transition-transform">
                    <RiHome7Fill />
                    <p>Home</p>
                </a>
                <a href="/search" className="flex gap-4 items-center hover:scale-110 transition-transform">
                    <MdOutlinePersonSearch />
                    <p>Search</p>
                </a>
                <a href="/follow" className="flex gap-4 items-center hover:scale-110 transition-transform">
                    <FaRegHeart />
                    <p>Follows</p>
                </a>
                <a href="/profile" className="flex gap-4 items-center hover:scale-110 transition-transform">
                    <CgProfile />
                    <p>Profile</p>
                </a>
                <button>
                    <Buton textbuton="Create Post" />
                </button>
            </div>


            <div
                className="
                h-[50vh] 
                pb-5 
                flex 
                items-end
                gap-5"
            >

                <button onClick={() => {
                    dispatch(SET_LOGOUT());
                }}>Logout</button>


            </div>

        </div>
    )

}

export default index
