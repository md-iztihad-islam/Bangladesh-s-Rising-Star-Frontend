import { useNavigate, useParams } from "react-router-dom";
import { useSearchPlayerQuery } from "../../../api/authApi";

function SearchProfile(){
    const navigate = useNavigate();
    const params = useParams();
    const email = params.email;
    const {data} = useSearchPlayerQuery(email, {skip: email === ""});
    const playerData = data?.data;

    return(
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Profile of {data?.data.name}</h1>
                <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start gap-10 md:gap-30 mt-10">

                    <div className="w-[200px] h-[200px]">
                        <img src="https://imageio.forbes.com/specials-images/imageserve/663e595b4509f97fdafb95f5/0x0.jpg?format=jpg&crop=383,383,x1045,y23,safe&height=416&width=416&fit=bounds" alt="" />
                    </div>

                    <div className="text-sm mdLtext-lg w-full text-wrap">
                        <pre>Registration No  : {playerData?.registrationNo}</pre>
                        <pre>ID No            : {playerData?._id}</pre>
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
                    <button onClick={() => navigate("/admin/searchplayer")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 rounded-md">Back</button>
                </div>
            </div>
        </div>
    );
};

export default SearchProfile;