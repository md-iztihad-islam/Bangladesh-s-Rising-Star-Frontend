import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddPlayerMutation, useGetTeamQuery, useTeamPlayerQuery } from "../../../api/tournamentApi";

function AddPlayer(){
    const navigate = useNavigate();
    const params = useParams();
    const { tournamentId, teamId } = params;

    const [ registrationNo, setRegistrationNo ] = useState("");

    const [addPlayer, {isSuccess, isError}] = useAddPlayerMutation();

    const {data, refetch} = useTeamPlayerQuery({tournamentId, teamId});

    const teamPlayers = data?.data;

    const addHandler = () => {
        addPlayer({ tournamentId, teamId, registrationNo });
    };

    useEffect(() => {
        if(isSuccess){
            setRegistrationNo("");
            refetch();
        }
        if(isError){
            alert("Error in Adding Player");
        }
    }, [isSuccess, isError]);
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10 mb-10 p-5">
                <h1 className="text-xl md:text-3xl font-bold">Add Player</h1>
                <div>
                    <div className="flex flex-col gap-5 mt-5">
                        <label>Player Registration No:</label>
                        <input value={registrationNo} onChange={(e) => setRegistrationNo(e.target.value)} type="text" className="w-[300px] md:w-[600px] border-1 border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div className="flex gap-5 mt-5">
                    <button onClick={addHandler} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Add</button>
                    <button onClick={() => navigate(`/admin/tournamentcontrol/addteam/${tournamentId}`)} className="w-[150px] h-[40px] bg-gray-200 hover:bg-gray-400 mt-10 rounded-md">Back</button>
                </div>


            </div>



            <div>
                <div className="overflow-x-auto p-10">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Profile</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                teamPlayers?.map((player, index) => (
                                    <tr key={player._id}>
                                        <th>{index + 1}</th>
                                        <td>{player.name}</td>
                                        <td>{player.position}</td>
                                        <td>
                                            <button onClick={() => navigate(`/admin/tournamentcontrol/addteam/${tournamentId}/addplayer/${teamId}/${player._id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default AddPlayer;