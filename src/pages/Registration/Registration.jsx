import { useNavigate } from "react-router-dom";

function Registration(){
    const navigate = useNavigate();
    return(
        <div className="m-10">
            <div className="flex flex-col justify-center items-center gap-10">
                <h1 className="text-xl md:text-3xl font-bold">REGISTRATION</h1>
                <button onClick={() => navigate("/register/playerregistration")} className="w-[300px] h-[50px] bg-gray-200 hover:bg-gray-400 rounded-md">Student Registration</button>
            </div>
        </div>
    );
};

export default Registration;