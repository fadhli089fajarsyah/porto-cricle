import { registerApi } from "../../lib/call/user";
import Buton from "../button"
import React from "react";

const index = () => {

    const [formInput, setFormInput] = React.useState<{
        username: string;
        fullname: string;
        email: string;
        password: string;
    }>({
        username: "",
        password: "",
        fullname: "",
        email: "",
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await registerApi(formInput);
                return response;
                window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };
    const handleRegisterReload =()=>{
        window.location.reload();
    }
    return (
        <form onSubmit={handleRegister} className=" w-[500px] p-7 rounded-xl bg-zinc-900">
            <h1 className="text-[30px] font-bold text-[#04A51E]">
                cricle
            </h1>
            <h1 className="text-[30px] font-bold text-white mb-5">
                Create account Circle
            </h1>

            <div>
                <input type="text" value={formInput.username} onChange={(e) => setFormInput({ ...formInput, username: e.target.value })} name="username" id="username" placeholder="Username*" className="bg-none border-[#262626] w-full rounded-xl px-2 p-1 outline-none flex-grow bg-transparent border mb-2  " />
            </div>
            <div>
                <input type="text" value={formInput.password} onChange={(e) => setFormInput({ ...formInput, password: e.target.value })} name="password" id="password" placeholder="Password*" className="bg-none border-[#262626] w-full rounded-xl px-2 p-1 outline-none flex-grow bg-transparent border mb-2  " />
            </div>

            <div>
                <input type="text" value={formInput.fullname} onChange={(e) => setFormInput({ ...formInput, fullname: e.target.value })} name="fullname" id="fullname" placeholder="fullname*" className="bg-none border-[#262626] w-full rounded-xl px-2 p-1 outline-none flex-grow bg-transparent border mb-2  " />
            </div>
            <div>
                <input type="text" value={formInput.email} onChange={(e) => setFormInput({ ...formInput, email: e.target.value })} name="email" id="email" placeholder="Email*" className="bg-none border-[#262626] w-full rounded-xl px-2 p-1 outline-none flex-grow bg-transparent border mb-2  " />
            </div>

            <button type="submit" className="flex w-full justify-center"  onClick={handleRegisterReload}>
                <Buton textbuton="Register" clas="w-full"/>
            </button>
            
        </form>
    )
}

export default index
