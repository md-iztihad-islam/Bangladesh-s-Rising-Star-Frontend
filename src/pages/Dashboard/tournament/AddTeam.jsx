import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateTeamMutation, useDeleteTeamMutation, useGetTournamentByIdQuery } from "../../../api/tournamentApi";

function AddTeam(){
    const navigate = useNavigate();
    const params = useParams();
    const tournamentId = params.tournamentId;
    const [ registrationNo, setRegistrationNo ] = useState("");
    const [ teamName, setTeamName ] = useState("");
    const [ institutionName, setInstitutionName ] = useState("");
    const [ teamManagerName, setTeamManagerName ] = useState("");
    const [ teamLogo, setTeamLogo ] = useState("");

    const onChangeHandler = (event) => {
        const file = event.target.files?.[0];
        if(file){
            setTeamLogo(file);
        }
    };


    const [createTeam, {isSuccess, isError}] = useCreateTeamMutation();


    const createHandler = async () => {
        const formData = new FormData();
        formData.append("registrationNo", registrationNo);
        formData.append("teamName", teamName);
        formData.append("institutionName", institutionName);
        formData.append("teamManagerName", teamManagerName);
        formData.append("teamLogo", teamLogo);

        await createTeam({ tournamentId, teamData: formData });
    };

    useEffect(() => {
        if(isSuccess){
            setRegistrationNo("");
            setTeamName("");
            setInstitutionName("");
            setTeamManagerName("");
            setTeamLogo("");
            refetch();
        }
        if(isError){
            alert("Error in Creating Team");
        }
    }, [isSuccess, isError]);

    const {data, refetch} = useGetTournamentByIdQuery(tournamentId);

    const tournamentData = data?.data;

    const [deleteTeam, {isSuccess: deleteSuccess, isError: deleteError}] = useDeleteTeamMutation();

    const deleteHandler = async (teamId) => {
        await deleteTeam({ tournamentId, teamId });
    };

    useEffect(() => {
        if(deleteSuccess){
            refetch();
        }
        if(deleteError){
            alert("Error in Deleting Team");
        }
    }, [deleteSuccess, deleteError]);

    return(
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Tournament Control</h1>
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
                        <label>Manager Name:</label>
                        <input value={teamManagerName} onChange={(e) => setTeamManagerName(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        <label>Team Logo:</label>
                        <input onChange={onChangeHandler} type="file" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>

                    <div className="flex gap-10">
                        <button onClick={createHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Create</button>
                        <button onClick={() => navigate("/admin/tournamentcontrol")} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                    </div>

                </div>

            </div>




            <div className="p-10">
                <h1 className="text-xl md:text-3xl font-bold">Team List</h1>
                <div>
                    <ul className="list rounded-box shadow-md bg-gray-200 hover:bg-gray-400">
  
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Tournament List</li>

                        <div>
                            {
                                tournamentData?.teams?.map((team) => (
                                    <li className="list-row m-2" key={team._id}>
                                        <div>
                                            <img className="size-10 rounded-box" src={team.teamLogo} alt="My Image"/>
                                        </div>
                                        <div>
                                        <div>{team.teamName}</div>
                                        <div className="text-xs uppercase font-semibold opacity-60">{team.institutionName}</div>
                                        </div>
                                        <div className="flex gap-5">
                                            <button onClick={() => deleteHandler(team._id)} className="btn btn-square btn-ghost w-[100px]">Delete</button>
                                            <button onClick={() => navigate(`addplayer/${team._id}`)} className="btn btn-square btn-ghost w-[100px]">Add Player</button>
                                            <button onClick={() => navigate(`updateteam/${team._id}`)} className="btn btn-square btn-ghost w-[100px]">Update Team</button>
                                        </div>
                                    </li>
                                ))
                            }
                        </div>
  
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default AddTeam;