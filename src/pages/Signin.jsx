import { useEffect, useState } from "react";
import { useLoadUserQuery, useLoginPlayerMutation } from "../api/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signin(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginPlayer, {data, isSuccess, isError, error}] = useLoginPlayerMutation();
    const {data: playerData} = useLoadUserQuery();

    const loginData = {
        email: email,
        password: password,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginPlayer(loginData);
    };

    useEffect(() => {
        if(isSuccess){
            navigate("/");
        }
        if(isError){
            alert("Invalid email or password");
        }
    }, [isSuccess, isError]);
    return(
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mt-10 mb-10 border-2 p-5 w-[40%]">
                <h1 className="text-xl md:text-3xl font-bold mb-10">Sign in</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="mail@site.com" required/>
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter your password" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        </div>


                        <div>
                            <button type="submit" className="h-[40px] w-[100px] bg-gray-300 hover:bg-gray-400 rounded-md">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;