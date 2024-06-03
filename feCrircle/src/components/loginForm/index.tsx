import Buton from "../button"
import React from "react";
import { loginApi } from "../../lib/call/user";
import { getProfile } from "../../lib/call/profile";
import { useAppDispatch } from "../../store";
import { SET_LOGIN } from "../../store/slice/auth";

const index = () => {
    const dispatch = useAppDispatch();

    const [formInput, setFormInput] = React.useState<{
        username: string;
        password: string;
    }>({
        username: "",
        password: "",
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // console.log(formInput);
            const res = await loginApi(formInput);
            // console.log(res);
            const token = res.data.token
            localStorage.setItem("token", token);
            // console.log("Token disimpan:", token);
            const resProfile = await getProfile(token);
            window.location.reload();
            dispatch(SET_LOGIN({ user: resProfile.data.data, token }))
            // window.location.reload();
            // console.log(resProfile);


        } catch (error) {
            console.log(error);
        }
    };
    const clickReload=()=>{
        window.location.reload();
    }
    return (
        <form onSubmit={handleLogin} className=" w-[500px] p-7 rounded-xl bg-zinc-900">
            <h1 className="text-[30px] font-bold text-[#04A51E]">
                cricle
            </h1>
            <h1 className="text-[30px] font-bold text-white mb-5">
                Login to cricle
            </h1>

            <div>
                <input type="text" value={formInput.username} onChange={(e) => setFormInput({ ...formInput, username: e.target.value })} name="username" id="username" placeholder="Email/Username*" className="bg-none border-[#262626] w-full rounded-xl px-2 p-1 outline-none flex-grow bg-transparent border mb-2  " />
            </div>
            <div>
                <input type="text" value={formInput.password} onChange={(e) => setFormInput({ ...formInput, password: e.target.value })} name="password" id="password" placeholder="Password*" className="bg-none border-[#262626] w-full rounded-xl px-2 p-1 outline-none flex-grow bg-transparent border mb-2  " />
            </div>

            <a className="flex justify-end my-2 mb-3" href="">Forgot Password?</a>
            <button type="submit" className="flex w-full justify-center">
                <Buton textbuton="Login" clas="w-full" />
            </button>

            <div className="flex">
                <p>Don't have an account yet?</p>
                <a href="" className=" text-[#04A51E]">Create account</a>
            </div>
        </form>
    )
}

export default index
