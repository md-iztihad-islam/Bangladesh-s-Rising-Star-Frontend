import { useNavigate, useParams } from "react-router-dom";
import { useGetTeamByIdQuery, useUpdateTeamDataMutation } from "../../../api/tournamentApi";
import { useEffect, useState } from "react";

function UpdateTeamData(){


    const navigate = useNavigate();
    const params = useParams();
    const tournamentId = params.tournamentId;
    const teamId = params.teamId;
    const [ registrationNo, setRegistrationNo ] = useState("");
    const [ teamName, setTeamName ] = useState("");
    const [ institutionName, setInstitutionName ] = useState("");
    const [ teamDescription, setTeamDescription ] = useState("");
    const [ teamManagerName, setTeamManagerName ] = useState("");
    const [teamGroup, setTeamGroup] = useState("");

    const {data, refetch} = useGetTeamByIdQuery({tournamentId, teamId});
    const teamData = data?.data;

    const [updateTeamData, {isSuccess, isError}] = useUpdateTeamDataMutation();



    useEffect(() => {
        if(teamData){
            setRegistrationNo(teamData.registrationNo);
            setTeamName(teamData.teamName);
            setInstitutionName(teamData.institutionName);
            setTeamDescription(teamData.teamDescription);
            setTeamManagerName(teamData.teamManagerName);
            setTeamGroup(teamData.teamGroup);
        }
    }, [teamData]);

    

    const teamObject = {
        registrationNo,
        teamName,
        institutionName,
        teamDescription,
        teamManagerName,
        teamGroup
    };

    const updateHandler = async () => {
        await updateTeamData({ tournamentId, teamId, teamObject });
    };

    useEffect(() => {
        if(isSuccess){
            alert("Update Successful");
            refetch();
        }
        if(isError){
            alert("Update Failed");
        }
    }, [isSuccess, isError]);

    

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Update Team Data</h1>
                <div className="flex flex-col gap-5 mt-5">
                    <div className="flex flex-col gap-5 mt-5">
                        <label>Registration No:</label>
                        <input value={registrationNo} onChange={(e) => setRegistrationNo(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Team Name:</label>
                        <input value={teamName} onChange={(e) => setTeamName(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Institution Name:</label>
                        <input value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Team Description:</label>
                        <input value={teamDescription} onChange={(e) => setTeamDescription(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Manager Name:</label>
                        <input value={teamManagerName} onChange={(e) => setTeamManagerName(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Group:</label>
                        <input value={teamGroup} onChange={(e) => setTeamGroup(e.target.value)} placeholder="A / B" type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex gap-10">
                        <button onClick={updateHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Create</button>
                        <button onClick={() => navigate(`/admin/tournamentcontrol/addteam/${tournamentId}`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                    </div>

                </div>

            </div>



        </div>
    )
};

export default UpdateTeamData;