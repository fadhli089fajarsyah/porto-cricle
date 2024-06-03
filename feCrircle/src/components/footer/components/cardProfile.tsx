import React from "react";
import { useAppSelector } from "../../../store"
import EditProfile from "../../editProfile";
import { FaWindowClose } from "react-icons/fa";

interface Props {
    styleImgCover: string,
    styleContainer: string,
    myProfile: any,
}

const  cardProfile = (props: Props) => {
    const [showEditPopup, setShowEditPopup] = React.useState(false);
    const profile = useAppSelector((state) => state.auth.user);

    // console.log(profile, "ini dari card profile"

    const _host_url = "http://localhost:8080/uploads/";
    // console.log("ini cuy", profile);
    const handleEditClick = () => {
        setShowEditPopup(true);
    };

    const handleEditPopupClose = () => {
        setShowEditPopup(false);
    };

    return (

        <div className={`${props.styleContainer}  p-5 rounded-lg w-[100%] mt-5 text-[16px]`}>
            {
                showEditPopup && (
                    <div className="fixed top-0 z-50 left-0 w-full h-full  bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="w-[40%] rounded-xl  bg-[#262626] pr-[30px] p-6 pt-y">
                            <div className="flex justify-between w-fullfont-bold text-[20px] ">
                                <h1>Edit Profile</h1>
                                <button className="" onClick={() => setShowEditPopup(false)}><FaWindowClose /></button>
                            </div>
                            <div >
                                <EditProfile handleCloseEditPopup={handleEditPopupClose} />
                            </div>
                        </div>
                    </div>
                )
            }
            <h1>{props.myProfile}</h1>
            <div className="relative mt-2">
                <img className={` w-[70px] h-[70px]  rounded-full  border-2 border-[#262626] absolute bottom-0 left-4 `} src={_host_url + profile?.avatar} alt="Avatar" />
                <img className={`${props.styleImgCover} w-full h-[100px] rounded-xl`} src={_host_url + profile?.cover} alt="Cover" />
                <div className="flex justify-end">
                    <button className="border border-white mt-3 px-4 py-1  rounded-full" onClick={handleEditClick}>
                        Edit Profile
                    </button>
                </div>
            </div>
            <div>
                <h2 className=" my-1">{profile?.user?.fullname}</h2>
                <p className="text-[#909090]">@{profile?.user?.username}</p>
                <p className=" my-1">{profile?.bio}</p>
                <div className="flex gap-4">
                    <div className="flex gap-1">
                        <p>{profile?.user._count?.following} </p>
                        <p className="text-[#909090]">Following</p>
                    </div>
                    <div className="flex gap-1">
                        <p>{profile?.user._count?.following} </p>
                        <p className="text-[#909090]">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cardProfile
