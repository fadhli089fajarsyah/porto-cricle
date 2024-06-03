import React, { useState } from 'react';
import { getProfile, updateProfile } from '../lib/call/profile';
import { useAppDispatch, useAppSelector } from '../store';
import { SET_LOGIN } from '../store/slice/auth';
import { IProfile } from '../types/app';


const EditProfile: React.FC<any> = ({ handleCloseEditPopup }) => {
    const profile = useAppSelector((state) => state.auth.user);
    console.log(profile, "User edit form");
    const dispatch = useAppDispatch();
    const _host_url = "http://localhost:8080/uploads/";
    const [profileImage, setProfileImage] = useState<string>('');
    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const [formData, setFormData] = useState({
        fullname: profile?.user.fullname || '',
        username: profile?.user.username || '',
        bio: '',
    });

    console.log("ini form ", formData);

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackgroundImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }
            const formDataToSend = new FormData();

            if (formData.bio) {
                formDataToSend.append("bio", formData.bio);
            }
            if (formData.fullname) {
                formDataToSend.append("fullname", formData.fullname);
            }
            if (formData.username) {
                formDataToSend.append("username", formData.username);
            }
            console.log("fffff", formDataToSend);

            if (profileImage) {
                const base64Data = profileImage.split(',')[1];
                const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
                formDataToSend.append("avatar", blob, "profile.jpg");
            }

            if (backgroundImage) {
                const blob = await fetch(backgroundImage).then(res => res.blob());
                formDataToSend.append("cover", blob, "background.jpg");
            }
            console.log(formDataToSend);

            // const token = localStorage.getItem("token");
            const res = await updateProfile(formDataToSend, token);
            const get = await getProfile(token)
            dispatch(
                SET_LOGIN({
                    user: get.data.data as IProfile,
                    token: localStorage.getItem("token") as string,
                })
            )

            handleCloseEditPopup();
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <form onSubmit={handlePost}>
            <div className='relative'>
                <label htmlFor="profileImageInput">
                    <img className='w-[70px] h-[70px] rounded-full border-[4px] border-[#262626] absolute bottom-[-35px] left-8 cursor-pointer' src={profileImage || _host_url + profile?.avatar} alt="Profile" />
                    <input name='profileImageInput' type="file" id="profileImageInput" className="hidden" onChange={handleProfileImageChange} />
                </label>
                <label htmlFor="backgroundImageInput">
                    <div className='cursor-pointer'>
                        <img className='h-[100px] w-full rounded-xl cursor-pointer' src={backgroundImage || _host_url + profile?.cover} alt="Background" />
                    </div>
                    <input name='backgroundImageInput' type="file" id="backgroundImageInput" className="hidden" onChange={handleBackgroundImageChange} />
                </label>
            </div>

            <div className='mt-[40px] text-[13px] flex flex-col border border-[#545454] p-2 rounded-xl'>
                <label htmlFor="fullname" className='color-[#B2B2B2] text-[#B2B2B2]'>fullname</label>
                <input type="text" name="fullname" id="fullname" value={formData.fullname} onChange={handleChange} placeholder='fullname' className='outline-none flex-grow bg-transparent' />
            </div>

            <div className='flex mt-2 text-[13px] flex-col border border-[#545454] p-2 rounded-xl'>
                <label htmlFor="username" className='color-[#B2B2B2] text-[#B2B2B2]'>Username</label>
                <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} placeholder='Username' className='outline-none flex-grow bg-transparent' />
            </div>

            <div className='flex mt-2 text-[13px] flex-col border border-[#545454] p-2 rounded-xl'>
                <label htmlFor="bio" className='color-[#B2B2B2] text-[#B2B2B2]'>Bio</label>
                <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange} placeholder='Bio' className='h-[100px] outline-none flex-grow bg-transparent'></textarea>
            </div>

            <div className='w-full flex justify-end mt-3' >
                <button type="submit" className="px-5 h-8 rounded-full bg-[#005e0e] flex justify-center items-center">Save</button>
            </div>
        </form>
    );
};

export default EditProfile;
