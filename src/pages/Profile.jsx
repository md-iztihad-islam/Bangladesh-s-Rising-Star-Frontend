import { useNavigate } from "react-router-dom";
import { useLoadUserQuery, useLogoutPlayerMutation } from "../api/authApi";
import { useEffect } from "react";

function Profile(){
    const navigate = useNavigate();
    const {data} = useLoadUserQuery();
    const playerData = data?.data;

    const [logoutPlayer, {isSuccess, isError}] = useLogoutPlayerMutation();

    const handleSignOut = async () => {
        await logoutPlayer();
        navigate("/");
    }

    useEffect(() => {
        if(isSuccess){
            <div className="toast">
                <div className="alert alert-info">
                    <span>{data?.message || "Hello"}</span>
                </div>
            </div>
        }
        if(isError){
            <div className="toast">
                <div className="alert alert-error">
                    <span>{data?.message || "Sorry"}</span>
                </div>
            </div>
        };
    }, [isSuccess, isError]);

    return(
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Profile of {data?.data.name}</h1>
                <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start gap-10 md:gap-30 mt-10">

                    <div className="w-[200px] h-[200px]">
                        <img src={playerData?.photo} alt="" />
                    </div>

                    <div className="text-sm mdLtext-lg w-full text-wrap">
                        <pre>Registration No  : {playerData?.registrationNo}</pre>
                        <pre>Name             : {playerData?.name}</pre>
                        <pre>Father's Name    : {playerData?.fatherName}</pre>
                        <pre>Mother's Name    : {playerData?.motherName}</pre>
                        <pre>Date of Birth    : {playerData?.dateOfBirth}</pre>
                        <pre>Age              : {playerData?.age}</pre>
                        <pre>Blood Group      : {playerData?.bloodGroup}</pre>
                        <pre>Religion         : {playerData?.religion}</pre>
                        <pre>Email            : {playerData?.email}</pre>
                        <pre>Phone            : {playerData?.phone}</pre>
                        <pre className="text-wrap">Address          : {playerData?.address}</pre>
                        <pre>District         : {playerData?.district}</pre>
                        <pre>Institution Name : {playerData?.institution}</pre>
                        <pre>Class            : {playerData?.studyingClass}</pre>
                        <pre>Team             : {playerData?.team}</pre>
                        <pre>Position         : {playerData?.position}</pre>
                        <pre>Tournament       : {playerData?.tournament}</pre>
                    </div>

                </div>

                <div>
                    <button onClick={handleSignOut} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 rounded-md">Sign Out</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;